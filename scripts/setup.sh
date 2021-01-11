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

if [ ! -d ./env ]; then
	printf "Virtual environment not found, creating it\n"
	sleep 1
	virtualenv "./env" -p python3
fi

printf "Activating virtual environment...\n"
source "./env/bin/activate"

printf "\nInstalling python packages..\n"
pip3 install -r "./backend/requirements.txt"

if [ -d ./frontend ]; then
	printf "\nInstalling frontend's node packages...\n"
	npm --prefix ./frontend/ install ./frontend/
	
	printf "Adding nodeJS modules bin to your path\n"
	export PATH="`pwd`/frontend/node_modules/.bin/:$PATH"
	export NODE_ENV="development"
fi

if [ -d ./node ]; then
	printf "\nInstalling Node's node packages...\n"
	npm --prefix ./node/ install ./node/
	
	printf "Adding nodeJS modules bin to your path\n"
	export PATH="`pwd`/node/node_modules/.bin/:$PATH"
	export NODE_ENV="development"
fi

printf "Adding scripts folder to your path\n"
export PATH="`pwd`/scripts/:$PATH"

# if [ -d ./cms ]; then
# 	printf "\nInstalling CMS node Packages...\n"
# 	npm --prefix ./cms/ install ./cms/
	
# 	printf "Adding nodeJS modules bin to your path\n"
# 	export PATH="`pwd`/frontend/node_modules/.bin/:$PATH"
# 	export NODE_ENV="development"
# fi

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
