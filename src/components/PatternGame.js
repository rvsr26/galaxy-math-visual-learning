import React, { useState, useEffect, useCallback } from 'react';
import CelebrationOverlay from './CelebrationOverlay';
import ScoreOverlay from './ScoreOverlay';
import { useSound } from './useSound';

const PATTERNS = [
    ['🍎', '🍌', '🍎', '🍌', '🍎', '?'], // ABAB
    ['🐶', '🐱', '🐱', '🐶', '🐱', '?'], // ABB
    ['⭐', '⭐', '🌙', '⭐', '⭐', '?'], // AAB
    ['🔴', '🔵', '🟢', '🔴', '🔵', '?'], // ABC
    ['🚗', '🚕', '🚗', '🚕', '🚗', '?'], // ABAB
];

const PatternGame = ({ difficulty, onBack, onScoreSave, settings }) => {
    const [currentPattern, setCurrentPattern] = useState([]);
    const [missingIndex, setMissingIndex] = useState(-1);
    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState('');
    const [score, setScore] = useState(0);
    const [showCelebration, setShowCelebration] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [correctBtn, setCorrectBtn] = useState(null);
    const [wrongBtn, setWrongBtn] = useState(null);
    const [soundOn, setSoundOn] = useState(true);

    const { playCorrect, playWrong, speak, isMilestone } = useSound(soundOn);

    const generatePattern = useCallback(() => {
        const template = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
        const answer = template[template.length - 1] === '?'
            ? getAnswerFromPattern(template)
            : template[template.length - 1];

        // Replace one item with ? if not already
        const showArr = [...template];
        if (showArr[showArr.length - 1] === '?') {
            // Already set up
        }

        setCurrentPattern(showArr);
        setMissingIndex(showArr.length - 1);

        // Options
        const distractors = ['🍇', '🦊', '☀️', '🟡', '🚛', '🌍', '🚀', '🌈']
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);

        setOptions([answer, ...distractors].sort(() => Math.random() - 0.5));
        setMessage('What comes next? 🤔');
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
                    generatePattern();
                } else if (showScore) {
                    setShowScore(false);
                    generatePattern();
                    setScore(0);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [options, showCelebration, showScore, generatePattern]);

    useEffect(() => { generatePattern(); }, [difficulty, generatePattern]);

    const getAnswerFromPattern = (arr) => {
        // Simple logic for fixed patterns where last is '?'
        // Actually the PATTERNS array logic is a bit hardcoded. 
        // Let's deduce based on the pattern type.
        // For now, let's hardcode the answers in a map or logic.
        // Or better, let's just infer from the array before '?'
        if (arr[0] === arr[2]) return arr[1]; // ABAB -> B (wait, index 5 is ?)
        // ABAB A ? -> B
        // ABB A B ? -> B (wait 🐶🐱🐱🐶🐱? -> 🐱) 

        // This logic is tricky to genericize without robust pattern engine.
        // Let's use a simpler heuristic for this demo or mapping.
        const str = arr.join('');
        if (str.includes('🍎')) return '🍌';
        if (str.includes('🐶')) return '🐱';
        if (str.includes('⭐')) return '🌙';
        if (str.includes('🔴')) return '🟢'; // Green
        if (str.includes('🚗')) return '🚕';
        return '❓';
    };

    const checkAnswer = (selected) => {
        const correct = getAnswerFromPattern(currentPattern);

        if (selected === correct) {
            const newScore = score + 1;
            setScore(newScore);
            setCorrectBtn(selected);
            setMessage('You got it! 🌟');
            playCorrect();
            speak('Great job!');
            if (onScoreSave) onScoreSave(newScore);

            if (isMilestone(newScore)) {
                setShowCelebration(true);
            } else {
                setTimeout(generatePattern, 1000);
            }
        } else {
            setWrongBtn(selected);
            setMessage('Oops! Try again. 🧐');
            playWrong();
            speak('Try again.');
            setTimeout(() => setWrongBtn(null), 700);
        }
    };

    return (
        <div className="min-h-screen pt-20 px-4 flex flex-col items-center" style={{ backgroundColor: 'var(--bg-main)' }}>
            {showCelebration && (
                <CelebrationOverlay
                    score={score}
                    settings={settings}
                    onDone={() => { setShowCelebration(false); generatePattern(); }}
                />
            )}
            {showScore && (
                <ScoreOverlay
                    score={score}
                    onRestart={() => { setShowScore(false); generatePattern(); setScore(0); }}
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

            <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600 mb-12 animate-pulse">
                Pattern Puzzle 🧩
            </h2>

            {/* Pattern Display */}
            <div className="glass-panel p-8 mb-12 flex flex-wrap justify-center gap-4 md:gap-8">
                {currentPattern.map((item, i) => (
                    <div
                        key={i}
                        className={`
                            w-20 h-20 md:w-28 md:h-28 flex items-center justify-center text-4xl md:text-6xl rounded-2xl bg-white/5 border border-white/10
                            ${item === '?' ? 'animate-bounce border-yellow-400 border-dashed bg-yellow-400/10' : ''}
                        `}
                    >
                        {item}
                    </div>
                ))}
            </div>

            {/* Options */}
            <div className="flex gap-6 animate-fade-in-up">
                {options.map((opt, i) => (
                    <button
                        key={i}
                        className={`
                            w-24 h-24 md:w-32 md:h-32 text-4xl md:text-6xl rounded-2xl border-4 transition-all duration-200 shadow-xl
                            ${correctBtn === opt
                                ? 'bg-green-500 border-green-400 scale-110 shadow-green-500/50'
                                : wrongBtn === opt
                                    ? 'bg-red-500 border-red-400 animate-shake'
                                    : 'bg-slate-800 border-slate-600 hover:border-pink-400 hover:bg-slate-700 hover:scale-105'
                            }
                        `}
                        onClick={() => checkAnswer(opt)}
                    >
                        {opt}
                    </button>
                ))}
            </div>

            {/* Message */}
            {message && (
                <div className={`mt-12 text-2xl md:text-3xl font-black text-center animate-fade-in
                    ${correctBtn !== null ? 'text-green-400' : 'text-slate-200'}
                `}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default PatternGame;
