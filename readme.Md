# 💬 Real-Time Chat App

A full-stack real-time chat application built with **MERN**, **Socket.io**, **Tailwind CSS**, and **DaisyUI**. Users can exchange text and image messages, hear notification sounds, manage contacts, and personalize their profiles — all in a sleek, responsive UI.

## 🚀 Tech Stack

- **Frontend**: React + Vite + Tailwind CSS + DaisyUI
- **Backend**: Node.js + Express + MongoDB
- **Real-time**: Socket.io
- **Image Uploads**: Cloudinary
- **Email Service**: Resend (Welcome Emails)
- **Rate Limiting**: Arcjet
- **Auth**: JSON Web Tokens (JWT)
- **Deployment**: Render

## ✨ Features

- 🔐 Persistent login with JWT
- 📸 Send text and image messages
- 🔊 Optional sound notification on message receive
- 🖼️ Drag-and-drop profile picture upload
- 📇 Contacts list with search functionality
- 💬 Chat list showing recent conversations
- 📤 Welcome email on registration
- 🛡️ Rate limiting via Arcjet

## 🧭 App Flow

1. **Login/Register** → Welcome email sent via Resend
2. **Dashboard** → Two tabs: `Chats` and `Contacts`
   - **Chats**: Shows users you've messaged. If empty, prompts you to choose someone from Contacts.
   - **Contacts**: Displays all registered users. Includes search functionality.
3. **Messaging** → Real-time text/image exchange with optional sound alerts
4. **Profile** → Upload profile picture via drag-and-drop (stored in Cloudinary)

## 🛠️ Local Setup

### 📦 Backend

```bash
cd backend
npm install
npm run dev  # runs nodemon index.js
```

# Edit file env.js in the backend lib:

import "dotenv/config";

```bash
export const ENV = {
PORT: process.env.PORT,
MONGO: process.env.MONGO_URI,
JWT: process.env.JWT_SECRET,
NODE_ENV: process.env.NODE_ENV,
RESEND: process.env.RESEND_API,
NAME: process.env.RESEND_FROM_NAME || "sender's name",
EMAIL: process.env.RESEND_FROM_EMAIL || "resend's email or custom domain you set up in resend",
URL: process.env.CLIENT_URL || "http://localhost:5173",
CLOUDINARY_KEY: process.env.CLOUDINARY_API_KEY,
CLOUDINARY_SECRET: process.env.CLOUDINARY_API_SECRET,
CLOUDINARY_NAME: process.env.CLOUDINARY_KEY_NAME,
ARCJET_KEY: process.env.ARCJET_KEY,
ARCJET_ENV: process.env.ARCJET_ENV,
};
```

# Frontend

```bash
cd frontend
npm install
npm run dev
```

# Edit the .env file in the frontend root:

VITE_SERVER=http://localhost:3000/api
VITE_BASE_URL=http://localhost:3000
