import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = ({ onComplete }) => {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    const handleLabSelection = (lab) => {
        if (lab === 'lab1') {
            navigate('/emergency');
        } else {
            // Check if we are already authenticated or if we need to show the main app
            // For now, we assume onComplete handles the state transition to show Lab 2
            onComplete();
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Background Animation */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black z-0"></div>

            {/* Ambient Light */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] pointer-events-none"></div>

            <div className={`relative z-10 w-full max-w-6xl text-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                <h1 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200 mb-6 drop-shadow-2xl tracking-tight">
                    Galaxy Learning Labs
                </h1>

                <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto font-medium">
                    Two worlds, one mission. Select a module to begin your journey.
                </p>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16 px-4">

                    {/* LAB 1: Emergency Awareness */}
                    <button
                        onClick={() => handleLabSelection('lab1')}
                        className="group relative h-[400px] rounded-[2.5rem] overflow-hidden focus:outline-none focus:ring-4 focus:ring-red-500/30 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
                    >
                        {/* Card Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 group-hover:border-red-500/50 transition-colors duration-500"></div>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>

                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative h-full flex flex-col items-center justify-center p-8 z-10">
                            <div className="w-32 h-32 mb-8 relative">
                                <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl group-hover:bg-red-500/30 transition-colors duration-500 animate-pulse"></div>
                                <div className="absolute inset-0 flex items-center justify-center text-7xl transform group-hover:scale-110 transition-transform duration-500">
                                    🚨
                                </div>
                            </div>

                            <h2 className="text-3xl font-black text-white mb-3 tracking-wide">
                                LAB 1
                            </h2>
                            <h3 className="text-xl font-bold text-red-300 mb-4 uppercase tracking-wider">
                                Emergency Awareness
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto mb-8">
                                Learn safety protocols, emergency contacts, and how to stay calm in crisis.
                            </p>

                            <span className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold group-hover:bg-red-600 group-hover:border-red-500 transition-all duration-300 shadow-xl">
                                Enter Lab 1 ➜
                            </span>
                        </div>
                    </button>

                    {/* LAB 2: Galaxy Math */}
                    <button
                        onClick={() => handleLabSelection('lab2')}
                        className="group relative h-[400px] rounded-[2.5rem] overflow-hidden focus:outline-none focus:ring-4 focus:ring-blue-500/30 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
                    >
                        {/* Card Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 group-hover:border-blue-500/50 transition-colors duration-500"></div>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>

                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative h-full flex flex-col items-center justify-center p-8 z-10">
                            <div className="w-32 h-32 mb-8 relative">
                                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-colors duration-500 animate-pulse" style={{ animationDelay: '1s' }}></div>
                                <div className="absolute inset-0 flex items-center justify-center text-7xl transform group-hover:scale-110 transition-transform duration-500">
                                    🌌
                                </div>
                            </div>

                            <h2 className="text-3xl font-black text-white mb-3 tracking-wide">
                                LAB 2
                            </h2>
                            <h3 className="text-xl font-bold text-blue-300 mb-4 uppercase tracking-wider">
                                Galaxy Math
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto mb-8">
                                Explore the universe of numbers with interactive games and math challenges.
                            </p>

                            <span className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300 shadow-xl">
                                Enter Lab 2 ➜
                            </span>
                        </div>
                    </button>

                </div>
            </div>

            <footer className="absolute bottom-8 text-slate-600 text-xs font-bold uppercase tracking-widest">
                System Online · v2.0
            </footer>
        </div>
    );
};

export default SplashScreen;
