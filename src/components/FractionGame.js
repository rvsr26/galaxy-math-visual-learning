import React, { useState, useEffect, useCallback } from 'react';
import CelebrationOverlay from './CelebrationOverlay';
import ScoreOverlay from './ScoreOverlay';
import { useSound } from './useSound';

const FractionGame = ({ difficulty, onBack, onScoreSave, settings }) => {
    const [targetFraction, setTargetFraction] = useState({ n: 1, d: 2 }); // numerator, denominator
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState('');
    const [showCelebration, setShowCelebration] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [soundOn, setSoundOn] = useState(true);
    const { playCorrect, playWrong, speak, isMilestone } = useSound(soundOn);

    const [correctBtn, setCorrectBtn] = useState(null);
    const [wrongBtn, setWrongBtn] = useState(null);

    const generateProblem = useCallback(() => {
        // Difficulty Logic
        // Easy: Halves, Quarters (d=2,4)
        // Medium: Thirds, Fifths, Eighths (d=3,5,8)
        // Hard: Mixed, simplified? (d=6,10,12)

        let denoms = [2, 4];
        if (difficulty === 'medium') denoms = [3, 5, 8];
        if (difficulty === 'hard') denoms = [6, 10, 12];

        const d = denoms[Math.floor(Math.random() * denoms.length)];
        const n = Math.floor(Math.random() * (d - 1)) + 1; // n < d

        setTargetFraction({ n, d });

        // Generate Options
        const correctOpt = { n, d };
        let opts = [correctOpt];

        while (opts.length < 3) {
            const rd = denoms[Math.floor(Math.random() * denoms.length)];
            const rn = Math.floor(Math.random() * (rd - 1)) + 1;

            // Avoid duplicates
            const exists = opts.some(o => o.n === rn && o.d === rd);
            if (!exists) opts.push({ n: rn, d: rd });
        }

        setOptions(opts.sort(() => Math.random() - 0.5));
        setMessage('Find the matching pizza! 🍕');
        setCorrectBtn(null);
        setWrongBtn(null);

    }, [difficulty]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key >= '1' && e.key <= '3') {
                const index = parseInt(e.key) - 1;
                if (options[index]) {
                    checkAnswer(options[index]);
                }
            }
            if (e.key === 'Enter') {
                if (showCelebration) {
                    setShowCelebration(false);
                    generateProblem();
                } else if (showScore) {
                    setShowScore(false);
                    generateProblem();
                    setScore(0);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [options, showCelebration, showScore, generateProblem]);

    useEffect(() => {
        generateProblem();
    }, [difficulty, generateProblem]);

    const checkAnswer = (selected) => {
        if (selected.n === targetFraction.n && selected.d === targetFraction.d) {
            const newScore = score + 10;
            setScore(newScore);
            if (onScoreSave) onScoreSave(newScore);
            playCorrect();
            // setCorrectBtn(selected); // Object equality might fail, need ID or index if using state
            setMessage('Delicious! 😋');
            speak('Delicious!');

            if (isMilestone(newScore / 10)) {
                setShowCelebration(true);
            } else {
                setTimeout(generateProblem, 1000);
            }
        } else {
            // setWrongBtn(selected);
            playWrong();
            setMessage('Not that slice! 🫤');
            speak('Not that slice!');
        }
    };

    // Helper to render circle chart (SVG or CSS conic-gradient)
    const renderPizza = (n, d, size = 100) => {
        const percent = (n / d) * 100;
        return (
            <div
                className="rounded-full border-4 border-yellow-600 bg-yellow-100 relative shadow-inner overflow-hidden"
                style={{
                    width: size,
                    height: size,
                    backgroundImage: `conic-gradient(#fb923c 0% ${percent}%, #fef3c7 ${percent}% 100%)`
                }}
            >
                {/* Slices lines */}
                {Array.from({ length: d }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-full h-full border-l border-yellow-700/30 opacity-50 top-0 left-1/2 origin-left"
                        style={{ transform: `rotate(${(360 / d) * i}deg)` }}
                    ></div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen pt-20 px-4 flex flex-col items-center" style={{ backgroundColor: 'var(--bg-main)' }}>
            {showCelebration && (
                <CelebrationOverlay
                    score={score}
                    settings={settings}
                    onDone={() => { setShowCelebration(false); generateProblem(); }}
                />
            )}
            {showScore && (
                <ScoreOverlay
                    score={score}
                    onRestart={() => { setShowScore(false); generateProblem(); setScore(0); }}
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

                <div className="px-6 py-2 bg-yellow-500/20 border border-yellow-500/40 rounded-full">
                    <span className="text-xl font-bold text-yellow-400">⭐ {score}</span>
                </div>

                <button
                    className="p-3 bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors"
                    onClick={() => setSoundOn(s => !s)}
                    title="Toggle Sound"
                >
                    {soundOn ? '🔊' : '🔇'}
                </button>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500 mb-8 animate-pulse">
                Fraction Feast 🍕
            </h2>

            {/* Target Display */}
            <div className="glass-panel p-8 mb-12 flex flex-col items-center gap-4">
                <h3 className="text-2xl text-slate-300">Show me:</h3>
                <div className="text-6xl md:text-8xl font-black text-cyan-400 drop-shadow-lg flex flex-col items-center leading-none">
                    <span>{targetFraction.n}</span>
                    <span className="w-full h-2 bg-white/20 rounded-full my-2"></span>
                    <span>{targetFraction.d}</span>
                </div>
            </div>

            {/* Options */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 animate-fade-in-up">
                {options.map((opt, i) => (
                    <button
                        key={i}
                        className="group flex flex-col items-center gap-4 transition-transform hover:scale-110 focus:outline-none"
                        onClick={() => checkAnswer(opt)}
                    >
                        <div className="bg-white p-2 rounded-full shadow-2xl group-hover:shadow-orange-500/50 transition-shadow">
                            {renderPizza(opt.n, opt.d, 140)}
                        </div>
                        <span className="px-4 py-1 bg-slate-800 rounded-lg text-slate-400 font-bold group-hover:text-white transition-colors">
                            {opt.n}/{opt.d}
                        </span>
                    </button>
                ))}
            </div>

            {/* Message */}
            {message && (
                <div className="mt-12 text-2xl font-bold text-orange-400 animate-bounce">
                    {message}
                </div>
            )}
        </div>
    );
};

export default FractionGame;
