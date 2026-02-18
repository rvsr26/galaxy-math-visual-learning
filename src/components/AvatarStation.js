import React, { useState } from 'react';
import './AvatarStation.css';
import { useSound } from './useSound';

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
        if (avatar[category] === itemId) return; // Already equipped

        // If it's a paid item check if we own it (simplified: for now we just check if we have enough coins to "buy/equip" it again, 
        // in a real app we'd have an inventory array. For this MVP, we'll assume unlocking = dragging coin balance down or we just check cost)

        if (cost > coins) {
            setMessage(`Not enough Star Coins! You need ${cost} ⭐`);
            setTimeout(() => setMessage(''), 2000);
            return;
        }

        try {
            // Optimistic update
            const newAvatar = { ...avatar, [category]: itemId };

            // Call API to update avatar
            const res = await fetch('http://localhost:5000/api/user/avatar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(newAvatar)
            });

            if (res.ok) {
                // If it cost money, deduct it (simple mock logic for now, or assume backend handles if we added logic)
                // Since our backend endpoint for avatar doesn't deduct coins automatically, we should technically call 'add-coins' with negative amount
                // But for simplicity/MVP let's just allow equipping if balance > cost, without deducting, 
                // OR better: deduct coins if cost > 0.
                if (cost > 0) {
                    await fetch('http://localhost:5000/api/user/add-coins', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({ amount: -cost })
                    });
                }

                onUpdateAvatar(newAvatar, cost); // Update parent state, maybe pass cost to update local coin balance
                setMessage('Equipped! 🚀');
                playBuy();
                setTimeout(() => setMessage(''), 2000);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="avatar-station">
            <div className="station-header">
                <button className="back-btn" onClick={onBack}>⬅ Back to Map</button>
                <h1>Astronaut Station 👨‍🚀</h1>
                <div className="coin-display">⭐ {coins}</div>
            </div>

            <div className="avatar-preview-container">
                <div className="avatar-figure" style={{ backgroundColor: ITEMS.suits.find(s => s.id === avatar.suit)?.color || '#ddd' }}>
                    <div className="avatar-helmet-icon">{ITEMS.helmets.find(h => h.id === avatar.helmet)?.icon}</div>
                    <div className="avatar-pet-icon">{ITEMS.pets.find(p => p.id === avatar.pet)?.icon}</div>
                </div>
            </div>

            {message && <div className="message-toast">{message}</div>}

            <div className="station-tabs">
                <button className={activeTab === 'helmets' ? 'active' : ''} onClick={() => setActiveTab('helmets')}>Helmets</button>
                <button className={activeTab === 'suits' ? 'active' : ''} onClick={() => setActiveTab('suits')}>Suits</button>
                <button className={activeTab === 'pets' ? 'active' : ''} onClick={() => setActiveTab('pets')}>Companions</button>
            </div>

            <div className="items-grid">
                {ITEMS[activeTab].map(item => (
                    <div key={item.id} className={`shop-item ${avatar[activeTab.slice(0, -1)] === item.id ? 'equipped' : ''}`}
                        onClick={() => handleEquip(activeTab.slice(0, -1), item.id, item.cost)}>
                        <div className="item-icon">{item.icon || (item.color && <div style={{ width: 30, height: 30, background: item.color, borderRadius: '50%' }}></div>)}</div>
                        <div className="item-name">{item.name}</div>
                        <div className="item-cost">{item.cost === 0 ? 'Free' : `${item.cost} ⭐`}</div>
                        {avatar[activeTab.slice(0, -1)] === item.id && <div className="equipped-badge">✅</div>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AvatarStation;
