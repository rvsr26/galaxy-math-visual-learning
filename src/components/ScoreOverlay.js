import React from 'react';
import './ScoreOverlay.css';

const ScoreOverlay = ({ score, onRestart, onHome }) => {
    return (
        <div className="score-overlay">
            <div className="score-card">
                <h2>Game Over! 🎮</h2>
                <div className="final-score">
                    <span>Score</span>
                    <div className="score-value">⭐ {score}</div>
                </div>
                <p className="encouragement">Great effort! Keep learning! 🚀</p>
                <div className="score-actions">
                    <button className="restart-btn" onClick={onRestart}>🔄 Play Again</button>
                    <button className="home-btn" onClick={onHome}>🏠 Home</button>
                </div>
            </div>
        </div>
    );
};

export default ScoreOverlay;
