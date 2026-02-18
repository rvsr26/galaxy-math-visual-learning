import React, { useState, useEffect, useCallback } from 'react';
import './MemoryGame.css';
import CelebrationOverlay from './CelebrationOverlay';
import { useSound } from './useSound';

const ITEMS = ['🪐', '🌍', '🌙', '☀️', '🚀', '🛸', '🌟', '💫', '🌌', '⭐'];

const MemoryGame = ({ difficulty, onBack, onScoreSave }) => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [score, setScore] = useState(0);
    const [wrongPair, setWrongPair] = useState([]);
    const [showCelebration, setShowCelebration] = useState(false);
    const [peeking, setPeeking] = useState(false);
    const [soundOn, setSoundOn] = useState(true);
    const { playCorrect, playWrong, speak, isMilestone } = useSound(soundOn);

    useEffect(() => { startNewGame(); }, [difficulty]);

    const startNewGame = useCallback((nextLevel = false, currentPairs = null) => {
        let numPairs = difficulty === 'hard' ? 8 : difficulty === 'medium' ? 6 : 4;
        if (nextLevel && currentPairs) numPairs = Math.min(currentPairs + 2, 10);

        const gameItems = ITEMS.slice(0, numPairs);
        const deck = [...gameItems, ...gameItems]
            .sort(() => Math.random() - 0.5)
            .map((item, index) => ({ id: index, content: item, pairId: gameItems.indexOf(item) }));

        setCards(deck);
        setFlipped([]);
        setMatched([]);
        setWrongPair([]);
        if (!nextLevel) setScore(0);

        // Peek mode on hard — briefly show all cards
        if (difficulty === 'hard') {
            setPeeking(true);
            speak('Watch carefully! Cards will hide in 2 seconds!');
            setTimeout(() => setPeeking(false), 2000);
        }
    }, [difficulty, speak]);

    const handleCardClick = (id) => {
        if (flipped.length === 2 || flipped.includes(id) || matched.includes(id) || peeking) return;
        const newFlipped = [...flipped, id];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            const [a, b] = newFlipped;
            if (cards[a].content === cards[b].content) {
                const newMatched = [...matched, a, b];
                setMatched(newMatched);
                const newScore = score + 10;
                setScore(newScore);
                if (onScoreSave) onScoreSave(newScore);
                playCorrect();
                speak('Match!');
                setFlipped([]);

                if (newMatched.length === cards.length) {
                    if (isMilestone(Math.floor(newScore / 10))) {
                        setShowCelebration(true);
                    } else {
                        setTimeout(() => speak('You found all pairs! Amazing!'), 300);
                    }
                }
            } else {
                playWrong();
                setWrongPair([a, b]);
                setTimeout(() => { setFlipped([]); setWrongPair([]); }, 1000);
            }
        }
    };

    const totalPairs = cards.length / 2;
    const foundPairs = matched.length / 2;

    return (
        <div className="game-container">
            {showCelebration && (
                <CelebrationOverlay score={score} onDone={() => {
                    setShowCelebration(false);
                    startNewGame(true, totalPairs);
                }} />
            )}

            <div className="game-topbar">
                <button className="back-btn" onClick={onBack}>⬅ Back</button>
                <div className="score-board">⭐ {score}</div>
                <button className="sound-toggle" onClick={() => setSoundOn(s => !s)}>{soundOn ? '🔊' : '🔇'}</button>
            </div>

            <h2>Memory Match 🧠</h2>

            <div className="memory-progress">
                <span className="memory-progress-text">
                    {foundPairs} of {totalPairs} pairs found
                </span>
                <div className="memory-progress-bar">
                    <div className="memory-progress-fill" style={{ width: `${totalPairs > 0 ? (foundPairs / totalPairs) * 100 : 0}%` }} />
                </div>
            </div>

            {peeking && <div className="peek-banner">👀 Memorize the cards!</div>}

            <div className={`memory-grid ${difficulty}`}>
                {cards.map(card => {
                    const isFlipped = flipped.includes(card.id) || matched.includes(card.id) || peeking;
                    const isMatched = matched.includes(card.id);
                    const isWrong = wrongPair.includes(card.id);
                    return (
                        <div
                            key={card.id}
                            className={`memory-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''} ${isWrong ? 'wrong-card' : ''}`}
                            onClick={() => handleCardClick(card.id)}
                        >
                            <div className="card-inner">
                                <div className="card-front">?</div>
                                <div className="card-back">{card.content}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {matched.length === cards.length && cards.length > 0 && !showCelebration && (
                <div className="completion-message">
                    <h2>🎉 All Pairs Found! 🎉</h2>
                    <div className="btn-group">
                        <button className="restart-btn" onClick={() => startNewGame(false)}>Play Again</button>
                        <button className="next-level-btn" onClick={() => startNewGame(true, totalPairs)}>Next Level ➡</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemoryGame;
