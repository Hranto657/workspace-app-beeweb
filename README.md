# 🧩 Workspace Manager — Fullstack App (Interview Task)

This is a fullstack web application that implements:

- 🔐 User authentication (JWT-based)
- 🛠️ CRUD operations for workspaces
- 🔍 Realtime slug availability check with suggestions
- 🖥️ Frontend in Next.js (React)
- ⚙️ Backend in NestJS (Node.js)
- 💾 MySQL database

---

## ✨ Features

- Signup / Login with hashed passwords
- JWT token authentication and protected routes
- Create / Read / Update / Delete workspaces
- Each workspace has a unique `slug` (used in URLs)
- API suggests next available slug if desired one is taken (e.g., `beeweb1`, `beeweb2`)
- Slug availability check with debounce on frontend

---

🚀 Getting Started (Local Development)
Follow these steps to run the fullstack project locally.

🐬 1. Run MySQL via Docker
This project uses a local MySQL 8 container as the database.

✅ If container is already created
Start the container: docker start mysql-ws-app

🐳 If not created yet (create manually) 
docker run --name mysql-ws-app -e MYSQL_ROOT_PASSWORD=12345678 -p 3306:3306 -d mysql:8

🗄️ 2. Set Up Backend (NestJS)

🔧 Prerequisites
Node.js v18
NPM

📁 .env file
Create a .env file in the backend/ directory and paste this:

NODE_ENV=development

# ========== DATABASE ==========
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=12345678
DB_NAME=workspace_app

# ========== JWT TOKENS ==========
JWT_ACCESS_SECRET=access_supersecret_key
JWT_ACCESS_EXPIRES_IN=15m

JWT_REFRESH_SECRET=refresh_supersecret_key
JWT_REFRESH_EXPIRES_IN=7d

# ========== APP CONFIG ==========
PORT=4000
CLIENT_URL=http://localhost:3000

📦 Install dependencies
cd backend
npm install

🚀 Run the server
npm run start:dev - This starts the NestJS backend on http://localhost:4000.

💻 3. Set Up Frontend (Next.js)

📦 Install dependencies
cd frontend
npm install

🚀 Run the frontend
npm run dev - The frontend will be available at http://localhost:3000.

| Layer      | Tech                              |
| ---------- | --------------------------------- |
| Frontend   | Next.js, React                    |
| Styling    | Tailwind CSS                      |
| Forms      | React Hook Form                   |
| Backend    | NestJS, TypeScript                |
| DB         | MySQL (via Docker)                |
| ORM        | TypeORM                           |
| Auth       | JWT (Access + Refresh)            |
| Slug Check | Realtime (debounced) via REST API |

📊 Database Management
You can use TablePlus, MySQL Workbench, or any GUI to inspect the database:

Host: localhost  
Port: 3306  
User: root  
Password: 12345678  
Database: workspace_app








