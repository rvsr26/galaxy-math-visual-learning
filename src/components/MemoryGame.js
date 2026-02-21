import React, { useState, useEffect, useCallback } from 'react';
import CelebrationOverlay from './CelebrationOverlay';
import ScoreOverlay from './ScoreOverlay';
import { useSound } from './useSound';

const CARDS = [
    { id: 1, content: '🪐' }, { id: 2, content: '🪐' },
    { id: 3, content: '🚀' }, { id: 4, content: '🚀' },
    { id: 5, content: '⭐' }, { id: 6, content: '⭐' },
    { id: 7, content: '🌍' }, { id: 8, content: '🌍' },
    { id: 9, content: '👽' }, { id: 10, content: '👽' },
    { id: 11, content: '🌙' }, { id: 12, content: '🌙' },
];

const MemoryGame = ({ difficulty, onBack, onScoreSave, settings }) => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(0);
    const [showCelebration, setShowCelebration] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [soundOn, setSoundOn] = useState(true);
    const { playCorrect, playWrong, playFlip, speak, isMilestone } = useSound(soundOn);

    const initializeGame = useCallback(() => {
        let deck = [...CARDS];
        if (difficulty === 'easy') deck = deck.slice(0, 6); // 3 pairs
        if (difficulty === 'medium') deck = deck.slice(0, 8); // 4 pairs

        // Fisher-Yates Shuffle
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }

        setCards(deck);
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setScore(0);
        setShowCelebration(false);
        setShowScore(false);
    }, [difficulty]);

    useEffect(() => {
        initializeGame();
    }, [difficulty, initializeGame]);

    const handleCardClick = (index) => {
        if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

        playFlip();
        const newFlipped = [...flipped, index];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            checkForMatch(newFlipped);
        }
    };

    const checkForMatch = (currentFlipped) => {
        const [first, second] = currentFlipped;
        if (cards[first].content === cards[second].content) {
            setTimeout(() => {
                setMatched(prev => [...prev, first, second]);
                setFlipped([]);
                playCorrect();
                const newScore = score + 20; // 20 points per match
                setScore(newScore);
                speak('Match!');

                if (matched.length + 2 === cards.length) {
                    handleWin(newScore);
                }
            }, 600);
        } else {
            setTimeout(() => {
                setFlipped([]);
                playWrong();
            }, 1000);
        }
    };

    const handleWin = (finalScore) => {
        // Map score so Easy mode (3 pairs = 60 pts) gives at least 6 points to trigger 'win' rewards
        if (onScoreSave) onScoreSave(Math.ceil(finalScore / 10));
        setTimeout(() => setShowCelebration(true), 500);
    };

    return (
        <div className="min-h-screen pt-24 px-4 pb-12 flex flex-col items-center" style={{ backgroundColor: 'var(--bg-main)' }}>
            {showCelebration && (
                <CelebrationOverlay
                    score={score}
                    settings={settings}
                    onDone={() => { setShowCelebration(false); initializeGame(); }}
                />
            )}
            {showScore && (
                <ScoreOverlay
                    score={score}
                    onRestart={() => { setShowScore(false); initializeGame(); }}
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

                <div className="flex gap-4">
                    <div className="px-6 py-2 bg-blue-500/20 border border-blue-500/40 rounded-full">
                        <span className="text-xl font-bold text-blue-400">Moves: {moves}</span>
                    </div>
                    <div className="px-6 py-2 bg-yellow-500/20 border border-yellow-500/40 rounded-full">
                        <span className="text-xl font-bold text-yellow-400">⭐ {score}</span>
                    </div>
                </div>

                <button
                    className="p-3 bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors"
                    onClick={() => setSoundOn(s => !s)}
                    title="Toggle Sound"
                >
                    {soundOn ? '🔊' : '🔇'}
                </button>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500 mb-8 animate-pulse">
                Space Memory 🧠
            </h2>

            {/* Grid */}
            <div className={`grid gap-4 md:gap-6 animate-fade-in-up
                ${difficulty === 'easy' ? 'grid-cols-3' : 'grid-cols-4'}
            `}>
                {cards.map((card, index) => (
                    <button
                        key={index}
                        className={`
                            w-24 h-32 md:w-32 md:h-40 rounded-2xl perspective-1000 transition-all duration-300 transform
                            ${matched.includes(index) ? 'opacity-50 cursor-default' : 'hover:-translate-y-2 hover:shadow-cyan-500/30'}
                        `}
                        onClick={() => handleCardClick(index)}
                    >
                        <div className={`
                            relative w-full h-full transition-all duration-500 transform-style-3d
                            ${flipped.includes(index) || matched.includes(index) ? 'rotate-y-180' : ''}
                        `}>
                            {/* Back Face (Question Mark) */}
                            <div className="absolute inset-0 bg-slate-800 border-4 border-slate-700 rounded-2xl flex items-center justify-center text-4xl md:text-6xl backface-hidden">
                                ❓
                            </div>
                            {/* Front Face (Emoji) */}
                            <div className="absolute inset-0 bg-white text-black border-4 border-cyan-400 rounded-2xl flex items-center justify-center text-4xl md:text-6xl rotate-y-180 backface-hidden">
                                {card.content}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default MemoryGame;
