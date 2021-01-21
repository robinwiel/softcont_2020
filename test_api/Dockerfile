FROM python:3.6-alpine

ADD blog_api_tutorial /usr/src/app/
WORKDIR /usr/src/app

RUN apk add libffi-dev
RUN apk update && apk add postgresql-dev gcc musl-dev
RUN pip install psycopg2
RUN pip install pipenv

# RUN pipenv install --system
RUN ls -a
RUN pipenv install

ENV FLASK_ENV=development
ENV DATABASE_URL=postgresql://postgresadmin:adminG20@127.0.0.1:30001/blog_api_db
ENV JWT_SECRET_KEY=robin

EXPOSE 5000

# CMD ["pipenv", "run", "python"]
#CMD ["pipenv", "run", "python", "/usr/src/app/manage.py", "db", "init"]
#CMD ["pipenv", "run", "python", "/usr/src/app/manage.py", "db", "migrate"]
#CMD ["pipenv", "run", "python", "/usr/src/app/manage.py", "db", "update"]
#CMD ["pipenv", "run", "python", "/usr/src/app/run.py"]