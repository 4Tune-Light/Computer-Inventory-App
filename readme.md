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

SALT = "SALT-ROUND" //EXAMPLE "10" for bcrypt saltRound

```
### Start Development Server
```
$ npm start
```

## Documentation

### USER Routes

#### POST Request
```
 - "/api/register" => Create user and return token. 
 	- Required Body: 
 		- username: string
 		- email: string
 		- password: string

 - "/api/login" => Log In user and return token. 
 	- Required Body:
 		- email: string
 		- password: string
```


### PRODUCT Routes

#### GET Request
```
 - "/api/product" => Display products, with default pagination {page: 1, limit: 4}. 
 	- Possible Query:
		- search -> {input: search keywords}, search products that have {input} in their title.
		- sortby -> {input: column name}, sort products based on {input}.
	    - sort   -> {input: asc / desc}, sort products ascending or descending based on {input}.
	    - page 	 -> {input: number}, display page based on {input}.
	    - limit  -> {input: number}, config how many product displayed on page.

 - "/api/product/{id}" => Display product with {id}.
```

#### POST Request
```
 - "/api/product" => Create product and return inserted data.
 	- Required Header: { auth: token }
 	- Required Body: 
 		- name: string
 		- description: string
 		- image: string //image url
 		- id_category: number
 		- quantity: number
```

#### PUT Request
```
 - "/api/product/{id}" => Update product with {id} and return inserted data.
 	- Required Header: { auth: token }
 	- Required Body: 
 		- name: string
 		- description: string
 		- image: string //image url
 		- id_category: number
 		- quantity: number
 ```

#### PATCH Request
```
 - "/api/product/{id}" => Add or reduce product quantity with {id}.
 	- Required Header : { auth: token }
 	- Required Body: { action: add / reduce }
 	- Possible Body: { by: how many quantity will be {action} }
```

#### DELETE Request
```
 - "/api/product/{id}" => Delete product with {id}.
```


### CATEGORY Routes

#### GET Request
```
 - "/api/cateogry" => Display categories. 

 - "/api/product/{id}" => Display category with {id}.
```

#### POST Request
```
 - "/api/category" => Create category and return inserted data.
 	- Required Header: { auth: token }
 	- Required Body: { name: string }
```

#### PUT Request
```
 - "/api/category/{id}" => Update category with {id} and return inserted data.
 	- Required Header: { auth: token }
 	- Required Body: { name: string }
```

#### DELETE Request
```
 - "/api/category/{id}" => Delete category with {id}.
```


### License
----
[ISC](https://en.wikipedia.org/wiki/ISC_license "ISC")