#!/bin/bash

## Used for replacing tempalte tags in settings files
source ~/secrets.sh
source ops/vars/variables.sh
sudo echo '1) Loaded variables and secrets'

## Determine if Staging or Production based on install command
## source ops/install.sh -staging or source ops/install.sh
SERVER_TYPE=$1
echo $SERVER_TYPE
printf "Server install type is: %s\n" "$SERVER_TYPE"

## Stop this script on any error.
set -e

## Pull in the mustache template library for bash
source ops/lib/mo
sudo echo '2) Loaded mo'

#For staging
echo "You must run from the main directory: \n source ops/install.sh -staging"
#For prod
echo "You must run from the main directory: \n source ops/install.sh"

## Install Dependencies
sudo apt update -y && sudo apt upgrade -y
sudo apt install curl -y
sudo apt install -y python3.6 python3.6-dev python3.6-venv python3-pip libpq-dev sqlite3 libsqlite3-dev apache2 apache2-dev libapache2-mod-wsgi-py3 python-psycopg2 libjpeg-dev zlib1g-dev pkg-config libcairo2-dev libgirepository1.0-dev -y
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get -y install postgresql
sudo apt update -y && sudo apt upgrade -y
sudo apt autoremove -y

sudo echo '3) Installed initial Software'

sudo pg_ctlcluster 13 main start
sudo service postgresql start
sudo service cron start
sudo service apache2 stop

TICK="'"
sudo -u postgres psql -c "CREATE DATABASE ${DATABASE_NAME};"
sudo -u postgres psql -c "CREATE USER ${DATABASE_USER} WITH PASSWORD $TICK${DATABASE_USER_PASSWORD}$TICK;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE ${DATABASE_NAME} TO ${DATABASE_USER};"

sudo echo '4) Postgres configured'

curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash - 
sudo apt-get install -y nodejs
sudo chmod -R 777 /usr/lib/node_modules

sudo echo '5) NodeJS installed'

## Install Django / Node / Webpack
sudo echo "PWD: $PWD"

## Run Setup.sh
if [ "$SERVER_TYPE" == '-staging' ]; then
printf "\n Installing node for staging server\n"
	echo "install.sh SERVER_TYPE -staging is executed- Scripts section"
	source /var/www/${SITE_NAME}/scripts/setup.sh "-dev"

	apache_hosts="$(cat ops/apache2/staging/hosts)"
	sudo echo "$apache_hosts" | mo > /etc/hosts
	apache_site_settings="$(cat ops/apache2/staging/apache-vhost.conf)"
	echo "$apache_site_settings" | mo > /etc/apache2/sites-available/${DOMAIN}.conf
	sudo echo 'apache settings done and hosts'

	## Setup remoteIP.conf for Apache
	node_service="$(cat ops/apache2/remoteip.conf)"
	sudo echo "$node_service" | mo > /etc/apache2/conf-available/remoteip.conf
	sudo a2enconf remoteip
	sudo a2enmod remoteip

else
	printf "\n Installing node for production server\n"
	echo "install.sh SERVER_TYPE -prod is executed- Scripts section"
	source /var/www/${SITE_NAME}/scripts/setup.sh

	apache_hosts="$(cat ops/apache2/prod/hosts)"
	sudo echo "$apache_hosts" | mo > /etc/hosts
	apache_site_settings="$(cat ops/apache2/prod/apache-vhost.conf)"
	echo "$apache_site_settings" | mo > /etc/apache2/sites-available/${DOMAIN}.conf
	sudo echo 'apache settings done and hosts'

fi
sudo echo '6) setup.sh finished'

## Update Django Passwords and Variables
local_settings_template="$(cat ops/django/local_settings.py.template)"
sudo echo "$local_settings_template" | mo > backend/project/settings/local_settings.py
sudo echo 'local_settings done'

## Migrate DB
source scripts/migratedb.sh
sudo echo 'database migrated'

## Update Node passwords nd variables
node_settings="$(cat ops/node/config.node.js.template)"
sudo echo "$node_settings" | mo > node/config.node.js
sudo echo 'config.node done!'

sudo systemctl start apache2
sudo systemctl reload apache2
sudo a2enmod rewrite
sudo a2enmod proxy_http
sudo apache2ctl configtest

# apache2ctl -S
sudo a2ensite "${DOMAIN}"
# echo apache2ctl -S
sudo systemctl reload apache2

sudo echo 'site enabled restarted apache'

## Add ip address and domain name to backend prod.py file ----------
django_prod="$(cat ops/django/prod.py.template)"
sudo echo "$django_prod" | mo > backend/project/settings/prod.py

sudo echo 'prod.py updated'

node_service="$(cat ops/systemd/node-service.service)"
sudo echo "$node_service" | mo > /etc/systemd/system/node-service.service
sudo systemctl daemon-reload

sudo echo 'node-service setup completed'

sudo systemctl enable node-service.service
sudo systemctl start node-service.service
sudo systemctl restart apache2

sudo echo '100% complete'