#!/bin/sh

echo "! => Running shell script"

echo "! => Running DB migrations"
python /usr/src/app/manage.py db init
sleep 3
python /usr/src/app/manage.py db migrate
sleep 3
python /usr/src/app/manage.py db upgrade
sleep 3

echo "! => Starting gunicorn"
gunicorn -b 0.0.0.0:8000 app:app
