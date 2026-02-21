# 🚀 Galaxy Math & Emergency Preparedness — Autism Learning Portal

A gamified, multi-module learning platform specifically designed to help children with autism master basic mathematical concepts, daily survival skills, and emergency preparedness through visual aids, interactive exercises, and a predictable, space-themed environment.

---

## 📋 Table of Contents

- [Features Overview](#features-overview)
- [Module 1: Emergency Awareness (Lab 1)](#module-1-emergency-awareness-lab-1)
- [Module 2: Galaxy Math (Lab 2)](#module-2-galaxy-math-lab-2)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [How to Run](#how-to-run)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Student Details](#student-details)

---

## 🌟 Features Overview

### Autism-Friendly Design System
- **Predictability & Structure** — Consistent UI patterns across all pages and modules.
- **Sensory Controls** — Dedicated **Pilot Settings** to toggle Calm Mode (reduces visual clutter), adjust animation speeds, and change celebration styles (quiet vs. exciting).
- **Positive Reinforcement** — Points, coins, and a comprehensive **Trophy Room** to keep learners motivated and engaged.
- **Visual Learning First** — Heavy use of pictograms, colorful illustrations, and step-by-step visualizations rather than text-heavy instructions.
- **Offline Support** — Key visual assets (especially Emergency procedures) are embedded locally to ensure the app works reliably without internet access.

### Global Features
- 🔐 **JWT Authentication & Guest Mode** — Secure accounts with database persistence, plus a quick-start Guest Mode.
- 🌙☀️ **Dark / Light Mode** — Built-in theme toggles across all components.
- 🔊 **Audio Feedback** — Predictable text-to-speech instructions and satisfying interaction sounds.
- 👤 **Avatar Station** — Earned coins can be spent on customizing the player's astronaut (Helmet, Suit, Pet companions).

---

## 🚨 Module 1: Emergency Awareness (Lab 1)

A crucial safety module designed to teach children what to do in highly stressful or dangerous situations using clear, step-by-step visual stories.

### Key Interactive Features
- **Visual Emergency Steps**: 🖼️ Step-by-step animated flashcards for specific scenarios:
  - 🔥 Fire Emergency
  - 🚑 Medical Emergency
  - ⚠️ Stranger Danger
  - 🌍 Earthquake Safety
  - 📍 Getting Lost
  - 🧘‍♂️ Feeling Overwhelmed (Anxiety Coping)
- **Offline Reliability**: All 28 emergency step illustration images are generated and stored locally in `public/emergency_assets` so that safety instructions are accessible even when offline.
- **Safety Demo Interactive Mode**: A safe sandbox where kids can practice dialing "9-1-1" or "100" on a simulated phone dialer.
- **My Safety ID**: A digital, locally-stored identification card capturing the child's Name, Blood Type, Emergency Contact, Medical Conditions, and Allergies. First responders can quickly read this if the child goes non-verbal.

---

## 🌌 Module 2: Galaxy Math (Lab 2)

An interactive, space-themed math tutoring system where children travel physical paths between planets to unlock increasingly complex math concepts.

### The Games
| Game | Description | Difficulty Scaling |
|---|---|---|
| 🪐 **Counting** | Tap planets & stars to count, then pick the right number | Easy: 1–5, Medium: 1–10, Hard: 1–20 |
| ➕ **Addition** | Visual addition with grouped space objects | Easy, Medium, Hard |
| ➖ **Subtraction** | Visual subtraction with grouped space objects | Easy, Medium, Hard |
| ✖️ **Multiplication** | Visual grouping logic mapping to numbers | Easy, Medium, Hard |
| ➗ **Division** *(New)* | Fairly dividing space cargo among rockets | Easy, Medium, Hard |
| 🍕 **Fractions** *(New)* | Assembling segmented space-pizzas/fuel tanks | Easy, Medium, Hard |
| 🌌 **Patterns** | Complete AB / ABC / AABB shape sequences | Easy: AB, Medium: ABC, Hard: AABB |
| 🚀 **Memory Match** | Flip cards to find matching space pairs | Easy: 4 pairs, Medium: 6, Hard: 8 |
| 📚 **Learn Numbers** | Explore numbers 1–10 with interactive items | — |

### Gameplay Mechanics
- 🗺️ **Galaxy Map Navigation** — A stunning parallax space map where users click to travel to unlocked planets.
- 🎯 **Daily Missions** — Routine tasks that reward users with bonus coins.
- 🏆 **Leaderboards** — Competition tracking connected to the MongoDB backend.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI framework |
| Tailwind CSS | Utility-first styling with dynamic glassmorphism |
| Framer Motion | Smooth, predictable, and accessible animations |
| React Router | Screen and module navigation |
| Web Audio & Speech API | Accessibility and interaction feedback |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server for user profiles and scores |
| MongoDB + Mongoose | Database for persistent storage |
| JWT & bcryptjs | Secure authentication and password hashing |

---

## ✅ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v16 or higher
- [npm](https://www.npmjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud URI or a local MongoDB instance.

---

## ▶️ How to Run

### 1. Clone the Repository

```bash
git clone https://github.com/rvsr26/galaxy-math-visual-learning.git
cd galaxy-math-visual-learning
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

> The backend will start on **http://localhost:5000**
> You should see: `🚀 Server is running on port 5000` and `✅ Connected to MongoDB`

### 3. Set Up the Frontend

Open a **new terminal** and from the project root:

```bash
npm install
npm start
```

> The frontend will start on **http://localhost:3000**

### ⚠️ Important Notes
- Always start the **backend first**, then the frontend.
- Do **not** run multiple backend instances simultaneously — this causes `EADDRINUSE` port conflicts.

---

## 📁 Project Structure

```
Lab2/
├── backend/                  # Express + MongoDB backend
│   ├── models/               # MongoDB Schemas (User, Score)
│   ├── routes/               # Express Routes (Auth, Scores, Profile)
│   └── server.js             # API entry point
│
├── public/
│   └── emergency_assets/     # Locally stored, offline-ready emergency illustrations
│
├── src/                      # React frontend
│   ├── components/
│   │   ├── emergency/        # Lab 1: Emergency Awareness Module
│   │   │   ├── EmergencyApp.jsx
│   │   │   ├── EmergencySteps.jsx
│   │   │   ├── SafetyProfile.jsx
│   │   │   └── ...
│   │   ├──   Math & Galaxy Modules (Lab 2)
│   │   │   ├── GalaxyMap.js
│   │   │   ├── MathGame.js, DivisionGame.js, FractionGame.js...
│   │   │   ├── AvatarStation.js
│   │   │   ├── TrophyRoom.js
│   │   │   ├── PilotSettings.js
│   │   │   └── ...
│   │   └── shared/           # Navbars, AuthPages, Utilities
│   ├── data/
│   │   └── emergencyData.js  # Configuration for emergency scenarios
│   ├── App.js                # Root component + routing
│   └── index.css             # Global Tailwind configurations
│
└── package.json              # Frontend dependencies
```

---

## 🔌 API Endpoints

### Auth & User Profile
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |
| GET | `/api/user/profile` | Fetch user Avatar, Coins, Badges, Settings |
| POST | `/api/user/award-badge` | Add a badge to the user profile |

### Scores
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/scores/save` | Save a game score |
| GET | `/api/scores/leaderboard?game=counting` | Get top scores for a game |

---

## 🚀 Deployment

### Backend Deployment (e.g., Render, Railway)
1. Deploy the `backend/` directory.
2. Set `MONGO_URI`, `JWT_SECRET`, and `PORT` in your hosting provider's environment variables.

### Frontend Deployment (Vercel, Netlify)
1. Deploy the root directory.
2. Ensure Vercel environment variable `REACT_APP_API_URL` points to your deployed backend URL.

---

## 👤 Student Details

| Field | Details |
|---|---|
| **Name** | R. Vishnu Sathwick |
| **Roll No** | CB.SC.U4CSE23644 |
| **Course** | Full Stack Frameworks (23CSE461) |
| **Faculty** | Dr. T. Senthil Kumar |
| **Institution** | Amrita School of Computing |

---

## 🔗 Links

- 📁 [GitHub Repository](https://github.com/rvsr26/galaxy-math-visual-learning)
- 🚀 [Live Demo](https://galaxy-math-visual-learning.vercel.app/)
