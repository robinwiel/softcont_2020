FROM python:3.8-alpine

RUN apk update && apk add postgresql-dev gcc musl-dev

ADD blog_server /usr/src/app/
WORKDIR /usr/src/app/

RUN pip3 install -r requirements.txt

ENV APP_SETTINGS=config.ProductionConfig
ENV DATABASE_URL="postgresql://postgresadmin:adminG20@127.0.0.1:5432/blog"

EXPOSE 8001

CMD ["gunicorn", "-b", "0.0.0.0:8001", "app:app"]
