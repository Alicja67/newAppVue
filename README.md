## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is simple app in which you can use NASA API to see beautiful space imagines. All aplication is secure by Keycloak, rejestration is based on Keycloak API. All data is stored using local MongoDb.

## Technologies
Project is created with:
* Docker
* Keycloak
* Node.js
* Vue.js
* MongoDB

## Setup
To run this project, install it locally using yarn:

```
APP
$ cd ../newAppVue/app
$ yarn serve

API
$ cd ../newAppVue/api
$ yarn start

USING DOCKER-COMPOSE
$ cd ../newAppVue
$ sudo docker-compose build
$ sudo docker-compose up
$ app use locally https://spacer-magic.mac.pl:8081
$ api use locally http://localhost:8080
```