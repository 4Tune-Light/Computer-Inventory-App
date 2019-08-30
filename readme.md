# RESTful API Computer Inventory App

![](https://img.shields.io/badge/Code%20Style-Standard-yellow.svg)
![](https://img.shields.io/badge/Dependencies-Express-green.svg)
![](https://img.shields.io/badge/License-ISC-yellowgreen.svg)

<p align="center">
  <a href="https://nodejs.org/">
    <img alt="restfulapi" title="Restful API" src="https://cdn-images-1.medium.com/max/871/1*d2zLEjERsrs1Rzk_95QU9A.png">
  </a>
</p>

----
## Table of contents
* [Prerequiste](#prerequiste)
* [Installation](#installation)
* [Documentation](#documentation)
* [License](#license)

## Prerequiste
- Node.js - Download and Install [Node.js](https://nodejs.org/en/) with [NVM](https://github.com/creationix/nvm) (Node Version Manager) - Simple bash script to manage multiple active node.js versions.
- MySQL - Download and Install [MySQL](https://www.mysql.com/downloads/) - Make sure it's running on the default port.
- Postman - Download and Install [Postman](https://www.getpostman.com/downloads) - Implementation with postman latest version.

## Installation
### Clone
```
$ git clone https://github.com/4Tune-Light/Computer-Inventory-App.git
$ cd Computer-Inventory-App
$ npm install
```

### Create Environment Variable
```
$ cp .env.example .env
$ nano .env
```

```
PORT = YOUR-PORT

DB_HOST = "YOU-DB-HOST"
DB_USER = "YOUR-DB-USER"
DB_PASS = "YOUR-DB-PASSWORD"
DB_NAME = "YOUR-DB-NAME"

JWT_KEY = "YOUR-SECRET-KEY"
JWT_EXP = "EXPIRED-TIME" //EXAMPLE "1h" for 1 hour, "1000" for 1000 miliseconds

SALT = "SALT-ROUND" //EXAMPLE "10" ( number )

```
### Start Development Server
```
$ npm start
```

## Documentation

### USER Routes

#### POST Request
```
 1. "/api/register" => Create user and return token. 
    a. Required Body: 
       1) username: string
       2) email: string
       3) password: string

 2. "/api/login" => Log In user and return token. 
    a. Required Body:
       1) email: string
       2) password: string
```


### PRODUCT Routes

#### GET Request
```
 1. "/api/product" => Display products, with default pagination {page: 1, limit: 4}. 
    a. Options Query:
       1) search -> {input: search keywords}, search products that have {input} in their title.
       2) sortby -> {input: column name}, sort products based on {input}.
       3) sort   -> {input: asc / desc}, sort products ascending or descending based on {input}.
       4) page	 -> {input: number}, display page based on {input}.
       5) limit  -> {input: number}, config how many product displayed on page.

 2. "/api/product/{id}" => Display product with {id}.
```

#### POST Request
```
 1. "/api/product" => Create product and return inserted data.
    a. Required Header: { auth: token }
    b. Required Body: 
       1) name: string
       2) description: string
       3) image: string //image url
       4) id_category: number
       5) quantity: number
```

#### PUT Request
```
 1. "/api/product/{id}" => Update product with {id} and return inserted data.
    a. Required Header: { auth: token }
    b. Required Body: 
       1) name: string
       2) description: string
       3) image: string //image url
       4) id_category: number
       5) quantity: number
 ```

#### PATCH Request
```
 1. "/api/product/{id}" => Add or reduce product quantity with {id}.
    a. Required Header : { auth: token }
    b. Required Body: { action: add / reduce }
    c. Options Body: { by: how many quantity will be {action} }
```

#### DELETE Request
```
 1. "/api/product/{id}" => Delete product with {id}.
    a. Required Header : { auth: token }

```


### CATEGORY Routes

#### GET Request
```
 1. "/api/cateogry" => Display categories. 

 2. "/api/product/{id}" => Display category with {id}.
```

#### POST Request
```
 1. "/api/category" => Create category and return inserted data.
    a. Required Header: { auth: token }
    b. Required Body: { name: string }
```

#### PUT Request
```
 1. "/api/category/{id}" => Update category with {id} and return inserted data.
    a. Required Header: { auth: token }
    b. Required Body: { name: string }
```

#### DELETE Request
```
 1. "/api/category/{id}" => Delete category with {id}.
```


### License
----
[ISC](https://en.wikipedia.org/wiki/ISC_license "ISC")