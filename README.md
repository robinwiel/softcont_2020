# VU Software Containerization 2020 - Group 20  

`[LAST UPDATED 30-01-2021 18:00]`

# How to deploy
Make sure your current directory is the repository and folder `softcont_2020/`

## Build the flaskapi image
`sudo docker build -t flaskapi:v1 flaskapi/`  
`sudo docker tag flaskapi:v1 localhost:32000/flaskapi:v1`  
`sudo docker push localhost:32000/flaskapi:v1`  

## Build the frontend image
`sudo docker build -t frontend:v1 frontend/`  
`sudo docker tag frontend:v1 localhost:32000/frontend:v1`  
`sudo docker push localhost:32000/frontend:v1`  

## Deploying with Helm
Our repository contains a packaged Helm chart that allows for the deployment of our application with a single command.

In order to be able to install the Helm chart of the frontend (including subcharts of the database and the Flask API), two add-ons should be enabled in microkubernetes:  
`microk8s enable metallb`  
When asked for a range of IP addresses, enter:  
`10.50.100.0-10.50.100.25`  
`microk8s enable ingress`

Also, you should create a directory for the database.
`sudo rm -r /opt/postgres/data` if this directory already exists on your machine.  
`sudo mkdir -p /opt/postgres/data`  

Now, we are ready to install the packaged Helm chart:  
`microk8s helm3 install g20-frontend-1.0.0.tgz --generate-name`
This will deploy the frontend, Flask API, and Postgres database.
Please wait 30 seconds to allow the installation to be complete.

`kubectl get ingress -n default`  
Copy the ADDRESS mentioned by the created Ingress object (probably 127.0.0.1)  
`sudo nano /etc/hosts`  
Insert lines:  
`<ADDRESS> my-blog.com`  
`<ADDRESS> my-blog.api.com`  

On Ubuntu, open Google Chrome from the command line with the following flag:  
`google-chrome --ignore-certificate-errors`  
The frontend can then be accessed by visiting my-blog.com in your browser.
As we use self-signed certificates, the Chrome flag is necessary to not block calls to the Flask API.

List the generated name of the installation with:  
`microk8s helm3 list`  
The installation can then be uninstalled by issuing the following command:  
`microk8s helm3 uninstall <generated-name>`

## Deploying manually

### Deployment 1: The Postgres Database
`sudo rm -r /opt/postgres/data` if this directory already exists on your machine.  
`sudo mkdir -p /opt/postgres/data`  
`kubectl apply -f db/postgres-config.yaml`  
`kubectl apply -f db/postgres-secret.yaml`  
`kubectl apply -f db/postgres-storage.yaml`  
`kubectl apply -f db/postgres-svc.yaml`  
`kubectl apply -f db/postgres-deploy.yaml`  

### Enabling the LoadBalancer
`microk8s enable metallb`  
When asked for a range of IP addresses, enter:
`10.50.100.0-10.50.100.25`  

### Deployment 2: The API
`kubectl apply -f flaskapi/flaskapi-deploy.yaml`  
`kubectl apply -f flaskapi/flaskapi-lb-svc.yaml`   

### Deployment 3: The Front-End
`kubectl apply -f frontend/frontend-deploy.yaml`  
`kubectl apply -f frontend/frontend-lb-svc.yaml `  

### Setup Ingress with certificate
`microk8s enable ingress`  

Use a certificate generated by us and apply the secret:  
`kubectl apply -f ingress/my-tls-secret.yaml`  

Or generate new certificates and apply the secret on-the-fly:  
`openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes`  
`kubectl create secret tls my-tls-secret --cert=ingress/cert.pem --key=ingress/key.pem`  

Continue with these steps to create the Ingress:  
`kubectl apply -f ingress/ingress-blog.yaml`  
`kubectl get ingress -n default`  

Copy the ADDRESS mentioned by the created Ingress object (probably 127.0.0.1)  
`sudo nano /etc/hosts`  
Insert lines:  
`<ADDRESS> my-blog.com`  
`<ADDRESS> my-blog.api.com`  

### Accessing the frontend
On Ubuntu, open Google Chrome from the command line with the following flag:  
`google-chrome --ignore-certificate-errors`  
The frontend can then be accessed by visiting my-blog.com in your browser.
As we use self-signed certificates, the Chrome flag is necessary to not block calls to the Flask API.
