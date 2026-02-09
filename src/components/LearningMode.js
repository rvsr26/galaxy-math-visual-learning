
import React, { useState } from 'react';
import './LearningMode.css';

const LearningMode = ({ onBack }) => {
    const [activeCard, setActiveCard] = useState(1);

    const learningData = [
        { num: 1, text: "One", items: ["🍎"], color: "#FFEBEE" },
        { num: 2, text: "Two", items: ["🍎", "🍎"], color: "#E3F2FD" },
        { num: 3, text: "Three", items: ["🍎", "🍎", "🍎"], color: "#E8F5E9" },
        { num: 4, text: "Four", items: ["🍎", "🍎", "🍎", "🍎"], color: "#FFF3E0" },
        { num: 5, text: "Five", items: ["🍎", "🍎", "🍎", "🍎", "🍎"], color: "#F3E5F5" },
        { num: 6, text: "Six", items: ["🎈", "🎈", "🎈", "🎈", "🎈", "🎈"], color: "#E0F7FA" },
        { num: 7, text: "Seven", items: ["🎈", "🎈", "🎈", "🎈", "🎈", "🎈", "🎈"], color: "#FBE9E7" },
        { num: 8, text: "Eight", items: ["⭐", "⭐", "⭐", "⭐", "⭐", "⭐", "⭐", "⭐"], color: "#FFF8E1" },
        { num: 9, text: "Nine", items: ["⭐", "⭐", "⭐", "⭐", "⭐", "⭐", "⭐", "⭐", "⭐"], color: "#F1F8E9" },
        { num: 10, text: "Ten", items: ["⭐", "⭐", "⭐", "⭐", "⭐", "⭐", "⭐", "⭐", "⭐", "⭐"], color: "#E1F5FE" }
    ];

    const speak = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    };

    const handleCardClick = (data) => {
        setActiveCard(data.num);
        speak(`${data.text}. ${data.num}`);
    };

    return (
        <div className="learning-container">
            <button className="back-btn" onClick={onBack}>⬅ Back</button>
            <h2>Learn Numbers! 📚</h2>

            <div className="main-card" style={{ backgroundColor: learningData[activeCard - 1].color }}>
                <div className="number-big">{activeCard}</div>
                <div className="word-big">{learningData[activeCard - 1].text}</div>
                <div className="items-container">
                    {learningData[activeCard - 1].items.map((item, i) => (
                        <span key={i} className="learn-item" style={{ animationDelay: `${i * 0.1}s` }}>
                            {item}
                        </span>
                    ))}
                </div>
            </div>

            <div className="thumbnails-scroll">
                {learningData.map(data => (
                    <button
                        key={data.num}
                        className={`thumb-btn ${activeCard === data.num ? 'active' : ''}`}
                        onClick={() => handleCardClick(data)}
                        style={{ backgroundColor: data.color }}
                    >
                        {data.num}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LearningMode;
