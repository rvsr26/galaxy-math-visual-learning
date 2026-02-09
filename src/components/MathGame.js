
import React, { useState, useEffect } from 'react';
import './MathGame.css';

const MathGame = ({ difficulty, onBack }) => {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState('');
    const [score, setScore] = useState(0);

    useEffect(() => {
        generateProblem();
    }, [difficulty]);

    const generateProblem = () => {
        let max = 5;
        if (difficulty === 'medium') max = 10;
        if (difficulty === 'hard') max = 20;

        const n1 = Math.floor(Math.random() * max) + 1;
        const n2 = Math.floor(Math.random() * max) + 1;
        setNum1(n1);
        setNum2(n2);

        const ans = n1 + n2;

        // Generate distinct options
        let opts = new Set([ans]);
        while (opts.size < 3) {
            let r = Math.floor(Math.random() * (max * 2)) + 1;
            if (r !== ans) opts.add(r);
        }
        setOptions(Array.from(opts).sort((a, b) => a - b));
        setMessage('');
    };

    const checkAnswer = (selected) => {
        if (selected === num1 + num2) {
            setMessage('Correct! You are a Math Star! ⭐');
            setScore(score + 1);
            setTimeout(generateProblem, 1500);
        } else {
            setMessage('Oops! Try again! 🤔');
        }
    };

    return (
        <div className="game-container">
            <button className="back-btn" onClick={onBack}>⬅ Back</button>
            <h2>Add the Numbers! ➕</h2>
            <div className="score-board">Score: {score}</div>

            <div className="math-problem">
                <div className="number-group">
                    <span className="num-display">{num1}</span>
                    <div className="visual-aid">{"🍎".repeat(num1)}</div>
                </div>
                <div className="operator">+</div>
                <div className="number-group">
                    <span className="num-display">{num2}</span>
                    <div className="visual-aid">{"🍎".repeat(num2)}</div>
                </div>
                <div className="operator">=</div>
                <div className="question-mark">?</div>
            </div>

            <div className="options-container">
                {options.map(opt => (
                    <button key={opt} className="option-btn" onClick={() => checkAnswer(opt)}>
                        {opt}
                    </button>
                ))}
            </div>

            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default MathGame;
