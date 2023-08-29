# E-commerce

This API allows users to create, login, create orders and get all their customer orders.

### API Documentation

This gives more information about the API and the various endpoints: "https://softamose-e-commerce.onrender.com/docs". Swagger was used to generate the documentation.

### API Live Link

This is the live link to the API: "https://softamose-e-commerce.onrender.com"

### Authentication

All API endpoints require authentication using a JSON Web Token (JWT). To authenticate, include the JWT in the Authorization header of each request

### Endpoints

There are two resources: users and orders

## USERS

POST /users
This endpoint allows users to register a new account.

POST /users/login
This endpoint allows users to login to their account.


## ORDERS

POST /orders
This endpoint allows the authenticated user to create a new order.

GET /orders
This endpoint returns information about the authenticated user's orders.
