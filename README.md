<div align="center">

# 🎓 EduReach — Agentic College Assistant

### AI-powered college platform with RAG-based chat and voice call automation

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-View_App-2ea44f?style=for-the-badge)](https://edureach-student-assistant-eight.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](#license)

</div>

---

## 📸 Preview

<div align="center">
  <img src="https://via.placeholder.com/900x500.png?text=EduReach+Landing+Page" alt="EduReach landing page" width="45%" />
  <img src="https://via.placeholder.com/900x500.png?text=AI+Chatbot+in+Action" alt="EduReach chatbot" width="45%" />
</div>

> Replace the placeholders above with real screenshots or a short GIF walkthrough — this is the single highest-leverage thing you can add. Recruiters look at the image before reading a word.

---

## 🧠 What is EduReach?

EduReach is a full-stack, AI-powered college information platform that helps students explore courses, admissions, fees, placements, and campus life — through a **RAG-based chatbot** and an **AI voice-call assistant** — instead of digging through static pages or waiting on a counselor.

Rather than generating generic AI answers, the chatbot retrieves relevant context from a college knowledge base (via vector search) before responding — making it accurate, grounded, and specific to the institution.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🌐 **College Web Experience** | Public + gated content sections (hero, courses, mentors, placements, events) |
| 🔐 **Secure Authentication** | JWT-based signup/login with hashed passwords |
| 🤖 **RAG-Powered Chatbot** | Retrieves grounded answers from a real knowledge base instead of hallucinating |
| 🧩 **Vector Search** | MongoDB Atlas Vector Search over embedded knowledge chunks |
| 📞 **AI Voice Calling** | Vapi-powered outbound calls to convert interested students into leads |
| 🏗️ **Modular Architecture** | Clean separation of frontend, backend, and AI services |

---

## 🛠️ Tech Stack

<div align="center">

**Frontend**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)

**Backend**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

**AI / Integrations**

![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

---

## 🧩 How the RAG Pipeline Works

```
College Knowledge Base (text)
        │
        ▼
   Chunking & Splitting
        │
        ▼
 Embedding Generation (Google Generative AI)
        │
        ▼
 MongoDB Atlas Vector Search (stored)
        │
        ▼
Student Question ──► Similarity Search ──► Relevant Chunks
        │
        ▼
   Gemini (via LangChain) + Retrieved Context
        │
        ▼
    Grounded, College-Specific Answer
```

This grounding step is what separates EduReach's chatbot from a generic wrapper around an LLM API — answers are anchored to real, retrievable institutional data.

---

## 📂 Project Structure

```text
EduReach/
├── client/                 # React + TypeScript frontend
│   └── src/
│       ├── components/     # Reusable UI sections and widgets
│       ├── context/        # Authentication context
│       ├── pages/          # Main application pages
│       └── services/       # API service layer
│
└── server/                 # Node.js + Express + TypeScript backend
    ├── knowledge-base/     # College knowledge source for RAG
    └── src/
        ├── config/         # Database configuration
        ├── controllers/    # Request handlers
        ├── middleware/     # Auth and error middleware
        ├── models/         # MongoDB models
        ├── routes/         # API routes
        ├── services/       # RAG and Vapi services
        └── utils/          # JWT and password utilities
```

---

## 🔌 API Reference

<details>
<summary><b>Auth Routes</b></summary>

```http
POST  /api/auth/register   # Create a new user account
POST  /api/auth/login      # Login and receive JWT token
GET   /api/auth/me         # Get current authenticated user
```
</details>

<details>
<summary><b>Chat Routes</b></summary>

```http
POST  /api/chat/message    # Send a student query to the AI chatbot
```
</details>

<details>
<summary><b>Voice Call Routes</b></summary>

```http
POST  /api/vapi/call       # Start an outbound AI voice call
```
</details>

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- MongoDB Atlas account (for Vector Search)
- Google AI API key
- Vapi API key

### 1. Clone & install

```bash
git clone https://github.com/<your-username>/edureach.git
cd edureach

# Backend
cd server && npm install

# Frontend
cd ../client && npm install
```

### 2. Configure environment variables

Create a `.env` file inside `server/`:

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
GOOGLE_API_KEY=your_google_ai_api_key
VAPI_API_KEY=your_vapi_api_key
VAPI_PHONE_NUMBER_ID=your_vapi_phone_number_id
VAPI_ASSISTANT_ID=your_vapi_assistant_id
```

Create a `.env` file inside `client/`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Run locally

```bash
# Terminal 1 — backend
cd server && npm run dev     # http://localhost:5000

# Terminal 2 — frontend
cd client && npm run dev     # http://localhost:5173
```

---

## 🔒 Security

- Passwords hashed with bcrypt before storage
- JWT-protected API routes with middleware verification
- Secrets managed via environment variables (never committed)
- CORS restricted to approved frontend origins

---

## 🗺️ Roadmap

- [ ] Admin panel for managing college knowledge content
- [ ] Persistent chat history for logged-in users
- [ ] Counselor dashboard for leads and call requests
- [ ] Multilingual chatbot support
- [ ] Analytics on most-asked student queries

---

## 👤 Author

**Your Name**
[GitHub](https://github.com/your-username) · [LinkedIn](https://linkedin.com/in/your-linkedin) · [Portfolio](#)

---

<div align="center">
Built with ❤️ to make college exploration faster, smarter, and more human — even when it's AI answering.
</div>
