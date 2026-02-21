import React, { useState, useEffect } from 'react';

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
        <div className={`relative z-50 transition-all duration-300 ${isOpen ? 'w-64' : 'w-auto'}`}>
            <button
                className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl border border-white/10 transition-all flex items-center gap-2"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>📜</span>
                {isOpen ? <span className="text-sm">Tasks</span> : <span className="text-sm opacity-60">Tasks</span>}
            </button>

            {isOpen && (
                <div className="absolute top-12 left-0 w-72 bg-slate-900 border border-white/10 rounded-2xl p-4 shadow-2xl">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Daily Tasks</h3>
                    </div>

                    <div className="space-y-3">
                        {missions.map(m => (
                            <div key={m.id} className="bg-white/5 rounded-xl p-3 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-colors">
                                <div className="flex-1 mr-3">
                                    <p className="text-sm font-medium text-slate-200">{m.text}</p>
                                    <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                                        <div
                                            className="bg-green-500 h-full rounded-full transition-all duration-500"
                                            style={{ width: `${Math.min(100, (m.progress / m.target) * 100)}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <button
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all
                                        ${m.claimed
                                            ? 'bg-green-500/20 text-green-400 cursor-default'
                                            : m.progress >= m.target
                                                ? 'bg-yellow-500 hover:bg-yellow-400 text-black shadow-[0_0_10px_rgba(234,179,8,0.5)] animate-pulse'
                                                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                        }
                                    `}
                                    disabled={m.progress < m.target || m.claimed}
                                    onClick={() => handleClaim(m.id)}
                                >
                                    {m.claimed ? 'Done ✅' : `+${m.reward} 💰`}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DailyMissions;
