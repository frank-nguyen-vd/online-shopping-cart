# SHOPPING CART ASSIGNMENT

## USER STORIES

CUSTOMERS

-   [x] can register an account
-   [x] can log in
-   [x] can view list of products
-   [ ] can add products to cart
-   [ ] can make payment
-   [ ] can view past transactions

ADMINISTATORS

-   [x] can log in
-   [x] can perform CRUD on products
-   [ ] can view list of transactions
-   [x] can view list of customers

## TO-DO LIST

-   [x] Set up express server
-   [x] Set up MongoDB
-   [x] Set up authentication

    -   [x] Set up endpoint POST /users/login that takes username and password. These values will be compared to existing record and access token will be sent to user upon successful verification. Note that, the access token consists of user id and user role.
        > _Note_: We can use Auth0 for authentication but I did not know how to retrieve access token after logging in

-   [x] Create resource Users

    -   [x] Create a model with fields username, password, role. The field `role` value is either `customer` or `administrator`. This role value will be included in access token.This is not a best pratice but it can be used as a proof of concept for authorization.
    -   [x] Create a repository with methods create, findAll, findById, updateById, removeById
    -   [x] Create a controller with methods create, findAll, findById, updateById, removeById. Allow only role administrator to access method findAll, findById, updateById, removeById
    -   [x] Create a router to route endpoints to handlers

-   [x] Create endpoints Users

    -   [x] Write endpoint POST /users that takes username and password and create new records in Users. Hash password before storing it in database
    -   [x] Write endpoint GET /users to return all users
    -   [ ] Use pagination to return list of users.
    -   [x] Write endpoint GET /users/:id
    -   [x] Write endpoint PATCH /users/:id
    -   [x] Write endpoint DELETE /users/:id

-   [x] Create resource Products

    -   [x] Create a model with fields name, price.
    -   [x] Create a repository with methods create, findAll, findById, updateById, removeById
    -   [x] Create a controller with methods create, findAll, findById, updateById, removeById.
    -   [ ] Allow only role administrator to access method updateById, removeById
    -   [x] Create a router to route endpoints to handlers

-   [x] Create endpoints Products

    -   [x] Write endpoint POST /products
    -   [x] Write endpoint PATCH /products/:id
    -   [x] Write endpoint DELETE /products/:id
    -   [x] Write endpoint GET /products that display all products. Use pagination to return products list.

-   [ ] Create resource Carts

    -   [ ] Create a model with fields userId, totalPrice, items where items is an array of {productId, quantity, subTotal}
    -   [ ] Create a repository with methods find, update, create
    -   [ ] Create a controller with methods addItem. Adding non-positive quantity of an item to the cart will delete the item. To reduce the quantity of an item X, we first remove the item X from the cart then add the item X with new quantity to the cart
    -   [ ] Create a router to route endpoints to handlers

-   [ ] Create endpoints Carts

    -   [ ] Write endpoint POST /carts?customerId=[customerId] with payload {productId, quantity}.
        > _Note_: quanity 0 means remove the product from the cart
    -   [ ] Write endpoint GET /carts?customerId=[customerId] that display all products in the cart.

-   [ ] Create resource Transactions

    -   [ ] Create a model with fields userId, totalPrice, items where items is an array of {productId, quantity, subTotal}
    -   [ ] Create a repository with methods create, findAll, findById
    -   [ ] Create a controller with methods create, findAll, findById
    -   [ ] Create a router to route endpoints to handlers

-   [ ] Create endpoints Transactions

    -   [ ] Write endpoint GET /Transactions?userId=[userId]
    -   [ ] Write endpoint GET /Transactions/:id

-   [ ] Write endpoint POST /checkout with the payload {cart, payment} where payment object is encrypted. We can use Stripe API for payment

## HOW TO TEST THIS APPLICATION

#### STEP 1: Installing Dependencies

-   Installing Node and NPM  
    This project depends on Nodejs and Node Package Manager (NPM). Before continuing, you must download and install Node (the download includes NPM) from [https://nodejs.com/en/download](https://nodejs.org/en/download/).
-   Clone this project to your local machine

```bash
git clone https://github.com/frank-nguyen-vd/nodejs-express-assignment.git
```

-   Install project dependencies

```bash
npm install
```

-   Install MongoDB on your local machine
    > _Note_: for Ubuntu, use `https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/`
-   Start MongoDB service
    > _Note_: for Ubuntu, use `sudo systemctl start mongod`

#### Step 2: Start Web API

To run this Web API, use

```bash
npm start
```

To run this Web API in watch mode, use

```bash
npm run watch
```

> _tip_: **npm i** is shorthand for **npm install**

## API Reference

POST `/users`

-   Description: Create a new user record
-   Request Arguments: None
-   Request Body:

```json
{ "username": "happy_kia", "password": "s3cr3t123" }
```

-   Returns:

```json
{
    "success": true,
    "message": "New user created",
    "data": {
        "username": "happy_kia",
        "password": "k2hjk534j5g43k52j4524j35g43h"
    }
}
```

GET `/users`

-   Description: Get a list of users
-   Request Arguments:
    -   Bearer Token
-   Returns:

```json
{
    "success": true,
    "data": [
        { "username": "happy_kia", "password": "5h42h435klh4325kl3" },
        { "username": "grumpy_bear", "password": "hk52lhkhhjkhkh2543" }
    ]
}
```

POST `/users/login`

-   Description: Retrieve access token
-   Request Arguments: None
-   Request Body:

```json
{
    "username": "happy_kia",
    "password": "s3cr3t123"
}
```

-   Returns:

```json
{
    "success": true,
    "message": "Log in successfully",
    "data": { "token": "hk54hjk5cb$@*%$W40297g9gfs" }
}
```

GET `/products`

-   Description: Get a list of products
-   Request Arguments: None
-   Returns:

```json
{
    "success": true,
    "data": [
        {
            "name": "Samsung Galaxy S20",
            "price": 1100
        },
        {
            "name": "Iphone 12 Max Pro",
            "price": 1600
        }
    ]
}
```

GET '/products/:id'

-   Description: Retrieve a product with id
-   Request Arguments: None
-   Returns:

```json
{
    "success": true,
    "data": {
        "name": "Samsung Galaxy S20",
        "price": 1100
    }
}
```

PATcH '/products/:id'

-   Description: Update product details given its id
-   Request Arguments:
    -   Bearer token
-   Request Body:

```json
{
    "name": "Nokia 3310",
    "price": 50
}
```

-   Returns:

```json
{
    "success": true,
    "data": {
        "name": "Nokia 3310",
        "price": 50
    }
}
```

DELETE `/products/:id`

-   Description: Delete a product given id
-   Request Arguments:
    -   Bearer token
-   Returns:

```json
{
    "success": true,
    "data": {
        "name": "Nokia 3310",
        "price": 50
    }
}
```

GET `/carts`

-   Description: Retrieve cart details of a customer
-   Request Arguments:
    -   Bearer Token
-   Returns

```json
{
    "success": true,
    "message": "Cart is retrieved",
    "data": {
        "customerId": "nfdah53h5l20&!@*fadsf",
        "items": [
            { "name": "eggs", "quantity": 10, "subTotal": 120 },
            { "name": "bread", "quantity": 1, "subTotal": 1.2 }
        ],
        "totalPrice": 121.2
    }
}
```

POST `/carts`

-   Description: Add items into cart
-   Request Arguments:
    -   Bearer Token
-   Request Body:

```json
{
    "productId": "nfad890a7909791",
    "quantity": 10
}
```

-   Returns

```json
{
    "success": true,
    "message": "Cart is retrieved",
    "data": {
        "customerId": "nfdah53h5l20&!@*fadsf",
        "items": [
            { "productId": "nfad890a7909791", "quantity": 10, "subTotal": 120 },
            { "productId": "jlkh54325khhkj3", "quantity": 1, "subTotal": 1.2 }
        ],
        "totalPrice": 121.2
    }
}
```

-   Possible Errors:
    -   404: Product is not found
    -   400: Missing product information
    -   400: Missing customer information

POST `/transactions`

-   Description: This endpoint will save the items in the cart in transactions list for for the sake of this assignment. In practice, we can use Stripe API to process payment.
-   Request Arguments:
    -   Bearer Token
-   Request Body: None
-   Possible errors:
    -   400: Cart is empty
    -   500: Internal server error
