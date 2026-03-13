
# ECommerce API

A backend API for managing users, categories, products, and orders.

<p align="center">
  <img alt="Node.js" title="Node.js" height="36" src="https://raw.githubusercontent.com/github/explore/main/topics/nodejs/nodejs.png" />&nbsp;&nbsp;
  <img alt="Express.js" title="Express.js" height="36" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" />&nbsp;&nbsp;
  <img alt="TypeScript" title="TypeScript" height="36" src="https://raw.githubusercontent.com/github/explore/main/topics/typescript/typescript.png" />&nbsp;&nbsp;
  <img alt="MongoDB" title="MongoDB" height="36" src="https://raw.githubusercontent.com/github/explore/main/topics/mongodb/mongodb.png" />&nbsp;&nbsp;
  <img alt="Mongoose" title="Mongoose" height="36" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg" />&nbsp;&nbsp;
  <img alt="Zod" title="Zod" height="36" src="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/zod.svg" />&nbsp;&nbsp;
  <img alt="Swagger UI" title="Swagger UI / OpenAPI" height="36" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg" />
</p>

## Features

- Users CRUD
- Categories CRUD
- Products CRUD
- Orders CRUD
- MongoDB Atlas integration with Mongoose
- Request validation with Zod
- Centralized error handling
- Product filtering by category
- Order integrity checks
- Server-side order total calculation
- Swagger UI documentation

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Zod
- Swagger UI

## Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:Codenix-1349/ECommerceAPI.git
cd ECommerceAPI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the environment file

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

### 4. Start the development server

```bash
npm run dev
```

The server will run on:

```text
http://localhost:3000
```

## API Documentation

Swagger UI is available at:

```text
http://localhost:3000/api-docs
```

Health check endpoint:

```text
http://localhost:3000/health
```

## Main Endpoints

### Users

- `GET /users`
- `POST /users`
- `GET /users/:id`
- `PUT /users/:id`
- `DELETE /users/:id`

### Categories

- `GET /categories`
- `POST /categories`
- `GET /categories/:id`
- `PUT /categories/:id`
- `DELETE /categories/:id`

### Products

- `GET /products`
- `GET /products?categoryId=<categoryId>`
- `POST /products`
- `GET /products/:id`
- `PUT /products/:id`
- `DELETE /products/:id`

### Orders

- `GET /orders`
- `POST /orders`
- `GET /orders/:id`
- `PUT /orders/:id`
- `DELETE /orders/:id`

## Business Rules

- Products can only be created or updated with an existing `categoryId`
- Orders can only be created or updated with an existing `userId`
- Orders can only include existing `productId` values
- Order totals are calculated on the server from current product prices and quantities
- Sensitive fields such as passwords are excluded from API responses

## Example Request Bodies

### Create User

```json
{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "password": "secret123"
}
```

### Create Category

```json
{
  "name": "Electronics"
}
```

### Create Product

```json
{
  "name": "Laptop",
  "description": "15 inch notebook",
  "price": 999.99,
  "categoryId": "CATEGORY_ID"
}
```

### Create Order

```json
{
  "userId": "USER_ID",
  "products": [
    {
      "productId": "PRODUCT_ID",
      "quantity": 2
    }
  ]
}
```

## Project Structure

```text
src/
├── controllers/
├── db/
├── middleware/
├── models/
├── routes/
├── schemas/
├── types/
└── app.ts
```

## Environment Variables

Required environment variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

