
import React, { useState, useEffect, useCallback } from 'react';
import './CountingGame.css';
import CelebrationOverlay from './CelebrationOverlay';
import ScoreOverlay from './ScoreOverlay';
import { useSound } from './useSound';

const EMOJIS = ['🪐', '⭐', '🌍', '🌙', '☀️', '🌟', '💫', '🚀', '🛸', '🌌'];
const ENCOURAGEMENTS = [
    'Great job! 🎉', 'You did it! ⭐', 'Awesome counting! 🌟',
    'Super smart! 🧠', 'Brilliant! 💫', 'You rock! 🎸',
    'Fantastic! 🦄', 'Wow, amazing! 🚀', 'Perfect! 🏆', 'Keep it up! 💪'
];

const CountingGame = ({ difficulty, onBack, onScoreSave }) => {
    const [targetNumber, setTargetNumber] = useState(0);
    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState('');
    const [score, setScore] = useState(0);
    const [currentEmoji, setCurrentEmoji] = useState(EMOJIS[0]);
    const [tapped, setTapped] = useState(new Set());
    const [phase, setPhase] = useState('count'); // 'count' | 'answer'
    const [wrongBtn, setWrongBtn] = useState(null);
    const [correctBtn, setCorrectBtn] = useState(null);
    const [showCelebration, setShowCelebration] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [soundOn, setSoundOn] = useState(true);
    const { playCorrect, playWrong, playCount, speak, isMilestone } = useSound(soundOn);

    useEffect(() => { generateNewRound(); }, [difficulty]);

    const generateNewRound = useCallback(() => {
        let max = 5;
        if (difficulty === 'medium') max = 10;
        if (difficulty === 'hard') max = 20;
        const num = Math.floor(Math.random() * max) + 1;
        setTargetNumber(num);
        setCurrentEmoji(EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);
        let opts = [num];
        while (opts.length < 3) {
            let r = Math.floor(Math.random() * max) + 1;
            if (!opts.includes(r)) opts.push(r);
        }
        setOptions(opts.sort((a, b) => a - b));
        setTapped(new Set());
        setPhase('count');
        setMessage('👆 Tap each one to count!');
        setWrongBtn(null);
        setCorrectBtn(null);
    }, [difficulty]);

    const handleTap = (index) => {
        if (tapped.has(index)) return;
        const newTapped = new Set(tapped);
        newTapped.add(index);
        setTapped(newTapped);
        const count = newTapped.size;
        playCount(count);
        speak(String(count));
        if (count === targetNumber) {
            setTimeout(() => {
                setPhase('answer');
                setMessage('How many did you count?');
                speak('How many did you count?');
            }, 400);
        }
    };

    const checkAnswer = (selected) => {
        if (selected === targetNumber) {
            const newScore = score + 1;
            playCorrect();
            setCorrectBtn(selected);
            const msg = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
            setMessage(msg);
            speak(msg);
            setScore(newScore);
            if (onScoreSave) onScoreSave(newScore);
            if (isMilestone(newScore)) {
                setShowCelebration(true);
            } else {
                setTimeout(generateNewRound, 1600);
            }
        } else {
            playWrong();
            setWrongBtn(selected);
            setMessage('Try again! Count the items! 🔍');
            speak('Try again!');
            setTimeout(() => setWrongBtn(null), 700);
        }
    };

    const progress = targetNumber > 0 ? (tapped.size / targetNumber) * 100 : 0;

    return (
        <div className="game-container">
            {showCelebration && (
                <CelebrationOverlay score={score} onDone={() => { setShowCelebration(false); generateNewRound(); }} />
            )}
            {showScore && (
                <ScoreOverlay
                    score={score}
                    onRestart={() => { setShowScore(false); generateNewRound(); setScore(0); }}
                    onHome={onBack}
                />
            )}

            <div className="game-topbar">
                <div className="game-controls-left">
                    <button className="back-btn" onClick={onBack}>⬅ Back</button>
                    <button className="end-game-btn" onClick={() => setShowScore(true)}>❌ End Game</button>
                </div>
                <div className="score-board">⭐ {score}</div>
                <button className="sound-toggle" onClick={() => setSoundOn(s => !s)} title="Toggle Sound">
                    {soundOn ? '🔊' : '🔇'}
                </button>
            </div>

            <h2>Let's Count! 1️⃣2️⃣3️⃣</h2>

            {phase === 'count' && (
                <div className="count-progress-wrap">
                    <div className="count-progress-bar">
                        <div className="count-progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <span className="count-progress-label">{tapped.size} / {targetNumber}</span>
                </div>
            )}

            <div className="counting-area">
                {Array.from({ length: targetNumber }).map((_, i) => (
                    <button
                        key={i}
                        className={`count-item-btn ${tapped.has(i) ? 'tapped' : ''}`}
                        onClick={() => handleTap(i)}
                        style={{ animationDelay: `${i * 0.07}s` }}
                        aria-label={`Item ${i + 1}`}
                    >
                        {currentEmoji}
                    </button>
                ))}
            </div>

            {phase === 'answer' && (
                <div className="options-container">
                    {options.map(opt => (
                        <button
                            key={opt}
                            className={`option-btn ${correctBtn === opt ? 'correct' : ''} ${wrongBtn === opt ? 'wrong' : ''}`}
                            onClick={() => checkAnswer(opt)}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}

            {message && <div className={`message ${correctBtn !== null ? 'success' : ''}`}>{message}</div>}
        </div>
    );
};

export default CountingGame;
