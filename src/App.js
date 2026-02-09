
import React, { useState } from "react";
import "./App.css";
import GameMenu from "./components/GameMenu";
import CountingGame from "./components/CountingGame";
import MathGame from "./components/MathGame";
import PatternGame from "./components/PatternGame";
import MemoryGame from "./components/MemoryGame";

import SequenceGame from "./components/SequenceGame";
import LearningMode from "./components/LearningMode";
import SplashScreen from "./components/SplashScreen";
import Footer from "./components/Footer";

export default function App() {
  const [currentGame, setCurrentGame] = useState(null);
  const [difficulty, setDifficulty] = useState('easy');
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  const renderGame = () => {
    switch (currentGame) {
      case 'counting':
        return <CountingGame difficulty={difficulty} onBack={() => setCurrentGame(null)} />;
      case 'math':
        return <MathGame difficulty={difficulty} onBack={() => setCurrentGame(null)} />;
      case 'pattern':
        return <PatternGame difficulty={difficulty} onBack={() => setCurrentGame(null)} />;
      case 'memory':
        return <MemoryGame difficulty={difficulty} onBack={() => setCurrentGame(null)} />;
      case 'sequence':
        return <SequenceGame difficulty={difficulty} onBack={() => setCurrentGame(null)} />;
      case 'learning':
        return <LearningMode onBack={() => setCurrentGame(null)} />;
      default:
        return <GameMenu onSelectGame={setCurrentGame} setDifficulty={setDifficulty} />;
    }
  };

  return (
    <div className="App">
      <Footer />
      {renderGame()}
    </div>
  );
}
