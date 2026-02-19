import React, { useState } from 'react';
import './AuthPage.css';
import API_BASE_URL from '../config';

const API = `${API_BASE_URL}/api/auth`;

const AuthPage = ({ onLogin }) => {
    const [mode, setMode] = useState('login'); // 'login' | 'register'
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${API}/${mode}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Something went wrong');
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('streak', data.streak);
            onLogin({ username: data.username, streak: data.streak });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGuestLogin = async () => {
        setError('');
        setLoading(true);
        try {
            const res = await fetch(`${API}/guest`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Guest login failed');

            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('streak', data.streak); // Guests start at 0
            onLogin({ username: data.username, streak: data.streak });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="auth-overlay">
            <div className="auth-card">
                <div className="auth-logo">🌟</div>
                <h1 className="auth-title">Galaxy Math</h1>
                <p className="auth-subtitle">Visual Learning for Kids</p>

                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
                        onClick={() => { setMode('login'); setError(''); }}
                    >Login</button>
                    <button
                        className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
                        onClick={() => { setMode('register'); setError(''); }}
                    >Register</button>
                </div>


                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-field">
                        <label>👤 Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                            minLength={3}
                        />
                    </div>
                    <div className="auth-field">
                        <label>🔒 Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            minLength={4}
                        />
                    </div>
                    {error && <div className="auth-error">⚠️ {error}</div>}
                    <button type="submit" className="auth-submit" disabled={loading}>
                        {loading ? '⏳ Please wait...' : mode === 'login' ? '🚀 Let\'s Play!' : '🎉 Create Account'}
                    </button>

                    <div className="auth-divider">
                        <span>OR</span>
                    </div>

                    <button
                        type="button"
                        className="auth-guest-btn"
                        onClick={handleGuestLogin}
                        disabled={loading}
                    >
                        👽 Continue as Guest
                    </button>
                </form>

            </div>
        </div>
    );
};

export default AuthPage;
