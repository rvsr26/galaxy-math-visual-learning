import React, { useState, useEffect } from 'react';
import './DailyMissions.css';

const DailyMissions = ({ user, coins, onClaimReward }) => {
    const [missions, setMissions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const key = 'daily_missions_' + today;
        const saved = localStorage.getItem(key);

        if (saved) {
            setMissions(JSON.parse(saved));
        } else {
            const newMissions = [
                { id: 1, text: 'Play a Game', type: 'play', target: 1, progress: 0, reward: 20, claimed: false },
                { id: 2, text: `Reach ${user.streak + 1} Day Streak`, type: 'streak', target: user.streak + 1, progress: user.streak, reward: 50, claimed: false },
                { id: 3, text: 'Earn 50 Coins', type: 'coins', target: 50, progress: 0, reward: 30, claimed: false }
            ];
            setMissions(newMissions);
            localStorage.setItem(key, JSON.stringify(newMissions));
        }
    }, [user.streak]);

    const handleClaim = (id) => {
        const updated = missions.map(m => {
            if (m.id === id) {
                onClaimReward(m.reward);
                return { ...m, claimed: true };
            }
            return m;
        });
        setMissions(updated);
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('daily_missions_' + today, JSON.stringify(updated));
    };

    return (
        <div className={`missions-widget ${isOpen ? 'open' : ''}`}>
            <button className="missions-toggle" onClick={() => setIsOpen(!isOpen)}>
                📜 Missions
            </button>

            {isOpen && (
                <div className="missions-list">
                    <h3>Daily Tasks</h3>
                    {missions.map(m => (
                        <div key={m.id} className="mission-item">
                            <span>{m.text}</span>
                            <button
                                disabled={m.progress < m.target || m.claimed}
                                onClick={() => handleClaim(m.id)}
                            >
                                {m.claimed ? '✅' : `Claim ${m.reward}`}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DailyMissions;
