
import React, { useState, useEffect, useCallback } from 'react';
import './MathGame.css';
import CelebrationOverlay from './CelebrationOverlay';
import ScoreOverlay from './ScoreOverlay';
import { useSound } from './useSound';

const ENCOURAGEMENTS = [
    'Math Star! ⭐', 'Brilliant! 💫', 'You got it! 🎉',
    'Amazing! 🚀', 'Super smart! 🧠', 'Correct! 🏆',
    'Wow! 🌟', 'Perfect! 💎', 'Genius! 🦄', 'Excellent! 🎊'
];

const OPERATORS = {
    easy: ['+'],
    medium: ['+', '-'],
    hard: ['+', '-', '×'],
};

const MathGame = ({ difficulty, onBack, onScoreSave }) => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [operator, setOperator] = useState('+');
    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState('');
    const [score, setScore] = useState(0);
    const [wrongBtn, setWrongBtn] = useState(null);
    const [correctBtn, setCorrectBtn] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [soundOn, setSoundOn] = useState(true);
    const { playCorrect, playWrong, speak, isMilestone } = useSound(soundOn);

    useEffect(() => { generateProblem(); }, [difficulty]);

    const getAnswer = (n1, n2, op) => {
        if (op === '+') return n1 + n2;
        if (op === '-') return n1 - n2;
        if (op === '×') return n1 * n2;
        return n1 + n2;
    };

    const generateProblem = useCallback(() => {
        let max = 5;
        if (difficulty === 'medium') max = 10;
        if (difficulty === 'hard') max = 12;

        const ops = OPERATORS[difficulty] || ['+'];
        const op = ops[Math.floor(Math.random() * ops.length)];

        let n1 = Math.floor(Math.random() * max) + 1;
        let n2 = Math.floor(Math.random() * max) + 1;

        // For subtraction, ensure non-negative result
        if (op === '-' && n2 > n1) [n1, n2] = [n2, n1];
        // For multiplication, keep numbers small
        if (op === '×') { n1 = Math.floor(Math.random() * 5) + 1; n2 = Math.floor(Math.random() * 5) + 1; }

        const ans = getAnswer(n1, n2, op);
        setNum1(n1); setNum2(n2); setOperator(op);

        let opts = new Set([ans]);
        while (opts.size < 3) {
            let r = Math.max(0, ans + (Math.floor(Math.random() * 7) - 3));
            if (r !== ans) opts.add(r);
        }
        setOptions(Array.from(opts).sort((a, b) => a - b));
        setMessage('');
        setWrongBtn(null);
        setCorrectBtn(null);
        setShowHint(false);

        // Speak the problem
        const opWord = op === '+' ? 'plus' : op === '-' ? 'minus' : 'times';
        setTimeout(() => speak(`${n1} ${opWord} ${n2} equals?`), 300);
    }, [difficulty, speak]);

    const checkAnswer = (selected) => {
        const ans = getAnswer(num1, num2, operator);
        if (selected === ans) {
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
                setTimeout(generateProblem, 1600);
            }
        } else {
            playWrong();
            setWrongBtn(selected);
            setMessage('Not quite! Try again! 🤔');
            speak('Try again!');
            setTimeout(() => setWrongBtn(null), 700);
        }
    };

    const emoji1 = operator === '×' ? '🌟' : '🪐';
    const emoji2 = operator === '×' ? '🌟' : '⭐';

    return (
        <div className="game-container">
            {showCelebration && (
                <CelebrationOverlay score={score} onDone={() => { setShowCelebration(false); generateProblem(); }} />
            )}
            {showScore && (
                <ScoreOverlay
                    score={score}
                    onRestart={() => { setShowScore(false); generateProblem(); setScore(0); }}
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

            <h2>Add the Numbers! ➕</h2>

            <div className="math-problem">
                <div className="number-group">
                    <span className="num-display">{num1}</span>
                    <div className="visual-aid">{emoji1.repeat(Math.min(num1, 12))}</div>
                </div>
                <div className="operator">{operator}</div>
                <div className="number-group">
                    <span className="num-display">{num2}</span>
                    <div className="visual-aid">{emoji2.repeat(Math.min(num2, 12))}</div>
                </div>
                <div className="operator">=</div>
                <div className="question-mark">?</div>
            </div>

            {showHint && (
                <div className="math-hint">
                    💡 Count all the emojis together!
                    <div className="hint-emojis">
                        {emoji1.repeat(Math.min(num1, 12))}{' '}
                        {operator === '-' ? '' : emoji2.repeat(Math.min(num2, 12))}
                    </div>
                </div>
            )}

            <button className="hint-btn" onClick={() => { setShowHint(h => !h); speak('Here is a hint!'); }}>
                {showHint ? '🙈 Hide Hint' : '💡 Show Hint'}
            </button>

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

            {message && <div className={`message ${correctBtn !== null ? 'success' : ''}`}>{message}</div>}
        </div>
    );
};

export default MathGame;
