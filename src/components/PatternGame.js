
import React, { useState, useEffect } from 'react';
import './PatternGame.css';

const PatternGame = ({ difficulty, onBack }) => {
    const [sequence, setSequence] = useState([]);
    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState('');
    const [score, setScore] = useState(0);

    const shapes = ['🔴', '🔵', '🟢', '🟡', '🔺', '⬛'];

    useEffect(() => {
        generatePattern();
    }, [difficulty]);

    const generatePattern = () => {
        let patternLength = 4;
        let type = 'AB'; // AB, ABC, AABB
        if (difficulty === 'medium') type = 'ABC';
        if (difficulty === 'hard') type = 'AABB';

        const s1 = shapes[Math.floor(Math.random() * shapes.length)];
        const s2 = shapes[Math.floor(Math.random() * shapes.length)];
        const s3 = shapes[Math.floor(Math.random() * shapes.length)];

        let fullPattern = [];
        if (type === 'AB') {
            fullPattern = [s1, s2, s1, s2, s1];
        } else if (type === 'ABC') {
            fullPattern = [s1, s2, s3, s1, s2, s3, s1];
        } else {
            fullPattern = [s1, s1, s2, s2, s1, s1];
        }

        const visible = fullPattern.slice(0, fullPattern.length - 1);
        const answer = fullPattern[fullPattern.length - 1];

        setSequence({ visible, answer });
        setOptions(shapes.sort(() => 0.5 - Math.random()).slice(0, 3));
        if (!options.includes(answer)) {
            // Ensure answer is in options
            const newOptions = [answer, ...shapes.filter(s => s !== answer).slice(0, 2)];
            setOptions(newOptions.sort(() => 0.5 - Math.random()));
        }
        setMessage('');
    };

    const checkAnswer = (selected) => {
        if (selected === sequence.answer) {
            setMessage('Correct! Good eye! 👀');
            setScore(score + 1);
            setTimeout(generatePattern, 1500);
        } else {
            setMessage('Try again! Look closely! 🔍');
        }
    };

    return (
        <div className="game-container">
            <button className="back-btn" onClick={onBack}>⬅ Back</button>
            <h2>Complete the Pattern! 🎨</h2>
            <div className="score-board">Score: {score}</div>

            <div className="pattern-display">
                {sequence.visible && sequence.visible.map((item, i) => (
                    <div key={i} className="pattern-item">{item}</div>
                ))}
                <div className="pattern-item question">?</div>
            </div>

            <div className="options-container">
                {options.map((opt, i) => (
                    <button key={i} className="option-btn" onClick={() => checkAnswer(opt)}>
                        {opt}
                    </button>
                ))}
            </div>

            {message && <div className="message">{message}</div>}
        </div>
    );
};

export default PatternGame;
