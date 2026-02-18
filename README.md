# 🚀 Galaxy Math — Visual Learning Portal

A gamified math learning platform designed to help children with autism master basic mathematical concepts through visual aids, interactive exercises, and space-themed gameplay.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [How to Run](#how-to-run)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Student Details](#student-details)

---

## 🎮 Features

### Games
| Game | Description | Difficulty Scaling |
|---|---|---|
| 🪐 **Counting** | Tap planets & stars to count, then pick the right number | Easy: 1–5, Medium: 1–10, Hard: 1–20 |
| ➕ **Math Fun** | Visual addition, subtraction & multiplication with space objects | Easy: +, Medium: +/−, Hard: +/−/× |
| 🌌 **Patterns** | Complete AB / ABC / AABB shape sequences | Easy: AB, Medium: ABC, Hard: AABB |
| 🚀 **Memory Match** | Flip cards to find matching space pairs | Easy: 4 pairs, Medium: 6, Hard: 8 |
| 📚 **Learn Numbers** | Explore numbers 1–10 with space facts and interactive items | — |

### Platform Features
- 🔐 **JWT Authentication** — Register & login with secure tokens
- 🏆 **Leaderboard** — Top scores per game fetched from MongoDB
- 🔥 **Daily Streak Tracker** — Tracks consecutive days of play
- 🌙☀️ **Dark / Light Mode** — Global theme toggle in the navbar
- 🔊 **Audio Feedback** — Text-to-speech and sound effects on every action
- 🎉 **Celebration Overlays** — Milestone animations at score checkpoints
- 📱 **Responsive Design** — Works on desktop and mobile

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI framework |
| React Hooks (`useState`, `useEffect`, `useCallback`) | State management |
| CSS (Vanilla) | Styling with glassmorphism & CSS variables |
| Web Audio API | Sound effects and tones |
| Web Speech API | Text-to-speech feedback |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database for users and scores |
| JWT (jsonwebtoken) | Authentication tokens |
| bcryptjs | Password hashing |
| dotenv | Environment variable management |
| nodemon | Auto-restart during development |

---

## ✅ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v16 or higher
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) — local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud URI

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

### ⚠️ Important

- Always start the **backend first**, then the frontend.
- Do **not** run multiple backend instances simultaneously — this causes `EADDRINUSE` port conflicts.
- If you see a port conflict error, kill all node processes and restart:
  ```powershell
  # Windows PowerShell
  Get-Process -Name node | Stop-Process -Force
  ```
  ```bash
  # Mac/Linux
  pkill -f node
  ```

---

## 📁 Project Structure

```
Lab2/
├── backend/                  # Express + MongoDB backend
│   ├── models/
│   │   ├── User.js           # User schema (username, password, streak)
│   │   └── Score.js          # Score schema (user, game, score, difficulty)
│   ├── routes/
│   │   ├── auth.js           # POST /api/auth/register, /api/auth/login
│   │   └── scores.js         # POST /api/scores/save, GET /api/scores/leaderboard
│   ├── server.js             # Express app entry point
│   ├── .env                  # Environment variables (not committed)
│   └── package.json
│
├── src/                      # React frontend
│   ├── components/
│   │   ├── SplashScreen.js   # Landing/intro page
│   │   ├── AuthPage.js       # Login & Register
│   │   ├── Navbar.js         # Top navigation + theme toggle
│   │   ├── GameMenu.js       # Game selection grid
│   │   ├── CountingGame.js   # Counting game
│   │   ├── MathGame.js       # Math operations game
│   │   ├── PatternGame.js    # Pattern recognition game
│   │   ├── MemoryGame.js     # Memory card match game
│   │   ├── LearningMode.js   # Number exploration mode
│   │   ├── Leaderboard.js    # Score leaderboard
│   │   ├── AboutPage.js      # About / student info page
│   │   ├── CelebrationOverlay.js  # Milestone celebration animation
│   │   └── useSound.js       # Custom hook for audio feedback
│   ├── App.js                # Root component + routing
│   ├── App.css               # Global design system + dark/light variables
│   └── index.js
│
├── image.png                 # Student photo (used in About page)
├── package.json              # Frontend dependencies
└── README.md
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |

### Scores
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/scores/save` | Save a game score (requires JWT) |
| GET | `/api/scores/leaderboard?game=counting` | Get top scores for a game |

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
