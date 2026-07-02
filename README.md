# EduReach - Agentic College Chatbot

EduReach is a full-stack AI-powered college information platform built to help students explore courses, admissions, fees, placements, campus life, and counselor support from one modern web experience.

The project combines a React frontend, an Express/TypeScript backend, MongoDB authentication, a RAG-based AI chatbot, and Vapi-powered outbound voice call support.

## Key Highlights

- College landing page with public and gated content sections
- Student signup and login with JWT-based authentication
- Floating AI chatbot for college-related queries
- RAG workflow using a college knowledge base and vector search
- Google Gemini integration through LangChain
- MongoDB Atlas Vector Search for semantic retrieval
- AI voice call request flow using Vapi
- Modular frontend and backend structure
- Environment-based configuration for local and deployed setups

## What Problem It Solves

Students usually need to browse multiple pages or contact a counselor to get basic college information. EduReach simplifies that journey by giving students an AI assistant that can answer questions about courses, fees, admissions, placements, mentors, and campus life.

Instead of generating generic answers, the chatbot retrieves relevant information from the college knowledge base before responding. This makes the answers more focused, contextual, and useful for admission-related queries.

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- Lucide React
- React Hot Toast

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- JWT
- bcryptjs

### AI and Integrations

- LangChain
- Google Gemini
- Google Generative AI Embeddings
- MongoDB Atlas Vector Search
- Vapi AI voice calling

## Project Structure

```text
EduReach/
+-- client/                 # React + TypeScript frontend
|   +-- src/
|       +-- components/     # Reusable UI sections and widgets
|       +-- context/        # Authentication context
|       +-- pages/          # Main application pages
|       +-- services/       # API service layer
|
+-- server/                 # Node.js + Express + TypeScript backend
    +-- knowledge-base/     # College knowledge source for RAG
    +-- src/
        +-- config/         # Database configuration
        +-- controllers/    # Request handlers
        +-- middleware/     # Auth and error middleware
        +-- models/         # MongoDB models
        +-- routes/         # API routes
        +-- services/       # RAG and Vapi services
        +-- utils/          # JWT and password utilities
```

## Main Features

### 1. College Website Experience

The frontend presents a clean college website with sections such as hero, about, achievements, courses, mentors, student life, events, hiring statistics, and footer.

Some sections are public, while deeper content is unlocked after signup/login. This creates a better student engagement flow and encourages interested users to create an account.

### 2. Authentication

EduReach includes user registration, login, and profile verification.

The backend hashes passwords before storing them in MongoDB and issues a JWT token after successful signup or login. Protected routes use token verification middleware to allow only authenticated users.

### 3. AI Chatbot

The floating chatbot allows students to ask questions directly from the website. The user message is sent to the backend, where the RAG service processes it and returns an AI-generated answer.

Example questions:

- What courses do you offer?
- Tell me about placements.
- What is the fee structure?
- How can I apply for admission?

### 4. RAG-Based Knowledge Retrieval

RAG stands for Retrieval-Augmented Generation.

When the server starts, the college knowledge base text file is loaded, split into smaller chunks, converted into embeddings, and stored in MongoDB Atlas Vector Search.

When a student asks a question, the system searches the most relevant knowledge chunks and passes them to the AI model. The final response is generated using the retrieved college-specific context.

This improves accuracy and keeps chatbot answers aligned with the available college information.

### 5. AI Voice Call Request

Logged-in users can request a voice call by providing their phone number and preferred course. The backend verifies the user and uses Vapi to initiate an outbound AI call.

This feature helps convert interested students into active leads and gives the platform a counselor-style interaction flow.

## API Overview

### Auth Routes

```text
POST /api/auth/register   # Create a new user account
POST /api/auth/login      # Login and receive JWT token
GET  /api/auth/me         # Get current authenticated user
```

### Chat Routes

```text
POST /api/chat/message    # Send a student query to the AI chatbot
```

### Vapi Routes

```text
POST /api/vapi/call       # Start an outbound AI voice call
```

## Environment Variables

Create a `.env` file inside the `server/` directory.

```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=your_mongodb_atlas_uri
MONGODB_URI_LOCAL=your_optional_local_mongodb_uri
JWT_SECRET=your_jwt_secret
GOOGLE_API_KEY=your_google_ai_api_key
VAPI_API_KEY=your_vapi_api_key
VAPI_PHONE_NUMBER_ID=your_vapi_phone_number_id
VAPI_ASSISTANT_ID=your_vapi_assistant_id
```

For the frontend, you can configure the backend API URL with:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Getting Started

### 1. Install Backend Dependencies

```bash
cd server
npm install
```

### 2. Install Frontend Dependencies

```bash
cd ../client
npm install
```

### 3. Start the Backend

```bash
cd server
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 4. Start the Frontend

```bash
cd client
npm run dev
```

The frontend usually runs on:

```text
http://localhost:5173
```

## Build Commands

### Backend

```bash
cd server
npm run build
```

### Frontend

```bash
cd client
npm run build
```

## Security Notes

- Passwords are hashed before being stored.
- JWT is used for protected API access.
- Environment variables are used for API keys and secrets.
- Sensitive credentials should never be committed to Git.
- CORS is configured to allow approved frontend origins.

## Future Improvements

- Admin panel for managing college knowledge content
- Chat history storage for logged-in users
- Counselor dashboard for leads and call requests
- Multilingual chatbot support
- Analytics for most asked student queries
- Better dashboard experience for students

## Project Summary

EduReach is a modern college admission assistant platform that brings together a responsive website, secure authentication, AI-powered chat, knowledge-base retrieval, and automated voice calling. It is designed to make college exploration faster, smarter, and more interactive for students.
