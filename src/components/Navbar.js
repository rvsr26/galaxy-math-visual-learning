import React, { useState } from 'react';

const Navbar = ({ username, streak, coins, onNavigate, currentPage, onLogout }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [
        { id: null, label: '🏠', tooltip: 'Home' },
        { id: 'leaderboard', label: '🏆', tooltip: 'Leaderboard' },
        { id: 'trophies', label: '🎖️', tooltip: 'Trophies' },
        { id: 'about', label: 'ℹ️', tooltip: 'About' },
        { id: 'avatar', label: '🚀', tooltip: 'Avatar' },
        { id: 'settings', label: '⚙️', tooltip: 'Settings' },
    ];

    const handleNav = (id) => {
        onNavigate(id);
        setMenuOpen(false);
    };

    return (
        <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b shadow-sm" style={{ backgroundColor: 'var(--nav-bg)', borderColor: 'var(--border-color)' }}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between h-14">

                    {/* Brand / Logo */}
                    <div
                        className="flex-shrink-0 flex items-center gap-3 cursor-pointer group"
                        onClick={() => handleNav(null)}
                    >
                        <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">🌟</span>
                        <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hidden sm:block">
                            Galaxy Math
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navLinks.map(link => (
                            <button
                                key={String(link.id)}
                                onClick={() => handleNav(link.id)}
                                className={`px-4 py-2 flex items-center gap-2 rounded-xl transition-all
                                    ${currentPage === link.id
                                        ? 'bg-white/10 text-white shadow-inner brightness-110'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <span className="text-xl">{link.label}</span>
                                <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">{link.tooltip}</span>
                            </button>
                        ))}
                    </div>

                    {/* User Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        <div className="flex items-center gap-4 text-xs font-semibold tracking-wider">
                            <span title="Star Coins" className="text-yellow-400/90 flex items-center gap-1">⭐ {coins}</span>
                            <span title="Day Streak" className="text-orange-500/90 flex items-center gap-1">🔥 {streak}</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={onLogout}
                                className="text-xs font-bold text-slate-500 hover:text-red-400 transition-colors uppercase tracking-widest"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        >
                            {menuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-white/10">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {/* Mobile Stats */}
                        <div className="flex items-center justify-around py-4 mb-2 border-b border-white/10">
                            <span className="font-bold text-yellow-400 text-lg">⭐ {coins}</span>
                            <span className="font-bold text-orange-500 text-lg">🔥 {streak}</span>
                            <span className="font-medium text-slate-300">👤 {username}</span>
                        </div>

                        {navLinks.map(link => (
                            <button
                                key={String(link.id)}
                                onClick={() => handleNav(link.id)}
                                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all
                                    ${currentPage === link.id
                                        ? 'bg-cyan-500/10 text-cyan-400'
                                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {link.label}
                            </button>
                        ))}

                        <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-end px-2">
                            <button
                                onClick={onLogout}
                                className="text-red-400 font-medium hover:text-red-300"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
