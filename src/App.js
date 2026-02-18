
import React, { useState, useEffect } from "react";
import "./App.css";
import GameMenu from "./components/GameMenu";
import CountingGame from "./components/CountingGame";
import MathGame from "./components/MathGame";
import PatternGame from "./components/PatternGame";
import MemoryGame from "./components/MemoryGame";
import LearningMode from "./components/LearningMode";
import SplashScreen from "./components/SplashScreen";
import AuthPage from "./components/AuthPage";
import Leaderboard from "./components/Leaderboard";
import AboutPage from "./components/AboutPage";
import Navbar from "./components/Navbar";

const API = 'http://localhost:5000/api/scores';

export default function App() {
  const [currentPage, setCurrentPage] = useState(null); // null = home/game menu
  const [currentGame, setCurrentGame] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const streak = parseInt(localStorage.getItem('streak') || '0');
    if (token && username) {
      setUser({ username, streak });
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('streak');
    setUser(null);
    setCurrentPage(null);
    setCurrentGame(null);
  };

  const handleScoreSave = async (game, score) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch(`${API}/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ game, score, difficulty })
      });
      const data = await res.json();
      if (data.streak !== undefined) {
        setUser(prev => ({ ...prev, streak: data.streak }));
        localStorage.setItem('streak', data.streak);
      }
    } catch (err) {
      console.error('Failed to save score:', err);
    }
  };

  // Navigate via navbar — 'leaderboard' | 'about' | null (home)
  const handleNavNavigate = (pageId) => {
    setCurrentPage(pageId);
    setCurrentGame(null); // exit any active game
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (!user) {
    return <AuthPage onLogin={handleLogin} />;
  }

  const renderContent = () => {
    // Navbar-level pages take priority
    if (currentPage === 'leaderboard') {
      return <Leaderboard onBack={() => setCurrentPage(null)} />;
    }
    if (currentPage === 'about') {
      return <AboutPage onBack={() => setCurrentPage(null)} />;
    }

    // Game routing
    switch (currentGame) {
      case 'counting':
        return <CountingGame difficulty={difficulty} onBack={() => setCurrentGame(null)} onScoreSave={(s) => handleScoreSave('counting', s)} />;
      case 'math':
        return <MathGame difficulty={difficulty} onBack={() => setCurrentGame(null)} onScoreSave={(s) => handleScoreSave('math', s)} />;
      case 'pattern':
        return <PatternGame difficulty={difficulty} onBack={() => setCurrentGame(null)} onScoreSave={(s) => handleScoreSave('pattern', s)} />;
      case 'memory':
        return <MemoryGame difficulty={difficulty} onBack={() => setCurrentGame(null)} onScoreSave={(s) => handleScoreSave('memory', s)} />;
      case 'learning':
        return <LearningMode onBack={() => setCurrentGame(null)} />;
      default:
        return <GameMenu onSelectGame={setCurrentGame} setDifficulty={setDifficulty} streak={user.streak} />;
    }
  };

  return (
    <div className={`App ${dark ? 'app-dark' : 'app-light'}`}>
      <Navbar
        username={user.username}
        streak={user.streak}
        onNavigate={handleNavNavigate}
        currentPage={currentPage}
        onLogout={handleLogout}
        dark={dark}
        onToggleTheme={() => setDark(d => !d)}
      />
      {renderContent()}
    </div>
  );
}
