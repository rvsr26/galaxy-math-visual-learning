
import React, { useState, useEffect, useCallback } from 'react';
import './PatternGame.css';
import CelebrationOverlay from './CelebrationOverlay';
import ScoreOverlay from './ScoreOverlay';
import { useSound } from './useSound';

const SHAPES = ['🔴', '🔵', '🟢', '🟡', '🔺', '⬛', '🟣', '🟠'];
const ENCOURAGEMENTS = [
    'Pattern Master! 🎨', 'Great eye! 👀', 'You got it! ⭐',
    'Brilliant! 💫', 'Amazing! 🚀', 'Perfect! 🏆'
];

const PatternGame = ({ difficulty, onBack, onScoreSave }) => {
    const [sequence, setSequence] = useState({ visible: [], answer: '' });
    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState('');
    const [score, setScore] = useState(0);
    const [visibleCount, setVisibleCount] = useState(0);
    const [wrongBtn, setWrongBtn] = useState(null);
    const [correctBtn, setCorrectBtn] = useState(null);
    const [showCelebration, setShowCelebration] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [soundOn, setSoundOn] = useState(true);
    const { playCorrect, playWrong, speak, isMilestone } = useSound(soundOn);

    useEffect(() => { generatePattern(); }, [difficulty]);

    const generatePattern = useCallback(() => {
        const type = difficulty === 'hard' ? 'AABB' : difficulty === 'medium' ? 'ABC' : 'AB';
        const s1 = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        let s2 = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        let s3 = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        while (s2 === s1) s2 = SHAPES[Math.floor(Math.random() * SHAPES.length)];
        while (s3 === s1 || s3 === s2) s3 = SHAPES[Math.floor(Math.random() * SHAPES.length)];

        let fullPattern = [];
        if (type === 'AB') fullPattern = [s1, s2, s1, s2, s1];
        else if (type === 'ABC') fullPattern = [s1, s2, s3, s1, s2, s3, s1];
        else fullPattern = [s1, s1, s2, s2, s1, s1];

        const visible = fullPattern.slice(0, fullPattern.length - 1);
        const answer = fullPattern[fullPattern.length - 1];

        // Ensure answer is in options
        let opts = [answer];
        while (opts.length < 3) {
            const s = SHAPES[Math.floor(Math.random() * SHAPES.length)];
            if (!opts.includes(s)) opts.push(s);
        }
        opts = opts.sort(() => Math.random() - 0.5);

        setSequence({ visible, answer });
        setOptions(opts);
        setMessage('What comes next? 🤔');
        setVisibleCount(0);
        setWrongBtn(null);
        setCorrectBtn(null);

        // Animate items appearing one by one
        visible.forEach((_, i) => {
            setTimeout(() => setVisibleCount(i + 1), i * 250 + 300);
        });

        // Speak the pattern
        setTimeout(() => {
            const names = visible.map(s => {
                const map = { '🔴': 'red', '🔵': 'blue', '🟢': 'green', '🟡': 'yellow', '🔺': 'triangle', '⬛': 'black', '🟣': 'purple', '🟠': 'orange' };
                return map[s] || s;
            });
            speak(names.join(', ') + '. What comes next?');
        }, visible.length * 250 + 600);
    }, [difficulty, speak]);

    const checkAnswer = (selected) => {
        if (selected === sequence.answer) {
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
                setTimeout(generatePattern, 1600);
            }
        } else {
            playWrong();
            setWrongBtn(selected);
            setMessage('Not quite! Look at the pattern again! 🔍');
            speak('Try again!');
            setTimeout(() => setWrongBtn(null), 700);
        }
    };

    return (
        <div className="game-container">
            {showCelebration && (
                <CelebrationOverlay score={score} onDone={() => { setShowCelebration(false); generatePattern(); }} />
            )}
            {showScore && (
                <ScoreOverlay
                    score={score}
                    onRestart={() => { setShowScore(false); generatePattern(); }}
                    onHome={onBack}
                />
            )}

            <div className="game-topbar">
                <div className="game-controls-left">
                    <button className="back-btn" onClick={onBack}>⬅ Back</button>
                    <button className="end-game-btn" onClick={() => setShowScore(true)}>❌ End Game</button>
                </div>
                <div className="score-board">⭐ {score}</div>
                <button className="sound-toggle" onClick={() => setSoundOn(s => !s)}>{soundOn ? '🔊' : '🔇'}</button>
            </div>

            <h2>Complete the Pattern! 🎨</h2>

            <div className="pattern-display">
                {sequence.visible && sequence.visible.map((item, i) => (
                    <div
                        key={i}
                        className={`pattern-item ${i < visibleCount ? 'revealed' : 'hidden'}`}
                        style={{ transitionDelay: `${i * 0.05}s` }}
                    >
                        {item}
                    </div>
                ))}
                <div className={`pattern-item question ${visibleCount >= (sequence.visible?.length || 0) ? 'revealed' : 'hidden'}`}>?</div>
            </div>

            <div className="options-container">
                {options.map((opt, i) => (
                    <button
                        key={i}
                        className={`option-btn pattern-opt ${correctBtn === opt ? 'correct' : ''} ${wrongBtn === opt ? 'wrong' : ''}`}
                        onClick={() => checkAnswer(opt)}
                    >
                        {opt}
                    </button>
                ))}
            </div>

            {message && <div className={`message ${correctBtn !== null ? 'success' : ''}`}>{message}</div>}
        </div>
    );
};

export default PatternGame;
