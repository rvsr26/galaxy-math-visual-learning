import React, { useState } from 'react';
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
            localStorage.setItem('streak', data.streak);
            onLogin({ username: data.username, streak: data.streak });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>

            <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl animate-fade-in-up">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="text-6xl mb-4 animate-bounce-slow">🚀</div>
                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        Galaxy Math
                    </h1>
                    <p className="text-slate-400 mt-2 font-medium">Visual Learning Adventure</p>
                </div>

                {/* Tabs */}
                <div className="flex bg-slate-800/50 p-1 rounded-2xl mb-8">
                    <button
                        className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 ${mode === 'login' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                            }`}
                        onClick={() => { setMode('login'); setError(''); }}
                    >
                        Login
                    </button>
                    <button
                        className={`flex-1 py-3 rounded-xl font-bold transition-all duration-300 ${mode === 'register' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                            }`}
                        onClick={() => { setMode('register'); setError(''); }}
                    >
                        Register
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-slate-300 text-sm font-bold mb-2 ml-1">👤 Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-medium"
                            placeholder="Enter your username"
                            required
                            minLength={3}
                        />
                    </div>
                    <div>
                        <label className="block text-slate-300 text-sm font-bold mb-2 ml-1">🔒 Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full bg-slate-950/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-medium"
                            placeholder="Enter your password"
                            required
                            minLength={4}
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-bold flex items-center gap-2 animate-shake">
                            ⚠️ {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`
                            w-full py-4 rounded-xl font-black text-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl
                            ${mode === 'login'
                                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-blue-500/20'
                                : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-purple-500/20'
                            }
                            ${loading ? 'opacity-70 cursor-wait' : ''}
                        `}
                        disabled={loading}
                    >
                        {loading ? 'Wait for it... ⏳' : mode === 'login' ? '🚀 Blast Off!' : '🎉 Join the Crew!'}
                    </button>

                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-transparent text-slate-500 font-bold bg-slate-900/80">OR</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl border border-white/5 transition-all flex items-center justify-center gap-2"
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
