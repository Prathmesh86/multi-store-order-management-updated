# Multi-Store Order Management System

A professional full-stack assessment project built with **Next.js, React, Node.js, Express, and MongoDB**.

## Features

- Create new orders
- Fetch orders by `store_id`
- Backend pagination
- Update order status
- Proper request validation using Zod
- MongoDB indexes for better query performance
- Clean backend MVC-style folder structure
- Professional Next.js frontend pages
- Centralized error handling

## Tech Stack

### Frontend
- Next.js
- React
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Zod

## Order Schema

```js
{
  id,
  store_id,
  items: [{ item_id, qty }],
  total_amount,
  status: "PLACED" | "PREPARING" | "COMPLETED",
  created_at
}
```

## Backend APIs

### 1. Create Order

```http
POST /orders
```

Request body:

```json
{
  "store_id": "STORE-101",
  "items": [
    { "item_id": "ITEM-501", "qty": 2 }
  ],
  "total_amount": 1200
}
```

### 2. Get Orders by Store

```http
GET /orders?store_id=STORE-101&page=1&limit=5
```

### 3. Update Order Status

```http
PATCH /orders/:id/status
```

Request body:

```json
{
  "status": "PREPARING"
}
```

## Database Indexes

Indexes are added on:

```js
store_id
created_at
```

Also, a compound index is added for efficient store-wise latest order fetching:

```js
{ store_id: 1, created_at: -1 }
```

## How to Run Project

### 1. Start Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

### 2. Start Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Frontend runs on:

```txt
http://localhost:3000
```

## Assumptions

- One order can contain multiple items.
- Status is restricted to `PLACED`, `PREPARING`, and `COMPLETED`.
- Order status is `PLACED` by default while creating a new order.
- `store_id` is accepted as a string because real-world stores may use custom IDs like `STORE-101`.
- Pagination default values are page `1` and limit `10`.

## Quality Highlights

- Modular backend structure
- Validation before database operations
- Clean API response format
- Database indexing for scalable queries
- UI separated into dedicated pages
- Environment variables used for configuration

## Author

Prathmesh Mane


## Latest Professional UI Updates

- Replaced Store ID with Store Name in create order and order list screens.
- Added clear instruction after order creation: copy the MongoDB Order ID and paste it in Update Order Status.
- Added helper text: “Paste MongoDB Order ID here” on the status update page.
- Added “Check All Orders” button to view every order without entering a store name.
- Frontend now supports both `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_API_BASE_URL`.
