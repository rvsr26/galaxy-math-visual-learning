
import React from 'react';
import './GameMenu.css';

const GameMenu = ({ onSelectGame, setDifficulty }) => {
    return (
        <div className="game-menu">
            <h1>Visual Math Learning 🌟</h1>
            <p>Select a fun game to play!</p>

            <div className="difficulty-selector">
                <span>Difficulty:</span>
                <button className="diff-btn easy" onClick={() => setDifficulty('easy')}>Easy 😊</button>
                <button className="diff-btn medium" onClick={() => setDifficulty('medium')}>Medium 🤔</button>
                <button className="diff-btn hard" onClick={() => setDifficulty('hard')}>Hard 🤓</button>
            </div>

            <div className="menu-grid">
                <div className="menu-card count" onClick={() => onSelectGame('counting')}>
                    <span className="icon">🍎</span>
                    <h2>Counting</h2>
                    <p>Count the fun objects!</p>
                </div>

                <div className="menu-card math" onClick={() => onSelectGame('math')}>
                    <span className="icon">➕</span>
                    <h2>Math Fun</h2>
                    <p>Add and Subtract!</p>
                </div>

                <div className="menu-card pattern" onClick={() => onSelectGame('pattern')}>
                    <span className="icon">🎨</span>
                    <h2>Patterns</h2>
                    <p>What comes next?</p>
                </div>

                <div className="menu-card memory" onClick={() => onSelectGame('memory')}>
                    <span className="icon">🧠</span>
                    <h2>Memory</h2>
                    <p>Find the pairs!</p>
                </div>

                <div className="menu-card sequence" onClick={() => onSelectGame('sequence')}>
                    <span className="icon">🔔</span>
                    <h2>Simon Says</h2>
                    <p>Follow the pattern!</p>
                </div>

                <div className="menu-card learn" onClick={() => onSelectGame('learning')}>
                    <span className="icon">📚</span>
                    <h2>Learn</h2>
                    <p>Explore numbers!</p>
                </div>
            </div>
        </div>
    );
};

export default GameMenu;
