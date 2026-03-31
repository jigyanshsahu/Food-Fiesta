# Dockerization & Deployment Guide

This guide explains how to containerize and deploy your full-stack Food-Fiesta application using Docker.

## Prerequisites
- **Docker** installed on your machine.
- **Docker Compose** installed (usually included with Docker Desktop).

## Project Structure
The project is split into three services:
1.  **Backend**: Node/Express API (Port 4000)
2.  **Frontend**: React/Vite Client (Port 5173 on host, Port 80 in container)
3.  **Admin**: React/Vite Dashboard (Port 5174 on host, Port 80 in container)

---

## Local Development (with Docker Compose)

To build and start all services locally, run the following command in the root directory:

```bash
docker-compose up --build
```

### Accessing the Services
- **Client App**: `http://localhost:5173`
- **Admin Panel**: `http://localhost:5174`
- **Backend API**: `http://localhost:4000`

### Updating Environment Variables
You can override the default environment variables by creating a `.env` file in the root directory (where `docker-compose.yml` is) or by modifying the `environment` section in the `docker-compose.yml` file.

---

## Deploying to a Production Server (VPS)

### 1. Preparation
Ensure the `VITE_BACKEND_URL` in `docker-compose.yml` is set to your server's public IP or domain.

```yaml
# In docker-compose.yml
frontend:
  build:
    context: ./frontend
    args:
      - VITE_BACKEND_URL=https://your-api-domain.com
```

### 2. Deployment Steps
1.  **Transfer Files**: Clone your repository onto the server.
2.  **Environment Setup**: Create a `.env` file on the server with production secrets (Stripe, Cloudinary, MongoDB URI).
3.  **Run with Compose**:
    ```bash
    # Run in detached mode
    docker-compose up -d --build
    ```

### 3. SSL and Reverse Proxy (Optional)
For production, it is highly recommended to use **Nginx Proxy Manager** or **Traefik** to handle SSL (HTTPS) and route traffic to the correct containers.

---

## Troubleshooting

### Container Networking
Each service is on the `food-fiesta-network`. The backend can be reached by other containers using `http://backend:4000`. However, since the **browser** (client side) makes the API calls, `VITE_BACKEND_URL` must be the URL the *browser* sees (like `http://localhost:4000` or a public IP).

### Rebuilding After Changes
If you modify your code, run:
```bash
docker-compose up --build
```

### Stopping Services
```bash
docker-compose down
```
