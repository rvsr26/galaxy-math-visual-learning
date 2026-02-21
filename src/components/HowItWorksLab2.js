import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HowItWorksLab2 = ({ onBack }) => {
    const navigate = useNavigate();

    const features = [
        {
            icon: '🌌',
            title: 'Your Galaxy Journey',
            desc: 'Start at the first planet and follow the path. Complete games to unlock the next planet in the galaxy!'
        },
        {
            icon: '🎮',
            title: 'Play & Learn',
            desc: 'Each planet has a unique math game. From Counting to Fractions, master them all to become a Space Explorer.'
        },
        {
            icon: '🪙',
            title: 'Earn Space Coins',
            desc: 'Get coins for every correct answer! Use them to unlock cool avatars in the Avatar Station.'
        },
        {
            icon: '🔥',
            title: 'Keep the Streak',
            desc: 'Play every day to build your streak fire. Don’t let it go out!'
        }
    ];

    return (
        <div className="min-h-screen bg-[#020617] relative overflow-hidden flex flex-col items-center pt-24 px-4 pb-12">

            {/* Background FX */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-black pointer-events-none"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 w-full max-w-4xl"
            >

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-bold text-xs uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
                        Lab 2 Guide
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-400 mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                        Galaxy Explorer's Manual
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
                        Everything you need to know to conquer the math universe.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 + 0.3 }}
                            className="bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-[2rem] p-8 hover:bg-slate-800/80 transition-all duration-300 group"
                        >
                            <div className="flex items-start gap-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform duration-300 border border-white/5">
                                    {f.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">{f.title}</h3>
                                    <p className="text-slate-400 leading-relaxed font-medium">
                                        {f.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Gameplay Video Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mb-16 bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center text-2xl border border-cyan-500/30">
                            🎬
                        </div>
                        <h3 className="text-2xl font-black text-white tracking-tight uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
                            Galaxy Video Guide
                        </h3>
                    </div>

                    <div className="aspect-video bg-black rounded-3xl border-2 border-slate-800 shadow-2xl overflow-hidden relative group cursor-pointer group">
                        <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors z-10"></div>

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform duration-300">
                                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[22px] border-l-white border-b-[12px] border-b-transparent ml-2"></div>
                            </div>
                        </div>

                        {/* Video Thumbnail Placeholder */}
                        <img
                            src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000"
                            alt="Gameplay Demo"
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                        />

                        {/* Video Metadata */}
                        <div className="absolute bottom-6 left-6 right-6 bg-slate-900/60 backdrop-blur-xl p-4 rounded-2xl border border-white/10 flex justify-between items-center z-20">
                            <div>
                                <p className="text-white font-black text-sm">How to Collect Space Coins</p>
                                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mt-0.5">Galaxy Mission #1</p>
                            </div>
                            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-[10px] font-black border border-cyan-500/30">
                                4:32 MINS
                            </span>
                        </div>
                    </div>

                    <p className="text-center text-slate-500 text-sm mt-6 font-medium italic">
                        "Watch how to navigate planets and solve math puzzles like a pro!"
                    </p>
                </motion.div>

                {/* Pro Tips */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-indigo-900/20 border border-indigo-500/30 rounded-3xl p-8 text-center backdrop-blur-sm"
                >
                    <h3 className="text-xl font-bold text-indigo-300 mb-2 uppercase tracking-widest">🚀 Pro Tip</h3>
                    <p className="text-white text-lg font-medium">
                        Stuck on a level? Try "Practice Mode" first to warm up your brain!
                    </p>
                </motion.div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <button
                        onClick={onBack}
                        className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full font-black text-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_40px_rgba(79,70,229,0.6)] hover:scale-105 transition-all"
                    >
                        Return to Galaxy Map
                    </button>
                </div>

            </motion.div>
        </div>
    );
};

export default HowItWorksLab2;
