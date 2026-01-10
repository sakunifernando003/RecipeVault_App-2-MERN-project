# 🍽️ Food Recipe App

A full-stack recipe sharing application built with MERN stack (MongoDB, Express, React, Node.js).

## ✨ Features
- User authentication (Login/Signup)
- Create, Read, Update, Delete recipes
- Favorite recipes system
- Image upload for recipes
- Responsive design with Tailwind CSS

## 🛠️ Tech Stack
**Frontend:** React + TypeScript + Vite + Tailwind CSS  
**Backend:** Node.js + Express + MongoDB + Mongoose  
**Authentication:** JWT (JSON Web Tokens)

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/food-recipe-app.git
cd food-recipe-app
```

### 2. Setup Backend
```bash
cd backend
npm install
# Create .env file with:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/recipeapp
# JWT_SECRET=your_secret_key
npm start
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

### 4. Access App
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure
```
recipe-app/
├── frontend/          # React + TypeScript + Vite
├── backend/           # Express + MongoDB API
└── README.md
```

## 📡 API Endpoints
- `GET    /recipe` - Get all recipes
- `GET    /recipe/:id` - Get single recipe
- `POST   /recipe` - Create recipe (protected)
- `PUT    /recipe/:id` - Update recipe (protected)
- `DELETE /recipe/:id` - Delete recipe (protected)
- `POST   /login` - User login
- `POST   /signup` - User registration

## 📱 Pages
- `/` - Home (All recipes)
- `/myRecipe` - My recipes (Protected)
- `/favRecipe` - Favorite recipes
- `/addRecipe` - Add new recipe (Protected)
- `/editRecipe/:id` - Edit recipe (Protected)

## 🔐 Authentication
- JWT tokens stored in localStorage
- Protected routes require valid token
- Passwords hashed with bcrypt

## 📦 Dependencies
**Frontend:** react, react-router-dom, axios, react-icons  
**Backend:** express, mongoose, jsonwebtoken, bcrypt, multer, cors



---
**Made using MERN Stack**
