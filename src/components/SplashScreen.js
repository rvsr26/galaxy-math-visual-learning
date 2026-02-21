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

                <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter text-glow">
                    GALAXY LEARNING LABS
                </h1>

                <p className="text-base text-slate-500 mb-16 max-w-lg mx-auto font-medium tracking-wide uppercase">
                    Select a module to begin your journey
                </p>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16 px-4">

                    {/* LAB 1: Emergency Awareness */}
                    <button
                        onClick={() => handleLabSelection('lab1')}
                        className="group relative h-[380px] rounded-[2rem] overflow-hidden transition-all duration-500 hover:scale-[1.01]"
                    >
                        <div className="absolute inset-0 bg-slate-900/60 border border-white/5 group-hover:border-red-500/30 transition-colors duration-500"></div>
                        <div className="relative h-full flex flex-col items-center justify-center p-8 z-10">
                            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">🚨</div>
                            <h2 className="text-xs font-bold text-red-400/80 tracking-[0.3em] mb-2 uppercase">Lab 01</h2>
                            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-wider">Safety First</h3>
                            <p className="text-slate-500 text-xs leading-relaxed max-w-xs mx-auto mb-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                Master emergency protocols and safety basics in our specialized awareness simulator.
                            </p>
                            <span className="text-[10px] font-black text-white uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                                Launch Module →
                            </span>
                        </div>
                    </button>

                    {/* LAB 2: Galaxy Math */}
                    <button
                        onClick={() => handleLabSelection('lab2')}
                        className="group relative h-[380px] rounded-[2rem] overflow-hidden transition-all duration-500 hover:scale-[1.01]"
                    >
                        <div className="absolute inset-0 bg-slate-900/60 border border-white/5 group-hover:border-blue-500/30 transition-colors duration-500"></div>
                        <div className="relative h-full flex flex-col items-center justify-center p-8 z-10">
                            <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-500">🌌</div>
                            <h2 className="text-xs font-bold text-blue-400/80 tracking-[0.3em] mb-2 uppercase">Lab 02</h2>
                            <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-wider">Galaxy Math</h3>
                            <p className="text-slate-500 text-xs leading-relaxed max-w-xs mx-auto mb-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                Explore mathematical concepts through the lens of space exploration and cosmic challenges.
                            </p>
                            <span className="text-[10px] font-black text-white uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
                                Launch Module →
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
