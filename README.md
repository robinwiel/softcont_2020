# softcont_2020  
VU Software Containerization 2020 - Group 20  

`[UPDATED 22-01-2021 20:15]`  

# Explanation  

This repository contains the code and manifests necessary to deploy a Postgres database and a Flask API to Kubernetes.  

The directory *db* contains the manifests necessary to deploy a Postgres instance to Kubernetes from an original image.  
The directory *flask_api* contains the code and manifests necessary to build a docker image from the Python code, and manifests to deploy the Flask API to Kubernetes from this custom built image.  

As of now, running the manifests will cause the database to only be reachable from within the Kubernetes cluster (using ClusterIP). The API uses a nodeport and can be reached from localhost:30001.  

# How to run

**Make sure your current directory is "softcont_2020/ !"**

## Build the flaskapi image
`sudo docker build -t localhost:32000/flaskapi:v1 flaskapi/`  
`sudo docker push localhost:32000/flaskapi:v1`  

## Build the frontend image
`sudo docker build -t localhost:32000/frontend:v1 frontend/`  
`sudo docker push localhost:32000/frontend:v1`  

## Deployment 1: The Postgres Database
`sudo rm -r /opt/postgres/data` if this directory already exists on your machine.
`sudo mkdir -p /opt/postgres/data`  
`kubectl apply -f db/postgres-config.yaml`  
`kubectl apply -f db/postgres-secret.yaml`  
`kubectl apply -f db/postgres-storage.yaml`  
`kubectl apply -f db/postgres-svc.yaml`  
`kubectl apply -f db/postgres-deploy.yaml`  

## Enabling the LoadBalancer
`microk8s enable metallb`  
When asked for a range of IP addresses, enter:
`10.50.100.0-10.50.100.25`  

## Deployment 2: The API
`kubectl apply -f flaskapi/flaskapi-deploy.yaml`  
`kubectl apply -f flaskapi/flaskapi-lb-svc.yaml`   

## Deployment 3: The Front-End
`kubectl apply -f frontend/frontend-deploy.yaml`  
`kubectl apply -f frontend/frontend-lb-svc.yaml `  

## Setup Ingress with certificate
`cd ingress`  
`kubectl enable ingress`  
`openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes`  
Enter details  
`kubectl create secret tls my-tls-secret --cert=cert.pem --key=key.pem`  
`kubectl apply -f ingress-blog.yaml`  
`kubectl get ingress -n default`  
Copy ADDRESS (probably 127.0.0.1)  
`sudo nano /etc/hosts`  
Insert lines:  
<ADDRESS> my-blog.com  
<ADDRESS> my-blog.api.com  

## Accessing the frontend
Visit my-blog.com :-)
