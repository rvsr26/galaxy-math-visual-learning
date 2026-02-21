import React from 'react';

const BADGE_MAP = {
    'counting-cmder': { name: 'Counting Commander', icon: '🪐', description: 'Mastered the art of counting planets.' },
    'pattern-pro': { name: 'Pattern Pro', icon: '🌌', description: 'Solved complex galactic sequences.' },
    'math-explorer': { name: 'Number Explorer', icon: '🔭', description: 'Discovered the secrets of math fun.' },
    'streak-3': { name: '3-Day Comet', icon: '☄️', description: 'Played for 3 days in a row!' },
    'streak-7': { name: '7-Day Star', icon: '🌟', description: 'A full week of space learning!' },
    'coin-lord': { name: 'Star Multi-Millionaire', icon: '💎', description: 'Collected over 1000 Star Coins.' },
};

const TrophyRoom = ({ badges = [], onBack }) => {
    return (
        <div className="min-h-screen pt-24 px-4 pb-12 flex flex-col items-center" style={{ backgroundColor: 'var(--bg-main)' }}>
            <div className="w-full max-w-4xl flex items-center justify-between mb-8">
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700 text-white rounded-xl font-bold border border-white/10 transition-colors"
                >
                    ⬅ Back
                </button>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-8">
                Trophy Room 🏆
            </h2>

            <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(BADGE_MAP).map(badgeId => {
                    const isEarned = badges.includes(badgeId);
                    const badge = BADGE_MAP[badgeId];

                    return (
                        <div
                            key={badgeId}
                            className={`glass-panel p-6 flex flex-col items-center text-center gap-4 transition-all duration-300 border-2 ${isEarned
                                ? 'border-yellow-500 bg-yellow-500/10 shadow-[0_0_20px_rgba(234,179,8,0.2)]'
                                : 'border-white/5 opacity-40 grayscale'
                                }`}
                        >
                            <div className={`text-6xl mb-2 ${isEarned ? 'animate-bounce-slow' : ''}`}>
                                {badge.icon}
                            </div>
                            <div>
                                <h3 className={`font-bold text-lg ${isEarned ? 'text-yellow-400' : 'text-slate-500'}`}>
                                    {badge.name}
                                </h3>
                                <p className="text-sm text-slate-400 mt-1">
                                    {isEarned ? badge.description : 'Keep practicing to unlock!'}
                                </p>
                            </div>
                            {!isEarned && (
                                <div className="mt-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                                    Locked
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TrophyRoom;
