
import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

const MemoryGame = ({ difficulty, onBack }) => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [score, setScore] = useState(0);

    const items = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

    useEffect(() => {
        startNewGame();
    }, [difficulty]);

    const startNewGame = (nextLevel = false) => {
        let numPairs = 4;

        // Base pairs based on difficulty
        if (difficulty === 'medium') numPairs = 6;
        if (difficulty === 'hard') numPairs = 8;

        // Increase pairs if leveling up (cap at 10)
        if (nextLevel && numPairs < 10) {
            numPairs += 2;
        }

        const gameItems = items.slice(0, numPairs);
        const deck = [...gameItems, ...gameItems]
            .sort(() => Math.random() - 0.5)
            .map((item, index) => ({ id: index, content: item }));

        setCards(deck);
        setFlipped([]);
        setMatched([]);
        if (!nextLevel) setScore(0);
    };

    const handleCardClick = (id) => {
        if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;

        const newFlipped = [...flipped, id];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            const [firstId, secondId] = newFlipped;
            if (cards[firstId].content === cards[secondId].content) {
                setMatched([...matched, firstId, secondId]);
                setScore(score + 10);
                setFlipped([]);
            } else {
                setTimeout(() => setFlipped([]), 1000);
            }
        }
    };

    return (
        <div className="game-container">
            <button className="back-btn" onClick={onBack}>⬅ Back</button>
            <h2>Memory Match 🧠</h2>
            <div className="score-board">Score: {score}</div>

            <div className={`memory-grid ${difficulty}`}>
                {cards.map(card => (
                    <div
                        key={card.id}
                        className={`memory-card ${flipped.includes(card.id) || matched.includes(card.id) ? 'flipped' : ''}`}
                        onClick={() => handleCardClick(card.id)}
                    >
                        <div className="card-inner">
                            <div className="card-front">?</div>
                            <div className="card-back">{card.content}</div>
                        </div>
                    </div>
                ))}
            </div>

            {matched.length === cards.length && cards.length > 0 && (
                <div className="completion-message">
                    <h2>🎉 You Did It! 🎉</h2>
                    <div className="btn-group">
                        <button className="restart-btn" onClick={() => startNewGame(false)}>Play Again</button>
                        <button className="next-level-btn" onClick={() => startNewGame(true)}>Next Level ➡</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemoryGame;
