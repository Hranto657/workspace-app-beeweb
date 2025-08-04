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
