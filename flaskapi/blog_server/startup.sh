#!/bin/sh

echo "! => Running shell script"
echo "! => Sleeping for 10 seconds, hoping DB will be up"
sleep 10

echo "! => Running DB migrations"
python /usr/src/app/manage.py db init
sleep 3
python /usr/src/app/manage.py db migrate
sleep 3
python /usr/src/app/manage.py db upgrade
sleep 3

echo "! => Starting gunicorn"
gunicorn -b 0.0.0.0:8000 app:app
