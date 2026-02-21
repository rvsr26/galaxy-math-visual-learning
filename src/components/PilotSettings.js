import React, { useState } from 'react';
import API_BASE_URL from '../config';

const PilotSettings = ({ settings, onUpdateSettings, onBack }) => {
    const [localSettings, setLocalSettings] = useState(settings || {
        calmMode: false,
        celebrationStyle: 'standard',
        animationSpeed: 1.0
    });
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    const handleToggleCalm = async () => {
        const newCalm = !localSettings.calmMode;
        updateSetting({ calmMode: newCalm });
    };

    const updateSetting = async (update) => {
        const updated = { ...localSettings, ...update };
        setLocalSettings(updated);
        setSaving(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/user/settings`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updated)
            });
            if (res.ok) {
                onUpdateSettings(updated);
                setMessage('Settings updated! 🛸');
                setTimeout(() => setMessage(''), 2000);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

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

            <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500 mb-8">
                Pilot Controls ⚙️
            </h2>

            <div className="w-full max-w-2xl flex flex-col gap-6">

                {/* Calm Mode */}
                <div className="glass-panel p-6 flex items-center justify-between border border-white/5">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1">Calm Mode 🧘‍♂️</h3>
                        <p className="text-sm text-slate-400">Reduce background animations and distracting particles.</p>
                    </div>
                    <button
                        onClick={handleToggleCalm}
                        className={`w-14 h-8 rounded-full p-1 transition-all duration-300 ${localSettings.calmMode ? 'bg-emerald-500' : 'bg-slate-700'}`}
                    >
                        <div className={`w-6 h-6 bg-white rounded-full transition-all duration-300 transform ${localSettings.calmMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </button>
                </div>

                {/* Celebration Style */}
                <div className="glass-panel p-6 border border-white/5">
                    <h3 className="text-xl font-bold text-white mb-4">Celebration Style 🎉</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                            { id: 'standard', label: 'Festive', icon: '🎆' },
                            { id: 'quiet', label: 'Gentle', icon: '✨' },
                            { id: 'none', label: 'Minimal', icon: '🔇' }
                        ].map(style => (
                            <button
                                key={style.id}
                                onClick={() => updateSetting({ celebrationStyle: style.id })}
                                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${localSettings.celebrationStyle === style.id
                                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                                    : 'border-white/5 text-slate-400 hover:border-white/10'
                                    }`}
                            >
                                <span className="text-2xl">{style.icon}</span>
                                <span className="font-bold text-sm">{style.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Animation Speed */}
                <div className="glass-panel p-6 border border-white/5">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">Warp Speed 🚀</h3>
                        <span className="text-cyan-400 font-bold">{localSettings.animationSpeed}x</span>
                    </div>
                    <input
                        type="range"
                        min="0.5"
                        max="2.0"
                        step="0.1"
                        value={localSettings.animationSpeed}
                        onChange={(e) => updateSetting({ animationSpeed: parseFloat(e.target.value) })}
                        className="w-full accent-cyan-500 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-2 uppercase tracking-tighter">
                        <span>Slow</span>
                        <span>Normal</span>
                        <span>Fast</span>
                    </div>
                </div>

            </div>

            {/* Notification Toast */}
            {message && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-slate-900 border border-emerald-500 text-emerald-400 rounded-xl shadow-2xl animate-fade-in-up font-bold z-50">
                    {message}
                </div>
            )}
        </div>
    );
};

export default PilotSettings;
