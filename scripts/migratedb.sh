#!/bin/bash

BASE_DIR="$(cd "$(dirname "$0")"; pwd -P)"

cd "$BASE_DIR/backend/"
python3 manage.py makemigrations users
python3 manage.py migrate users
python3 manage.py makemigrations superusers
python3 manage.py migrate superusers
python3 manage.py makemigrations merchants
python3 manage.py migrate merchants
python3 manage.py makemigrations employees
python3 manage.py migrate employees

python3 manage.py migrate
