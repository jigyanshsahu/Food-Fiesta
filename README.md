# 🍔 Food Fiesta — Full-Stack Food Delivery Platform

[![React](https://img.shields.io/badge/Frontend-React%20%7C%20Vite-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Payments-Stripe-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)
[![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![Docker](https://img.shields.io/badge/Container-Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

**Food Fiesta** is a modern, responsive, and full-featured food ordering and delivery web application built with the **MERN** stack (MongoDB, Express, React, Node.js) and bundled with **Vite**. It features customer-facing food browsing, dish customization, search autocomplete, a persistent cart, live order tracking, a dedicated Admin Dashboard, and secure Stripe payments.

---

## 🌟 Features

### 🍽️ Customer Web App (`frontend/`)
- **Dynamic Food Showcase**: Filter food items by category (Salad, Rolls, Deserts, Sandwich, Cake, Pure Veg, Pasta, Noodles).
- **Live Search Autocomplete**: Instant search with dish thumbnail preview, category tags, and price info.
- **Interactive Food Customization Modal**: Customize spice levels (Mild, Medium, Spicy), select add-ons (Extra Cheese, Garlic Dip, Sauce), and pick portion quantities before adding to cart.
- **Persistent Cart & Slide-out Drawer**: Seamless cart management synchronized with MongoDB when authenticated.
- **Secure Stripe Payment Gateway**: Integrated Stripe checkout session with automated return/verification callbacks.
- **Order Tracking & Active Order Widget**: Real-time floating status badge (`Food Processing` ➔ `Out for delivery` ➔ `Delivered`) and a dedicated **My Orders** history page.
- **Responsive UI/UX**: Fluid design crafted with custom CSS, modern typography (Plus Jakarta Sans & Outfit), smooth micro-interactions, and mobile responsiveness.

### 🛡️ Admin Dashboard (`admin/`)
- **Product Management**: Add new food dishes with Cloudinary image uploads, descriptions, categories, and prices.
- **Product Catalog Listing**: View and delete items from the live database.
- **Real-time Order Operations**: View customer orders, items, addresses, payment status, and update shipment progress.

### ⚙️ Backend & Security (`backend/`)
- **RESTful API**: Clean Express.js architecture with modular routes and controllers.
- **JWT Authentication**: Encrypted passwords via `bcrypt` and secure stateless tokens via `jsonwebtoken`.
- **Cloudinary Storage**: Direct cloud image uploads using `multer-storage-cloudinary` for ephemeral-friendly deployments.
- **Security & Rate Limiting**: Protection against brute-force attacks on auth endpoints via `express-rate-limit`.
- **Cross-Origin Resource Sharing (CORS)**: Multi-origin configuration supporting both customer frontend and admin panels.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Client Frontend** | React 19, Vite, React Router 7, Axios, Context API |
| **Admin Dashboard** | React 19, Vite, React Router 7, Axios, React Toastify |
| **Backend API** | Node.js (ES Modules), Express.js 5 |
| **Database** | MongoDB Atlas with Mongoose ORM |
| **Image Hosting** | Cloudinary API & SDK |
| **Payments** | Stripe API |
| **DevOps & Deploy** | Docker, Docker Compose, Nginx, Render (`render.yaml`), Vercel (`vercel.json`) |

---

## 📁 Project Structure

```text
Food-Fiesta/
├── backend/                  # Node.js & Express API
│   ├── config/               # DB and Cloudinary configurations
│   ├── controllers/          # Business logic (food, user, cart, order)
│   ├── middleware/           # Auth token verification
│   ├── models/               # Mongoose schemas (Food, User, Order)
│   ├── routes/               # API route definitions
│   ├── server.js             # Express application entrypoint
│   ├── Dockerfile            # Container definition for backend
│   └── package.json
│
├── frontend/                 # Client React SPA
│   ├── src/
│   │   ├── components/       # UI components (Navbar, CartDrawer, FoodModal, Search, etc.)
│   │   ├── context/          # Global state (StoreContext)
│   │   ├── pages/            # Home, Cart, Placeorder, Myorders, Verify
│   │   └── App.jsx           # Main router & layout
│   ├── Dockerfile            # Multi-stage build with Nginx
│   ├── nginx.conf            # Nginx reverse proxy / SPA fallback
│   ├── vercel.json           # Vercel rewrite configuration
│   └── package.json
│
├── admin/                    # Admin Dashboard SPA
│   ├── src/
│   │   ├── components/       # Admin Navbar, Sidebar
│   │   ├── pages/            # Add, List, Orders
│   │   └── App.jsx           # Admin router
│   ├── Dockerfile            # Multi-stage build with Nginx
│   ├── vercel.json           # Vercel rewrite configuration
│   └── package.json
│
├── docker-compose.yml        # Multi-container orchestration
├── render.yaml               # Render Infrastructure-as-Code Blueprint
├── DOCKER_GUIDE.md           # Guide for running & deploying with Docker
└── README.md
```

---

## 🚀 Getting Started (Local Development)

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB)
- [Cloudinary](https://cloudinary.com/) account (for dish image storage)
- [Stripe](https://stripe.com/) account (test API keys)

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` directory:

```env
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/food-fiesta
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
FRONTEND_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the backend:
```bash
npm run dev
# Server running on http://localhost:4000
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file inside `frontend/`:
```env
VITE_BACKEND_URL=http://localhost:4000
```

Start the frontend:
```bash
npm run dev
# App running on http://localhost:5173
```

---

### 4. Admin Setup

```bash
cd ../admin
npm install
```

Create a `.env` file inside `admin/`:
```env
VITE_BACKEND_URL=http://localhost:4000
```

Start the admin panel:
```bash
npm run dev
# Dashboard running on http://localhost:5174
```

---

## 🐳 Running with Docker

Run the entire full-stack application (Backend, Frontend, Admin) with a single command using Docker Compose:

```bash
docker compose up --build
```

- **Client App**: [http://localhost:5173](http://localhost:5173)
- **Admin Panel**: [http://localhost:5174](http://localhost:5174)
- **Backend API**: [http://localhost:4000](http://localhost:4000)

To stop services:
```bash
docker compose down
```

For more details, see [DOCKER_GUIDE.md](./DOCKER_GUIDE.md).

---

## 🌐 Deployment

### Option A: Render (1-Click Blueprint)
This repository includes a pre-configured [render.yaml](./render.yaml) file:
1. Push your code to GitHub.
2. Open [Render Dashboard](https://dashboard.render.com/) → **New +** → **Blueprint**.
3. Select this repository.
4. Provide the required environment variables (MongoDB URI, Stripe keys, Cloudinary credentials).
5. Render automatically provisions:
   - Backend API as a **Web Service**
   - Frontend as a **Static Site** (100% free, fast CDN, zero sleep)
   - Admin Panel as a **Static Site** (100% free, fast CDN, zero sleep)

### Option B: Vercel (Frontends) + Render (Backend)
- **Backend**: Deploy `backend/` to Render or Railway as a Node Web Service.
- **Frontend**: Import repository into Vercel, set root directory to `frontend`, add `VITE_BACKEND_URL`.
- **Admin**: Import repository into Vercel, set root directory to `admin`, add `VITE_BACKEND_URL`.
*(Both frontend and admin directories include `vercel.json` rewrites for SPA client-side routing).*

---

## 🔌 API Reference

### User Endpoints (`/api/user`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/user/register` | Register a new user | ❌ |
| `POST` | `/api/user/login` | Login and return JWT token | ❌ |

### Food Endpoints (`/api/food`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/food/list` | Retrieve all food items | ❌ |
| `POST` | `/api/food/add` | Add a food item (multipart/form-data) | ✅ |
| `POST` | `/api/food/remove` | Delete a food item by ID | ✅ |

### Cart Endpoints (`/api/cart`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/cart/get` | Fetch current user's cart | ✅ |
| `POST` | `/api/cart/add` | Add/increment item in cart | ✅ |
| `POST` | `/api/cart/remove` | Decrement/remove item in cart | ✅ |

### Order Endpoints (`/api/order`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/order/place` | Create an order & Stripe Checkout session | ✅ |
| `POST` | `/api/order/verify` | Verify payment callback from Stripe | ❌ |
| `POST` | `/api/order/userorders` | Fetch orders for authenticated user | ✅ |
| `GET` | `/api/order/list` | List all orders (Admin view) | ✅ |
| `POST` | `/api/order/status` | Update delivery/order status | ✅ |

---

## 🛡️ License

This project is licensed under the [ISC License](LICENSE).
