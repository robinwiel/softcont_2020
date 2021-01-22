# softcont_2020
VU Software Containerization 2020 - Group 20

`[UPDATED 22-01-2021 15:30]`

# Explanation

This repository contains the code and manifests necessary to deploy a Postgres database and a Flask API to Kubernetes.

The directory *db* contains the manifests necessary to deploy a Postgres instance to Kubernetes from an original image.
The directory *flask_api* contains the code and manifests necessary to build a docker image from the Python code, and manifests to deploy the Flask API to Kubernetes from this custom built image.

As of now, running the manifests will cause the database to only be reachable from within the Kubernetes cluster (using ClusterIP). The API uses a nodeport and can be reached from localhost:30001.

# How to run

## Create Docker image for the API
`cd flaskapi/`  
`sudo docker build -t flaskapi:v1 .`  
`sudo docker images`  
Copy the ID of the image. Make sure your microk8s is running and that the registry is active.  
`sudo docker tag [DOCKER IMAGE ID] localhost:32000/flaskapi:v1`  
`sudo docker push localhost:32000/flaskapi:v1`  

## Deploy the Postgres database
`cd db/`  
`sudo mkdir -p /opt/postgres/data` from the Postgres tutorial on Canvas  
`kubectl apply -f postgres-config.yaml`  
`kubectl apply -f postgres-secret.yaml`  
`kubectl apply -f postgres-storage.yaml`  
`kubectl apply -f postgres-service.yaml`  
`kubectl apply -f postgres-deployment.yaml`  
This should run the database.  
TODO: The fresh database is **not ready to work with the API**. I have to work on this...  

## Deploy the API
`cd flaskapi/`  
`kubectl apply -f flaskapi-deployment.yaml`  
`kubectl apply -f flaskapi-np-svc.yaml`  
On start, you should be able to open localhost:30001 and see "Hello world!".
