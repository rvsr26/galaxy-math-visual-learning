import React, { useState, useEffect } from 'react';
import './Leaderboard.css';

const GAMES = ['counting', 'math', 'pattern', 'memory'];
const API = 'http://localhost:5000/api/scores';

const Leaderboard = ({ onBack }) => {
    const [selectedGame, setSelectedGame] = useState('counting');
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchLeaderboard(selectedGame);
    }, [selectedGame]);

    const fetchLeaderboard = async (game) => {
        setLoading(true);
        try {
            const res = await fetch(`${API}/leaderboard?game=${game}`);
            const data = await res.json();
            setEntries(data);
        } catch {
            setEntries([]);
        } finally {
            setLoading(false);
        }
    };

    const medals = ['🥇', '🥈', '🥉'];
    const gameLabels = {
        counting: '🪐 Counting',
        math: '➕ Math',
        pattern: '🎨 Patterns',
        memory: '🧠 Memory',
    };

    return (
        <div className="leaderboard-container">
            <button className="leaderboard-back-btn" onClick={onBack}>⬅ Back</button>
            <h2>🏆 Leaderboard</h2>

            <div className="game-tabs">
                {GAMES.map(g => (
                    <button
                        key={g}
                        className={`tab-btn ${selectedGame === g ? 'active' : ''}`}
                        onClick={() => setSelectedGame(g)}
                    >
                        {gameLabels[g]}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="empty-state">Loading... ⏳</div>
            ) : entries.length === 0 ? (
                <div className="empty-state">No scores yet! Be the first to play! 🎮</div>
            ) : (
                <div className="leaderboard-list">
                    {entries.map((entry, i) => (
                        <div key={i} className={`leaderboard-entry rank-${i + 1}`}>
                            <span className="rank-badge">{medals[i] || `#${i + 1}`}</span>
                            <span className="entry-username">{entry.username}</span>
                            <span className="entry-score">{entry.score} pts</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
