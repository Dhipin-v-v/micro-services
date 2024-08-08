# Microservices-based API with Node.js and OpenAPI

This project implements a simple microservices-based system using Node.js, Express, and MongoDB. It consists of two microservices: User Service and Product Service.

## Project Structure
/root
├── product-service/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── server.js
│   └── package.json
├── user-service/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   ├── server.js
│   └── package.json
└── README.md

## Setup

1. Clone the repository:
git clone <repository-url>
cd <project-folder>

2. Install dependencies for both services:
cd user-service && npm install
cd ../product-service && npm install
Copy

3. Set up environment variables:
Create a `.env` file in both `user-service` and `product-service` directories with the following content:





## Running the Services

1. Start the User Service:
cd user-service
npm start

2. Start the Product Service:
cd product-service
npm start

The User Service will be available at `http://localhost:3000` and the Product Service at `http://localhost:3001`.

## API Documentation

OpenAPI (Swagger) documentation is available for both services:

- User Service: `http://localhost:3000/api-docs`
- Product Service: `http://localhost:3001/api-docs`

## Running Tests

To run tests for each service:
cd user-service && npm test
cd ../product-service && npm test

## API Endpoints

### User Service

- `POST /users` - Create a new user
- `GET /users/:id` - Retrieve user details by ID

### Product Service

- `POST /products` - Create a new product
- `GET /products/:id` - Retrieve product details by ID
- `GET /products/user/:userId` - Retrieve all products created by a specific user

## Inter-service Communication

The Product Service communicates with the User Service to verify user existence when creating products or fetching products by user ID.

## Database

This project uses MongoDB Atlas as the database. Each service connects to its own database to maintain separation of concerns.
