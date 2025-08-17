Perfect bhai 👍 samajh gaya. Tum chahte ho ke main **README file update kar dun**, jisme:
# 🗃 MKWS Inventory System

Inventory Management System for **Muslim Khatri Medical & Diagnostic Center**  
Built with **React + Redux Toolkit (frontend)** and **Node.js + Express + MongoDB (backend)**.

---

## 📂 Project Structure

```

├── client
│   ├── .env
│   ├── package.json
│   ├── public
│   ├── src
│   │   ├── api
│   │   │   └── api.js
│   │   ├── app
│   │   │   └── store.js         # Redux store
│   │   ├── features
│   │   │   ├── authSlice.js     # Auth state (login, signup)
│   │   │   └── productSlice.js  # Product state (CRUD)
│   │   ├── pages
│   │   │   ├── auth
│   │   │   │   ├── sign-in.jsx
│   │   │   │   └── sign-up.jsx
│   │   │   └── dashboard
│   │   │       ├── product.jsx
│   │   │       └── home.jsx
│   │   ├── main.jsx
│   │   └── App.jsx
│   └── vite.config.js
│
└── server
├── .env
├── server.js
├── config/db.js
├── models
│   ├── User.js
│   └── Product.js
├── controllers
│   ├── userController.js
│   └── productController.js
├── routes
│   ├── userRoutes.js
│   └── productRoutes.js
├── middleware
│   ├── authMiddleware.js
│   └── errorMiddleware.js
└── utils/generateToken.js

````

---

## 🔑 Environment Variables

### Backend (`server/.env`)

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/mkws_inventory
JWT_SECRET=replace_with_strong_secret
````

### Frontend (`client/.env`)

```env
VITE_API_URL=http://localhost:4000/api
```

---

## 🛠 API Endpoints

### User Routes (`/api/users`)

| Method | Endpoint    | Description                             |
| ------ | ----------- | --------------------------------------- |
| POST   | `/register` | Create new user (name, email, password) |
| POST   | `/login`    | Login user → returns JWT token          |
| GET    | `/profile`  | Get current user info (JWT required)    |

---

### Product Routes (`/api/products`)

| Method | Endpoint       | Description                      |
| ------ | -------------- | -------------------------------- |
| POST   | `/product`     | ➕ Create new product (protected) |
| GET    | `/products`    | 📦 Get all products              |
| GET    | `/product/:id` | 🔎 Get single product by ID      |
| PUT    | `/product/:id` | ✏️ Update product (protected)    |
| DELETE | `/product/:id` | 🗑 Delete product (protected)    |

**Protected Routes require header:**

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 📌 Example Requests

### Create Product

```bash
curl -s -X POST http://localhost:4000/api/products/product \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <TOKEN>" \
-d '{
  "name": "Paracetamol 500mg",
  "productId": "PCM-500",
  "buyRate": 2.75,
  "initialQuantity": 100,
  "description": "Pain reliever / fever reducer"
}'
```

### Get All Products

```bash
curl -s -X GET http://localhost:4000/api/products/products
```

### Get Single Product

```bash
curl -s -X GET http://localhost:4000/api/products/product/<PRODUCT_ID>
```

### Update Product

```bash
curl -s -X PUT http://localhost:4000/api/products/product/<PRODUCT_ID> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <TOKEN>" \
-d '{"name":"Updated Product Name","buyRate":3.5}'
```

### Delete Product

```bash
curl -s -X DELETE http://localhost:4000/api/products/product/<PRODUCT_ID> \
-H "Authorization: Bearer <TOKEN>"
```

---

## ⚡ Frontend Setup

```bash
cd client
npm install
npm run dev
```

* Uses **Redux Toolkit** for state management
* Product Page (`/dashboard/product`) integrates with Product APIs
* Authentication handled with JWT stored in `localStorage`

---

## 🚀 Backend Setup

```bash
cd server
npm install
npm run dev
```

Server runs on [http://localhost:4000](http://localhost:4000)

---

👉 Ab Redux Toolkit setup ready hai, next step frontend par **productSlice + integration** karna hoga.

Bhai kya chahte ho main abhi tumhe **productSlice + store setup + Product page me API integration code** de du?
