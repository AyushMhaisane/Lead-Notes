# 🚀 Lead Notes App (MERN + TypeScript)

A full-stack application for managing lead notes with secure authentication, image attachments, and a modern UI.

![Dashboard Preview](./client/public/vite.svg) *Add a screenshot of your dashboard here for bonus points*

## ✨ Features
- **🔐 Secure Authentication:** Hybrid auth using Firebase (Frontend) and Firebase Admin SDK (Backend) for server-side token verification.
- **📁 Image Integration:** Drag-and-drop image uploads powered by Cloudinary.
- **⚡ Performance:** MongoDB indexing on `userId` for O(1) query performance at scale.
- **🛡️ Type Safety:** End-to-end TypeScript (Frontend & Backend) for robust, error-free code.
- **📄 API Documentation:** Auto-generated Swagger/OpenAPI documentation.

## 🛠️ Tech Stack
- **Frontend:** React, Vite, TypeScript, Tailwind CSS, React Query, Firebase Auth.
- **Backend:** Node.js, Express, TypeScript, MongoDB (Mongoose), Multer.
- **Services:** Cloudinary (Storage), Firebase (Identity).

---

## 🚀 How to Run Locally

### 1. Clone the Repo
```bash
git clone [https://github.com/YOUR_USERNAME/lead-notes-app.git](https://github.com/YOUR_USERNAME/lead-notes-app.git)
cd lead-notes-app

2. Backend Setup
Bash

cd server
npm install

    Create a .env file in server/ with the following:

Code snippet

PORT=5000
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

    Important: Place your serviceAccountKey.json from Firebase in the server/ root.

Run the server:
Bash

npm run dev

3. Frontend Setup

Open a new terminal:
Bash

cd client
npm install

    Create a .env file in client/ with your Firebase config:

Code snippet

VITE_FIREBASE_API_KEY=...
VITE_API_URL=http://localhost:5000/api

Run the client:
Bash

npm run dev

📚 API Documentation

Once the server is running, visit: http://localhost:5000/api-docs
🏗️ Architecture Decisions

    Monorepo Structure: Keeps frontend and backend strictly typed and versioned together.

    Controller-Service Pattern: Backend logic is separated from routes for testability.

    Security First: No sensitive keys in repo; Auth tokens verified on every private request.