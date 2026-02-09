
import React, { useState, useEffect } from 'react';
import './CountingGame.css';

const CountingGame = ({ difficulty, onBack }) => {
    const [targetNumber, setTargetNumber] = useState(0);
    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState('');
    const [score, setScore] = useState(0);

    const emojis = ['🎈', '⭐', '🍎', '🐶', '🚗', '🦋'];
    const [currentEmoji, setCurrentEmoji] = useState(emojis[0]);

    useEffect(() => {
        generateNewRound();
    }, [difficulty]);

    const generateNewRound = () => {
        let max = 5;
        if (difficulty === 'medium') max = 10;
        if (difficulty === 'hard') max = 20;

        const num = Math.floor(Math.random() * max) + 1;
        setTargetNumber(num);
        setCurrentEmoji(emojis[Math.floor(Math.random() * emojis.length)]);

        // Generate options
        let opts = [num];
        while (opts.length < 3) {
            let r = Math.floor(Math.random() * max) + 1;
            if (!opts.includes(r)) opts.push(r);
        }
        setOptions(opts.sort((a, b) => a - b));
        setMessage('');
    };

    const checkAnswer = (selected) => {
        if (selected === targetNumber) {
            setMessage('Correct! Great Job! 🎉');
            setScore(score + 1);
            setTimeout(generateNewRound, 1500);
        } else {
            setMessage('Try again! You can do it! 💪');
        }
    };

    return (
        <div className="game-container">
            <button className="back-btn" onClick={onBack}>⬅ Back</button>
            <h2>Let's Count! 1️⃣2️⃣3️⃣</h2>

            <div className="score-board">Score: {score}</div>

            <div className="counting-area">
                {Array.from({ length: targetNumber }).map((_, i) => (
                    <span key={i} className="count-item" style={{ animationDelay: `${i * 0.1}s` }}>
                        {currentEmoji}
                    </span>
                ))}
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

export default CountingGame;
