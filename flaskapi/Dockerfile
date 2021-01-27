FROM python:3.8-alpine

RUN apk update && apk add postgresql-dev gcc musl-dev

ADD blog_server /usr/src/app/
WORKDIR /usr/src/app/

RUN pip3 install -r requirements.txt

ENV APP_SETTINGS=config.ProductionConfig
ENV DATABASE_URL="postgresql://postgresadmin:adminG20@postgres-service:5432/postgresdb"

EXPOSE 8000

RUN chmod +x /usr/src/app/startup.sh

CMD ["sh", "startup.sh"]
