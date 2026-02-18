import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ username, streak, coins, onNavigate, currentPage, onLogout, dark, onToggleTheme }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { id: null, label: '🏠 Home' },
        { id: 'leaderboard', label: '🏆 Leaderboard' },
        { id: 'avatar', label: '👨‍🚀 Avatar' },
        { id: 'about', label: 'ℹ️ About' },
    ];

    const handleNav = (id) => {
        onNavigate(id);
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand" onClick={() => handleNav(null)}>
                <span className="navbar-logo">🌟</span>
                <span className="navbar-title">Galaxy Math</span>
            </div>

            <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
                {navLinks.map(link => (
                    <button
                        key={String(link.id)}
                        className={`nav-link ${currentPage === link.id ? 'active' : ''}`}
                        onClick={() => handleNav(link.id)}
                    >
                        {link.label}
                    </button>
                ))}
            </div>

            <div className="navbar-user">
                <div className="streak-pill" title="Star Coins">
                    ⭐ {coins}
                </div>
                <div className="streak-pill" title="Day Streak">
                    🔥 {streak}
                </div>
                <span className="nav-username">👤 {username}</span>
                <button className="nav-theme-btn" onClick={onToggleTheme} title="Toggle Theme">
                    {dark ? '☀️' : '🌙'}
                </button>
                <button className="nav-logout" onClick={onLogout}>Logout</button>
            </div>

            <button className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? '✕' : '☰'}
            </button>
        </nav>
    );
};

export default Navbar;
