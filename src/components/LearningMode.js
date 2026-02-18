
import React, { useState, useCallback } from 'react';
import './LearningMode.css';
import ScoreOverlay from './ScoreOverlay';
import { useSound } from './useSound';

const FUN_FACTS = {
    1: "The Sun is 1 star at the center of our Solar System! ☀️",
    2: "Earth has 2 poles — North and South! 🌍",
    3: "Mars has 3 volcanoes taller than Everest! 🚀",
    4: "Jupiter has 4 large moons called the Galilean moons! 🪐",
    5: "Saturn has rings made of 5 types of ice and rock! 🪐",
    6: "A comet's tail can be 6 million km long! 💫",
    7: "There are 7 colors in a rainbow seen from space! 🌈",
    8: "Light takes 8 minutes to travel from the Sun to Earth! ☀️",
    9: "Saturn has 9 main ring groups! 🪐",
    10: "Our Solar System has 10 known dwarf planets! 🌌",
};

const LEARNING_DATA = [
    { num: 1, text: "One", items: ["☀️"], emoji: "☀️" },
    { num: 2, text: "Two", items: ["🌍", "🌙"], emoji: "🌙" },
    { num: 3, text: "Three", items: ["🪐", "⭐", "🚀"], emoji: "🚀" },
    { num: 4, text: "Four", items: ["🌟", "🌟", "🌟", "🌟"], emoji: "🌟" },
    { num: 5, text: "Five", items: ["🪐", "🪐", "🪐", "🪐", "🪐"], emoji: "🪐" },
    { num: 6, text: "Six", items: ["⭐", "⭐", "⭐", "⭐", "⭐", "⭐"], emoji: "⭐" },
    { num: 7, text: "Seven", items: ["💫", "💫", "💫", "💫", "💫", "💫", "💫"], emoji: "💫" },
    { num: 8, text: "Eight", items: ["🛸", "🛸", "🛸", "🛸", "🛸", "🛸", "🛸", "🛸"], emoji: "🛸" },
    { num: 9, text: "Nine", items: ["🌌", "🌌", "🌌", "🌌", "🌌", "🌌", "🌌", "🌌", "🌌"], emoji: "🌌" },
    { num: 10, text: "Ten", items: ["🚀", "🚀", "🚀", "🚀", "🚀", "🚀", "🚀", "🚀", "🚀", "🚀"], emoji: "🚀" },
];

const LearningMode = ({ onBack }) => {
    const [activeNum, setActiveNum] = useState(1);
    const [soundOn, setSoundOn] = useState(true);
    const [itemSpoken, setItemSpoken] = useState(null);
    const [showScore, setShowScore] = useState(false);
    const { speak } = useSound(soundOn);

    const current = LEARNING_DATA[activeNum - 1];

    const handleCardSelect = useCallback((data) => {
        setActiveNum(data.num);
        setItemSpoken(null);
        speak(`${data.num}. ${data.text}`);
    }, [speak]);

    const handleSpeakNumber = () => {
        speak(`${current.num}. ${current.text}. ${FUN_FACTS[current.num]}`);
    };

    const handleItemClick = (item, index) => {
        setItemSpoken(index);
        speak(`${index + 1}`);
        setTimeout(() => setItemSpoken(null), 800);
    };

    return (
        <div className="game-container">
            {showScore && (
                <ScoreOverlay
                    score="Learning"
                    onRestart={() => { setShowScore(false); setActiveNum(1); }}
                    onHome={onBack}
                />
            )}
            <div className="game-topbar">
                <div className="game-controls-left">
                    <button className="back-btn" onClick={onBack}>⬅ Back</button>
                    <button className="end-game-btn" onClick={() => setShowScore(true)}>❌ End Session</button>
                </div>
                <h2 className="learning-title">Learn Numbers! 📚</h2>
                <button className="sound-toggle" onClick={() => setSoundOn(s => !s)}>{soundOn ? '🔊' : '🔇'}</button>
            </div>

            <div className="main-card">
                <div className="number-big">{current.num}</div>
                <div className="word-big">{current.text}</div>

                <div className="items-container">
                    {current.items.map((item, i) => (
                        <button
                            key={i}
                            className={`learn-item-btn ${itemSpoken === i ? 'spoken' : ''}`}
                            onClick={() => handleItemClick(item, i)}
                            style={{ animationDelay: `${i * 0.08}s` }}
                            aria-label={`Item ${i + 1}`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <button className="speak-btn" onClick={handleSpeakNumber}>
                    🔊 Hear it!
                </button>
            </div>

            <div className="fun-fact-box">
                💡 {FUN_FACTS[current.num]}
            </div>

            <div className="thumbnails-scroll">
                {LEARNING_DATA.map(data => (
                    <button
                        key={data.num}
                        className={`thumb-btn ${activeNum === data.num ? 'active' : ''}`}
                        onClick={() => handleCardSelect(data)}
                        aria-label={`Number ${data.num}`}
                    >
                        {data.num}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LearningMode;
