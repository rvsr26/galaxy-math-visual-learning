import React, { useState, useEffect, useCallback } from 'react';
import API_BASE_URL from '../config';

const GAMES = ['counting', 'math', 'pattern', 'memory', 'division', 'fraction'];
const API = `${API_BASE_URL}/api/scores`;

const Leaderboard = ({ onBack }) => {
    const [selectedGame, setSelectedGame] = useState('counting');
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLeaderboard = useCallback(async (game) => {
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
    }, [API]);

    useEffect(() => {
        fetchLeaderboard(selectedGame);
    }, [selectedGame, fetchLeaderboard]);

    const medals = ['🥇', '🥈', '🥉'];
    const gameLabels = {
        counting: '🪐 Counting',
        math: '➕ Math',
        pattern: '🎨 Patterns',
        memory: '🧠 Memory',
        division: '🍪 Sharing',
        fraction: '🍕 Fractions'
    };

    return (
        <div className="min-h-screen pt-24 px-4 flex flex-col items-center" style={{ backgroundColor: 'var(--bg-main)' }}>

            {/* Header */}
            <div className="w-full max-w-4xl flex items-center mb-8 relative">
                <button
                    onClick={onBack}
                    className="absolute left-0 px-4 py-2 bg-slate-800/50 hover:bg-slate-700 text-white rounded-xl font-bold border border-white/10 transition-colors z-10"
                >
                    ⬅ Back
                </button>
                <h2 className="w-full text-center text-3xl md:text-4xl font-black text-white opacity-90 tracking-widest text-glow">
                    HALL OF FAME
                </h2>
            </div>

            {/* Game Selector Tabs */}
            <div className="w-full max-w-5xl overflow-x-auto pb-4 mb-8 no-scrollbar">
                <div className="flex justify-center gap-2 min-w-max px-2">
                    {GAMES.map(g => (
                        <button
                            key={g}
                            className={`
                                px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 border uppercase tracking-wider
                                ${selectedGame === g
                                    ? 'bg-white/10 border-white/20 text-white brightness-125 shadow-xl'
                                    : 'bg-transparent border-white/5 text-slate-500 hover:text-slate-300'
                                }
                            `}
                            onClick={() => setSelectedGame(g)}
                        >
                            {gameLabels[g] || g}
                        </button>
                    ))}
                </div>
            </div>

            {/* Leaderboard List */}
            <div className="w-full max-w-xl glass-panel p-6 md:p-10 min-h-[460px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-400 animate-pulse">
                        <span className="text-4xl mb-4">⏳</span>
                        <span className="font-bold">Loading Scores...</span>
                    </div>
                ) : entries.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                        <span className="text-6xl mb-4 opacity-50">🎮</span>
                        <span className="text-xl font-bold">No scores yet!</span>
                        <span className="text-sm mt-2">Be the first to play!</span>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {entries.map((entry, i) => (
                            <div
                                key={i}
                                className={`
                                    flex items-center justify-between p-4 rounded-2xl border transition-all hover:scale-[1.02]
                                    ${i === 0 ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/50 shadow-lg shadow-yellow-500/10' :
                                        i === 1 ? 'bg-gradient-to-r from-slate-400/20 to-slate-300/20 border-slate-400/50' :
                                            i === 2 ? 'bg-gradient-to-r from-orange-700/20 to-orange-600/20 border-orange-700/50' :
                                                'bg-slate-800/50 border-white/5 hover:bg-slate-800'
                                    }
                                `}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`
                                        w-10 h-10 flex items-center justify-center text-xl font-bold rounded-full
                                        ${i < 3 ? 'scale-125' : 'bg-slate-700/50 text-slate-400'}
                                    `}>
                                        {medals[i] || `#${i + 1}`}
                                    </div>
                                    <span className={`font-bold text-lg ${i < 3 ? 'text-white' : 'text-slate-300'}`}>
                                        {entry.username}
                                    </span>
                                </div>

                                <span className={`font-mono font-bold text-xl ${i === 0 ? 'text-yellow-400' : 'text-cyan-400'}`}>
                                    {entry.score} pts
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
