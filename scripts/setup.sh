#!/usr/bin/env bash

Color_Off='\e[0m'       # Text Reset

# Regular Colors
Black='\e[0;30m'
Red='\e[0;31m'
Green='\e[0;32m'
Yellow='\e[0;33m'
Blue='\e[0;34m'
Purple='\e[0;35m'
Cyan='\e[0;36m'
White='\e[0;37m'

BRed='\e[1;31m'  
On_Red='\e[41m'
IRed='\e[0;91m'

echo "You must run the following command: source scripts setup.sh -dev"
sudo service postgresql start
sudo service cron start

## Determine if Staging or Production based on install command
## source ops/install.sh -staging or source ops/install.sh
SERVER_TYPE=$1
printf "Server install type is: %s\n" "$SERVER_TYPE"

if [ ! -d ./env ]; then
	printf "Virtual environment not found, creating it\n"
	sleep 1
	python3 -m venv "./env"
	printf "Activating virtual environment...\n"
	source "./env/bin/activate"

	pip3 install --upgrade setuptools pip wheel

else
	printf "Activating virtual environment...\n"
	source "./env/bin/activate"
fi

printf "\nInstalling python packages..\n"
pip install --upgrade -r "./backend/requirements.txt"

echo 'installed python packages'

if [ -d ./frontend ]; then
	printf "\nInstalling frontend's node packages...\n"
	sudo npm --prefix ./frontend/ install ./frontend/
	
	printf "Adding nodeJS modules bin to your path\n"
	export PATH="`pwd`/frontend/node_modules/.bin/:$PATH"

	if [ "$SERVER_TYPE" == '-dev' ]; then
		echo "setup.sh SERVER_TYPE -dev is executed"
		export NODE_ENV="development"
	else
		echo "setup.sh SERVER_TYPE -prod is executed"
		export NODE_ENV="production"
	fi
fi

if [ ! -d ./frontend/dist ]; then
	sudo npm --prefix ./frontend/ run build
fi

echo 'installed frontend modules'

if [ -d ./node ]; then
	printf "\nInstalling Node's node packages...\n"
	sudo npm --prefix ./node/ install ./node/
	
	printf "Adding nodeJS modules bin to your path\n"
	export PATH="`pwd`/node/node_modules/.bin/:$PATH"

	if [ "$SERVER_TYPE" == '-dev' ]; then
		export NODE_ENV="development"
	else
		export NODE_ENV="production"
	fi
fi

echo 'installed node modules'

printf "Adding scripts folder to your path\n"
export PATH="`pwd`/scripts/:$PATH"

if [ ! -f "./backend/project/settings/local_settings.py" ]; then
	echo -e "$IRed"
	echo `python -c "print('!'*80)"`
	echo "DONT FORGET TO SET UP YOUR local_settings.py in"
	echo "backend/project/settings/local_settings.py"
	echo "There is a template in"
	echo "backend/project/settings/local_settings.py.template"
	echo "Here is a randomly generated secret key you can use:"
	echo `python -c 'from django.core.management import utils; print(utils.get_random_secret_key())'`
	echo "And this command to copy the template"
	echo "cp backend/project/settings/local_settings.py.template backend/project/settings/local_settings.py"
	echo -e "$Color_Off"
fi

echo "Done"