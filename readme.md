
# 🗃 MKWS Inventory System

## 📂 Project Structure

### Client (React Frontend)

```
client/
├── .env
├── index.html
├── package.json
├── public/
│   ├── css/          # Tailwind CSS
│   └── img/          # Images & logos
├── src/
│   ├── api/
│   │   └── api.js            # Axios instance with baseURL
│   ├── App.jsx
│   ├── configs/              # Chart configs, theme configs
│   ├── context/              # React Context providers
│   ├── data/                 # Sample or static data
│   ├── layouts/              # Layout components (auth, dashboard)
│   ├── main.jsx
│   ├── pages/                # Pages (auth, dashboard)
│   ├── routes.jsx
│   └── widgets/              # UI components (cards, charts, layout)
├── tailwind.config.cjs
└── vite.config.js
```

### Server (Backend)

```
server/
├── .env                     # Env variables
├── config/
│   └── db.js                # MongoDB connection
├── controllers/
│   └── userController.js    # Auth logic (register, login)
├── middleware/
│   ├── authMiddleware.js    # Protect routes (JWT verification)
│   └── errorMiddleware.js   # Error handler
├── models/
│   └── User.js              # User schema
├── routes/
│   └── userRoutes.js        # /api/users endpoints
├── utils/
│   └── generateToken.js     # JWT helper
├── server.js                # Entry point
└── package.json
```

---

## 🔑 Environment Variables

### Backend (`server/.env`)

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/mkws_inventory
JWT_SECRET=replace_with_strong_secret
```

### Frontend (`client/.env`)

```env
VITE_API_URL=http://localhost:4000/api
```

---

## 🛠 API Endpoints

### User Routes (`/api/users`)

| Method | Endpoint               | Description                             |
| ------ | ---------------------- | --------------------------------------- |
| POST   | `/register`            | Create new user (name, email, password) |
| POST   | `/login`               | Login user → returns JWT token          |
| GET    | `/profile` (protected) | Get current user info (JWT required)    |

**Protected Route Header**:

```
Authorization: Bearer <JWT_TOKEN>
```

---

### How to Test APIs

1. **Run backend server**

```bash
cd server
npm install
npm run dev
```

2. **Use API Client** (Postman, Thunder Client, cURL)

**Health Check**

```bash
curl -s http://localhost:4000/api/health
```

**Register User**

```bash
curl -s -X POST http://localhost:4000/api/users/register \
-H "Content-Type: application/json" \
-d '{"name":"Fahad","email":"fahad@welfare.local","password":"123456"}'
```

**Login User**

```bash
curl -s -X POST http://localhost:4000/api/users/login \
-H "Content-Type: application/json" \
-d '{"email":"fahad@welfare.local","password":"123456"}'
```

**Get Profile**

```bash
curl -s -X GET http://localhost:4000/api/users/profile \
-H "Authorization: Bearer <JWT_TOKEN>"
```

---

## ⚡ Frontend Setup

```bash
cd client
npm install
npm run dev
```

* Axios instance uses `VITE_API_URL` from `.env`.
* Login & Signup pages have:

  * Form validation
  * Password visibility toggle (eye button)
  * JWT token storage in `localStorage`

---
