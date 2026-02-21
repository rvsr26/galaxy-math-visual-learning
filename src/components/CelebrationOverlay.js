import React, { useEffect, useState } from 'react';
import './CelebrationOverlay.css';

const STARS = 20;

const CelebrationOverlay = ({ score, onDone, settings }) => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        const style = settings?.celebrationStyle || 'standard';
        if (style === 'none') {
            const t = setTimeout(onDone, 1000);
            return () => clearTimeout(t);
        }

        const count = style === 'quiet' ? 5 : STARS;
        const generated = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 60 + 10,
            size: Math.random() * 24 + 16,
            delay: Math.random() * 0.5,
            emoji: ['⭐', '🌟', '✨', '🎉', '🎊', '💫'][Math.floor(Math.random() * 6)],
        }));
        setStars(generated);
        const t = setTimeout(onDone, 2200);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="celebration-overlay">
            {stars.map(s => (
                <span
                    key={s.id}
                    className="cel-star"
                    style={{
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        fontSize: `${s.size}px`,
                        animationDelay: `${s.delay}s`,
                    }}
                >
                    {s.emoji}
                </span>
            ))}
            <div className="cel-message">
                <div className="cel-score">🏆 {score} Points!</div>
                <div className="cel-text">Amazing job! Keep it up! 🚀</div>
            </div>
        </div>
    );
};

export default CelebrationOverlay;
