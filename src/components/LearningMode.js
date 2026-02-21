import React, { useState, useCallback } from 'react';
import ScoreOverlay from './ScoreOverlay';
import { useSound } from './useSound';

const FUN_FACTS = {
    1: "The Sun is 1 star at the center of our Solar System! ☀️",
    2: "Earth has 2 poles — North and South! 🌍",
    3: "Mars has 3 volcanoes taller than Everest! 🚀",
    4: "Jupiter has 4 large moons called the Galilean moons! 🪐",
    5: "Saturn has rings made of 5 types of ice and rock! 🪐",
    6: "A comet's tail can be 6 million km long! 💫",
    7: "There are 7 colors in a rainbow seen from space! 🌈",
    8: "Light takes 8 minutes to travel from the Sun to Earth! ☀️",
    9: "Saturn has 9 main ring groups! 🪐",
    10: "Our Solar System has 10 known dwarf planets! 🌌",
};

const LEARNING_DATA = [
    { num: 1, text: "One", items: ["☀️"], emoji: "☀️" },
    { num: 2, text: "Two", items: ["🌍", "🌙"], emoji: "🌙" },
    { num: 3, text: "Three", items: ["🪐", "⭐", "🚀"], emoji: "🚀" },
    { num: 4, text: "Four", items: ["🌟", "🌟", "🌟", "🌟"], emoji: "🌟" },
    { num: 5, text: "Five", items: ["🪐", "🪐", "🪐", "🪐", "🪐"], emoji: "🪐" },
    { num: 6, text: "Six", items: ["⭐", "⭐", "⭐", "⭐", "⭐", "⭐"], emoji: "⭐" },
    { num: 7, text: "Seven", items: ["💫", "💫", "💫", "💫", "💫", "💫", "💫"], emoji: "💫" },
    { num: 8, text: "Eight", items: ["🛸", "🛸", "🛸", "🛸", "🛸", "🛸", "🛸", "🛸"], emoji: "🛸" },
    { num: 9, text: "Nine", items: ["🌌", "🌌", "🌌", "🌌", "🌌", "🌌", "🌌", "🌌", "🌌"], emoji: "🌌" },
    { num: 10, text: "Ten", items: ["🚀", "🚀", "🚀", "🚀", "🚀", "🚀", "🚀", "🚀", "🚀", "🚀"], emoji: "🚀" },
];

const LearningMode = ({ onBack }) => {
    const [activeNum, setActiveNum] = useState(1);
    const [soundOn, setSoundOn] = useState(true);
    const [itemSpoken, setItemSpoken] = useState(null);
    const [showScore, setShowScore] = useState(false);
    const { speak } = useSound(soundOn);

    const current = LEARNING_DATA[activeNum - 1];

    const handleCardSelect = useCallback((data) => {
        setActiveNum(data.num);
        setItemSpoken(null);
        speak(`${data.num}. ${data.text}`);
    }, [speak]);

    const handleSpeakNumber = () => {
        speak(`${current.num}. ${current.text}. ${FUN_FACTS[current.num]}`);
    };

    const handleItemClick = (item, index) => {
        setItemSpoken(index);
        speak(`${index + 1}`);
        setTimeout(() => setItemSpoken(null), 800);
    };

    return (
        <div className="min-h-screen bg-slate-950 pt-20 px-4 flex flex-col items-center">
            {showScore && (
                <ScoreOverlay
                    score="Learning"
                    onRestart={() => { setShowScore(false); setActiveNum(1); }}
                    onHome={onBack}
                />
            )}

            {/* Top Bar */}
            <div className="w-full max-w-4xl flex items-center justify-between mb-8">
                <div className="flex gap-3">
                    <button
                        onClick={onBack}
                        className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700 text-white rounded-xl font-bold border border-white/10 transition-colors"
                    >
                        ⬅ Back
                    </button>
                    <button
                        onClick={() => setShowScore(true)}
                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-xl font-bold border border-red-500/20 transition-colors"
                    >
                        ❌ End
                    </button>
                </div>
                <button
                    className="p-3 bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors"
                    onClick={() => setSoundOn(s => !s)}
                    title="Toggle Sound"
                >
                    {soundOn ? '🔊' : '🔇'}
                </button>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-8 animate-pulse">
                Learn Numbers! 📚
            </h2>

            {/* Main Learning Card */}
            <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center mb-12">

                {/* Left: Number & Text */}
                <div className="glass-panel p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden group">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>

                    <div className="text-[12rem] font-black text-white leading-none drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                        {current.num}
                    </div>
                    <div className="text-4xl font-bold text-cyan-400 mt-4 tracking-wider uppercase">
                        {current.text}
                    </div>

                    <button
                        className="mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white font-bold flex items-center gap-2 transition-all"
                        onClick={handleSpeakNumber}
                    >
                        🔊 Hear it!
                    </button>
                </div>

                {/* Right: Interactive Items */}
                <div className="flex flex-col gap-6">
                    <div className="glass-panel p-6 min-h-[300px] flex flex-wrap content-center justify-center gap-4">
                        {current.items.map((item, i) => (
                            <button
                                key={i}
                                className={`
                                    w-20 h-20 text-5xl flex items-center justify-center rounded-2xl transition-all duration-300
                                    ${itemSpoken === i
                                        ? 'bg-green-500/20 scale-125 rotate-12 shadow-[0_0_20px_rgba(74,222,128,0.5)]'
                                        : 'bg-slate-800/50 hover:bg-slate-700 hover:-translate-y-2'
                                    }
                                `}
                                onClick={() => handleItemClick(item, i)}
                                style={{ animationDelay: `${i * 0.08}s` }}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    {/* Fun Fact */}
                    <div className="glass-panel p-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
                        <div className="flex gap-3 items-start">
                            <span className="text-2xl">💡</span>
                            <p className="text-lg text-slate-200 font-medium">
                                {FUN_FACTS[current.num]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Strip */}
            <div className="w-full overflow-x-auto pb-8">
                <div className="flex justify-center gap-3 min-w-max px-4">
                    {LEARNING_DATA.map(data => (
                        <button
                            key={data.num}
                            className={`
                                w-14 h-14 rounded-xl font-bold text-xl transition-all duration-200
                                ${activeNum === data.num
                                    ? 'bg-blue-500 text-white scale-110 shadow-lg shadow-blue-500/40'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                                }
                            `}
                            onClick={() => handleCardSelect(data)}
                        >
                            {data.num}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LearningMode;
