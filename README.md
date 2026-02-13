
# 📝 Lead Notes - Full Stack MERN Application

**Lead Notes** is a robust, production-ready note-taking application built with the **MERN Stack** and **TypeScript**. It features secure authentication via Firebase, image storage with Cloudinary, and fully documented REST APIs using Swagger.

---

## 🚀 Live Links

| Component | Status | URL |
| --- | --- | --- |
| **Frontend** | 🟢 Live | [https://lead-notes-eta.vercel.app/](https://lead-notes-eta.vercel.app/) |
| **Backend API** | 🟢 Live | [https://lead-notes.onrender.com](https://lead-notes.onrender.com) |
| **API Documentation** | 📄 Swagger | [https://lead-notes.onrender.com/api-docs](https://lead-notes.onrender.com/api-docs) |

---

## ✨ Key Features

* **🔐 Secure Authentication**: Google Sign-In powered by **Firebase Auth** with backend token verification.
* **📸 Image Uploads**: Seamless image handling using **Cloudinary** for optimized storage.
* **📘 API Documentation**: Interactive API testing available via **Swagger UI**.
* **🛡️ Type Safety**: Built entirely with **TypeScript** for both client and server.
* **📱 Responsive Design**: A modern, mobile-friendly UI built with **React** and **Tailwind CSS**.
* **☁️ Cloud Deployment**: Hosted on **Vercel** (Frontend) and **Render** (Backend).

---

## 🛠️ Tech Stack

### **Frontend**

* **React (Vite)** - Fast, modern UI library.
* **TypeScript** - Static typing for scalable code.
* **Tailwind CSS** - Utility-first styling.
* **Axios** - HTTP client for API requests.
* **Firebase SDK** - Client-side authentication.

### **Backend**

* **Node.js & Express** - Robust server framework.
* **MongoDB & Mongoose** - NoSQL database with schema modeling.
* **Firebase Admin SDK** - Server-side token verification.
* **Multer & Cloudinary** - Handling multipart form-data and image storage.
* **Swagger (OpenAPI)** - API documentation standard.

---

## ⚙️ Local Development Setup

Follow these steps to run the project locally.

### 1. Clone the Repository

git clone [https://github.com/AyushMhaisane/Lead-Notes.git](https://github.com/AyushMhaisane/Lead-Notes.git)
cd Lead-Notes

### 2. Backend Setup

Navigate to the server folder and install dependencies:
cd server
npm install

**Configure Environment Variables:**
This project uses an `.env.example` file to help you set up quickly.
cp .env.example .env

Open the `.env` file and fill in your credentials:

* **MONGO_URI**: Your MongoDB connection string.
* **CLOUDINARY_**: Your Cloudinary API keys.
* **Important:** Download `serviceAccountKey.json` from Firebase Console -> Project Settings -> Service Accounts and place it in the `server` root folder.

Run the server:
npm run dev

### 3. Frontend Setup

Open a new terminal, navigate to the client folder, and install dependencies:
cd client
npm install

**Configure Environment Variables:**
cp .env.example .env

Open the `.env` file and fill in your keys:

* **VITE_FIREBASE_**: Your Firebase Client SDK keys.
* **VITE_API_URL**: Ensure this points to `http://localhost:5000/api` for local development.

Run the client:
npm run dev

---

## 📖 API Documentation

The backend includes a fully interactive Swagger UI. You can test endpoints directly from the browser.

1. Navigate to `/api-docs` on your running server (e.g., `http://localhost:5000/api-docs`).
2. Authorize using your Firebase ID Token (Bearer Token).
3. Test endpoints like `GET /notes` or `POST /notes`.

---

## 👨‍💻 Author

**Ayush Mhaisane**

* **Portfolio:** [www.ayushmhaisaane.in](https://www.google.com/search?q=https://www.ayushmhaisaane.in)
* **Email:** [ayushmhaisane25@gmail.com](mailto:ayushmhaisane25@gmail.com)
* **GitHub:** [AyushMhaisane](https://github.com/AyushMhaisane)

---

### Show your support

Give a ⭐️ if you like this project!