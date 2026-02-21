
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import EmergencyApp from "./components/emergency/EmergencyApp";
import "./App.css";
import GameMenu from "./components/GameMenu";
import GalaxyMap from "./components/GalaxyMap";
import AvatarStation from "./components/AvatarStation";
import CountingGame from "./components/CountingGame";
import MathGame from "./components/MathGame";
import PatternGame from "./components/PatternGame";
import MemoryGame from "./components/MemoryGame";
import DivisionGame from "./components/DivisionGame";
import FractionGame from "./components/FractionGame";
import LearningMode from "./components/LearningMode";
import SplashScreen from "./components/SplashScreen";
import AuthPage from "./components/AuthPage";
import Leaderboard from "./components/Leaderboard";
import AboutPage from "./components/AboutPage";
import Navbar from "./components/Navbar";
import HowItWorksLab2 from "./components/HowItWorksLab2";
import TrophyRoom from "./components/TrophyRoom";
import PilotSettings from "./components/PilotSettings";
import { useSound } from "./components/useSound";
import API_BASE_URL from "./config";
import ParticleField from "./components/ParticleField";

const API = `${API_BASE_URL}/api/scores`;



export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<GameContainer />} />
      <Route path="/emergency/*" element={<EmergencyApp />} />
    </Routes>
  );
}



const ALL_PLANETS = ['learning', 'counting', 'pattern', 'addition', 'subtraction', 'multiplication', 'division', 'fraction', 'memory'];

function GameContainer() {
  const [currentPage, setCurrentPage] = useState(null); // null = home/game menu
  const [currentGame, setCurrentGame] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const [avatar, setAvatar] = useState({ helmet: 'default', suit: 'default', pet: 'none' });
  const [badges, setBadges] = useState([]);
  const [settings, setSettings] = useState({ calmMode: false, celebrationStyle: 'quiet', animationSpeed: 0.7 });
  const [unlockedPlanets, setUnlockedPlanets] = useState(ALL_PLANETS);
  const { playUnlock } = useSound();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile(token);
    }
  }, []);

  const fetchProfile = async (token) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/user/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.username) {
        setUser({ username: data.username, streak: data.streak });
        setCoins(data.coins || 0);
        setAvatar(data.avatar || { helmet: 'default', suit: 'default', pet: 'none' });
        setBadges(data.badges || []);
        setSettings(data.settings || { calmMode: false, celebrationStyle: 'standard', animationSpeed: 1.0 });
        setUnlockedPlanets(ALL_PLANETS); // Always unlock all
      }
    } catch (err) {
      console.error("Failed to fetch profile", err);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    fetchProfile(localStorage.getItem('token'));
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

      // Add coins logic (simple: 10 coins per win)
      if (score >= 5) { // Threshold for winning
        await fetch(`${API_BASE_URL}/api/user/add-coins`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({ amount: 10 })
        });
        setCoins(prev => prev + 10);

        // Check for coin badge
        if (coins + 10 >= 1000 && !badges.includes('coin-lord')) {
          handleAwardBadge('coin-lord');
        }
      }

      // Check for streak badges
      if (data.streak >= 3 && !badges.includes('streak-3')) handleAwardBadge('streak-3');
      if (data.streak >= 7 && !badges.includes('streak-7')) handleAwardBadge('streak-7');

      // Check for game-specific badges
      if (score >= 10) {
        if (game === 'counting' && !badges.includes('counting-cmder')) handleAwardBadge('counting-cmder');
        if (game === 'pattern' && !badges.includes('pattern-pro')) handleAwardBadge('pattern-pro');
        if ((game === 'addition' || game === 'subtraction') && !badges.includes('math-explorer')) handleAwardBadge('math-explorer');
      }

      // Unlock next planet logic
      const planets = ['learning', 'counting', 'pattern', 'addition', 'subtraction', 'multiplication', 'division', 'fraction', 'memory'];
      const currentIdx = planets.indexOf(game);
      if (currentIdx !== -1 && currentIdx < planets.length - 1) {
        const nextPlanet = planets[currentIdx + 1];
        if (!unlockedPlanets.includes(nextPlanet) && score >= 5) {
          await fetch(`${API_BASE_URL}/api/user/unlock-planet`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ planet: nextPlanet })
          });
          setUnlockedPlanets(prev => [...prev, nextPlanet]);
          playUnlock();
        }
      }
    } catch (err) {
      console.error('Failed to save score:', err);
    }
  };

  const handleClaimReward = async (amount) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      await fetch(`${API_BASE_URL}/api/user/add-coins`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ amount })
      });
      setCoins(prev => prev + amount);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAwardBadge = async (badgeId) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/user/award-badge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ badgeId })
      });
      if (res.ok) {
        setBadges(prev => [...prev, badgeId]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Navigate via navbar — 'leaderboard' | 'about' | 'avatar' | null (home)
  const handleNavNavigate = (pageId) => {
    if (pageId === 'emergency') {
      navigate('/emergency');
      return;
    }
    setCurrentPage(pageId);
    setCurrentGame(null); // exit any active game
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  if (!user) {
    return (
      <div className="App">
        <AuthPage onLogin={handleLogin} />
      </div>
    );
  }

  const renderContent = () => {
    // Navbar-level pages take priority
    if (currentPage === 'leaderboard') {
      return <Leaderboard onBack={() => setCurrentPage(null)} />;
    }
    if (currentPage === 'about') {
      return <AboutPage onBack={() => setCurrentPage(null)} />;
    }
    if (currentPage === 'how-it-works') {
      return <HowItWorksLab2 onBack={() => setCurrentPage(null)} />;
    }
    if (currentPage === 'avatar') {
      return <AvatarStation
        user={user}
        coins={coins}
        avatar={avatar}
        onUpdateAvatar={(newAvatar, cost) => {
          setAvatar(newAvatar);
          if (cost) setCoins(c => c - cost);
        }}
        onBack={() => setCurrentPage(null)}
      />;
    }
    if (currentPage === 'trophies') {
      return <TrophyRoom
        badges={badges}
        onBack={() => setCurrentPage(null)}
      />;
    }
    if (currentPage === 'settings') {
      return <PilotSettings
        settings={settings}
        onUpdateSettings={setSettings}
        onBack={() => setCurrentPage(null)}
      />;
    }

    // Game routing
    switch (currentGame) {
      case 'counting':
        return <CountingGame difficulty={difficulty} settings={settings} onBack={() => setCurrentGame(null)} onScoreSave={(s) => handleScoreSave('counting', s)} />;
      case 'addition':
        return <MathGame difficulty={difficulty} gameType="addition" settings={settings} onBack={() => setCurrentGame(null)} onScoreSave={(s) => handleScoreSave('addition', s)} />;
      case 'subtraction':
        return <MathGame difficulty={difficulty} gameType="subtraction" settings={settings} onBack={() => setCurrentGame(null)} onScoreSave={(s) => handleScoreSave('subtraction', s)} />;
      case 'multiplication':
        return <MathGame difficulty={difficulty} gameType="multiplication" settings={settings} onBack={() => setCurrentGame(null)} onScoreSave={(s) => handleScoreSave('multiplication', s)} />;
      case 'pattern':
        return <PatternGame difficulty={difficulty} settings={settings} onBack={() => setCurrentGame(null)} onScoreSave={(s) => handleScoreSave('pattern', s)} />;
      case 'memory':
        return <MemoryGame difficulty={difficulty} settings={settings} onBack={() => setCurrentGame(null)} onScoreSave={(s) => handleScoreSave('memory', s)} />;
      case 'division':
        return <DivisionGame difficulty={difficulty} settings={settings} onBack={() => setCurrentGame(null)} onScoreSave={(s) => handleScoreSave('division', s)} />;
      case 'fraction':
        return <FractionGame difficulty={difficulty} settings={settings} onBack={() => setCurrentGame(null)} onScoreSave={(s) => handleScoreSave('fraction', s)} />;
      case 'learning':
        return <LearningMode onBack={() => setCurrentGame(null)} />;
      default:
        // Replaced GameMenu with GalaxyMap
        return <GalaxyMap
          unlockedPlanets={unlockedPlanets}
          onSelectLevel={setCurrentGame}
          user={user}
          coins={coins}
          onClaimReward={handleClaimReward}
        />;
    }
  };

  return (
    <div className="App">
      <ParticleField settings={settings} />
      <Navbar
        username={user.username}
        streak={user.streak}
        coins={coins}
        onNavigate={handleNavNavigate}
        currentPage={currentPage}
        onLogout={handleLogout}
      />
      {renderContent()}
    </div>
  );
}
