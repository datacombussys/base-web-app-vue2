# DataBoxx with DataPOS
## by Datacom Business Systems

## Getting started

This project requires Python 3.x, `virtualenv` and NodeJs 8.x or better, and is deployed on an Ubuntu 18.04 server.

Node and `virtualenv` are development dependencies and are not needed for production.

* Clone the project
* Install the dependencies on your machine
* Populate the database


## Clone or Fork the Project

## Installation Prerequisites
### Install Postgres
The databse uses Django-Cities which is a spatial database. This project is set up for Postgres.
You will need to install Postgres as a pre-requisite.

`sudo apt update && sudo apt upgrade`
`sudo apt install git python3 python3-dev python3-pip libpq-dev postgresql-12 postgresql-contrib postgresql-server-dev-12 postgresql-client-12, postgresql-12-postgis, python-psycopg2`

`sudo apt-get install sqlite3 libsqlite3-dev`

### Manage Postgres
Install PGAdmin for a GUI interface or
Log in through comand line
`sudo su postgres`
`psql`
`CREATE DATABASE myproject;`
`CREATE USER username WITH PASSWORD 'password';`
`GRANT ALL PRIVILEGES ON DATABASE myproject TO username;`
`\q`
`Exit`

### Install NodeJS
`curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -`
`sudo apt-get install -y nodejs`
Change the permissions Loevel of the node_modules folder
`sudo chmod -R 777 /usr/lib/node_modules`
`sudo chmod -R 777 /dev/project/directory/.../node/node_modules`

### Set up Machine Dependencies
`sudo npm install nodemon`
`sudo npm install -g cordova`
`sudo apt-get install yarn`
`sudo npm install -g npx`
`sudo npm install -g @vue/cli`
`sudo pip3 install virtualenv`
restart Ubuntu


## Running the project

**Notes**
* The setup script will set everything up and install all the dependencies
`source scripts/setup.sh`. **THIS MUST BE EXECUTED FROM THE ROOT OF THE PROJECT** You should run this when ever you open a terminal to work on this project.


* To start the development server run `develop`. This will start Django and
Webpack

## Directory structurer

### `env/`
This is the virtual environment directory for the python aspect of this project.
It is not tracked and unique to each computer. Its is also not movable. There
is no reason to interact with this directory directly.

### `backend/`
This directory hold the Django projecy. `manage.py` is set to be part of your
path when you activate the development environment and you do not have to worry
about where it is being executed from. Also, **DO NOT** pre-pend `manage.py`
with `python/3` or `./`, this will break stuff.

All the Django apps and config are also kept in this directory.

The `requirements.txt` file is also kept here.

### `frontend/`
This is where the Vue.JS project and any front end or static resources are kept.

The `package.json` file is also here.

When the development environment is activated, the
`/frontend/node_modules/.bin/` directory is pre-pended to your path.

### `scripts/`
This directory holds scripts for helping with the development process.

When the development environment is activated, the `scripts` directory is
pre-pended to your path.

## API documents
This project uses self documenting tools for API references. They can be found
at while they server is running:

http(s)://{site URL}/api/redoc/

## Plugins

### Django Rest framwork
We are using the Django Rest framwork to set up the RESR API:

https://www.django-rest-framework.org/

### Django-REST-Registration
User registration REST API, based on django-rest-framework.

https://github.com/apragacz/django-rest-registration
