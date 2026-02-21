import React, { useState } from 'react';
import { useSound } from './useSound';
import API_BASE_URL from '../config';

const ITEMS = {
    helmets: [
        { id: 'default', name: 'Standard Issue', cost: 0, icon: '👨‍🚀' },
        { id: 'gold', name: 'Golden Explorer', cost: 50, icon: '🌟' },
        { id: 'alien', name: 'Alien Tech', cost: 100, icon: '👽' },
        { id: 'crown', name: 'Galactic King', cost: 200, icon: '👑' },
    ],
    suits: [
        { id: 'default', name: 'Standard Suit', cost: 0, color: '#dddddd' },
        { id: 'red', name: 'Mars Rover', cost: 50, color: '#ff4444' },
        { id: 'blue', name: 'Neptune Diver', cost: 50, color: '#4444ff' },
        { id: 'black', name: 'Stealth Ops', cost: 100, color: '#222222' },
    ],
    pets: [
        { id: 'none', name: 'No Companion', cost: 0, icon: '' },
        { id: 'dog', name: 'Space Dog', cost: 150, icon: '🐕' },
        { id: 'cat', name: 'Moon Cat', cost: 150, icon: '🐱' },
        { id: 'robot', name: 'Beep Boop', cost: 200, icon: '🤖' },
    ]
};

const AvatarStation = ({ user, coins, avatar, onUpdateAvatar, onBack }) => {
    const [activeTab, setActiveTab] = useState('helmets');
    const [message, setMessage] = useState('');
    const { playBuy } = useSound();

    const handleEquip = async (category, itemId, cost) => {
        if (avatar[category] === itemId) return;

        if (cost > coins) {
            setMessage(`Not enough Star Coins! You need ${cost} ⭐`);
            setTimeout(() => setMessage(''), 2000);
            return;
        }

        try {
            const newAvatar = { ...avatar, [category]: itemId };

            const res = await fetch(`${API_BASE_URL}/api/user/avatar`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newAvatar)
            });

            if (res.ok) {
                if (cost > 0) {
                    await fetch(`${API_BASE_URL}/api/user/add-coins`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({ amount: -cost })
                    });
                }

                onUpdateAvatar(newAvatar, cost);
                setMessage('Equipped! 🚀');
                playBuy();
                setTimeout(() => setMessage(''), 2000);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen pt-24 px-4 pb-12 flex flex-col items-center" style={{ backgroundColor: 'var(--bg-main)' }}>

            {/* Header */}
            <div className="w-full max-w-4xl flex items-center justify-between mb-8">
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700 text-white rounded-xl font-bold border border-white/10 transition-colors"
                >
                    ⬅ Back
                </button>
                <div className="px-6 py-2 bg-yellow-500/20 border border-yellow-500/40 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                    <span className="text-xl font-bold text-yellow-400">⭐ {coins}</span>
                </div>
            </div>

            <h2 className="text-3xl font-black text-white opacity-90 tracking-widest text-glow mb-10 text-center uppercase">
                ASTRONAUT STATION
            </h2>

            <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">

                {/* Character Preview */}
                <div className="glass-panel p-8 flex flex-col items-center justify-center min-h-[400px] relative">
                    <div className="absolute inset-0 bg-blue-500/5 blur-3xl"></div>

                    <div className="relative w-48 h-64 flex items-center justify-center transition-all duration-500">
                        {/* Body / Suit */}
                        <div
                            className="w-32 h-44 rounded-3xl relative shadow-2xl transition-colors duration-300 transform hover:scale-105"
                            style={{ backgroundColor: ITEMS.suits.find(s => s.id === avatar.suit)?.color || '#ddd' }}
                        >
                            {/* Helmet */}
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-7xl drop-shadow-lg filter">
                                {ITEMS.helmets.find(h => h.id === avatar.helmet)?.icon}
                            </div>
                            {/* Pet */}
                            <div className="absolute -bottom-4 -right-8 text-5xl animate-bounce-slow drop-shadow-md">
                                {ITEMS.pets.find(p => p.id === avatar.pet)?.icon}
                            </div>

                            {/* Suit Details (Mock) */}
                            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-black/20 rounded-full"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-16 h-16 bg-white/20 rounded-full border-4 border-white/30"></div>
                        </div>
                    </div>

                    <div className="mt-8 text-xl font-bold text-white tracking-widest uppercase">
                        {user.username}
                    </div>
                </div>

                {/* Shop / Inventory */}
                <div className="flex flex-col gap-6">

                    {/* Tabs */}
                    <div className="flex p-1.5 bg-slate-900/50 rounded-2xl border border-white/5 no-scrollbar overflow-x-auto">
                        {['helmets', 'suits', 'pets'].map(tab => (
                            <button
                                key={tab}
                                className={`flex-1 py-2.5 rounded-xl font-bold text-xs md:text-sm uppercase tracking-wider transition-all ${activeTab === tab
                                    ? 'bg-white/10 text-white shadow-xl'
                                    : 'text-slate-500 hover:text-slate-300'
                                    }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Items Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {ITEMS[activeTab].map(item => {
                            const isEquipped = avatar[activeTab.slice(0, -1)] === item.id;
                            const isAffordable = coins >= item.cost;

                            return (
                                <button
                                    key={item.id}
                                    className={`
                                        glass-panel p-4 flex flex-col items-center gap-2 transition-all duration-200 border-2
                                        ${isEquipped
                                            ? 'border-green-500 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                                            : 'border-transparent hover:border-blue-500 hover:bg-slate-800'
                                        }
                                    `}
                                    onClick={() => handleEquip(activeTab.slice(0, -1), item.id, item.cost)}
                                    disabled={!isAffordable && !isEquipped} // Optional: allow clicking to see price even if cant buy
                                >
                                    <div className="text-4xl mb-2">
                                        {item.icon || (
                                            <div className="w-10 h-10 rounded-full border-2 border-white/20"
                                                style={{ background: item.color }}></div>
                                        )}
                                    </div>
                                    <div className="font-bold text-slate-200 text-sm">{item.name}</div>

                                    {isEquipped ? (
                                        <div className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full mt-2">
                                            Equipped
                                        </div>
                                    ) : (
                                        <div className={`text-sm font-bold mt-2 ${isAffordable ? 'text-yellow-400' : 'text-red-400 opacity-50'}`}>
                                            {item.cost === 0 ? 'FREE' : `${item.cost} ⭐`}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Notification Toast */}
            {message && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-slate-900 border border-cyan-500 text-cyan-400 rounded-xl shadow-2xl animate-fade-in-up font-bold z-50">
                    {message}
                </div>
            )}
        </div>
    );
};

export default AvatarStation;
