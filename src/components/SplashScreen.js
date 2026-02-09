
import React, { useState, useEffect } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onComplete }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading or just show animation
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="splash-screen">
            <div className="logo-container">
                <div className="logo-icon"></div>
                <h1 className="logo-text">Galaxy Math</h1>
                <p className="logo-sub">Visual Learning Adventure</p>
            </div>

            {!loading && (
                <>
                    <div className="about-project">
                        <h2>✨ About The Project</h2>
                        <p className="mission-text">
                            A specialized visual learning tool designed to empower children with autism.
                            Through engaging colors, interactive elements, and gamified math concepts,
                            we bridge the gap between abstract numbers and concrete understanding.
                        </p>
                        <div className="features-grid">
                            <div className="feature-item">
                                <span className="f-icon">🎮</span>
                                <span>Interactive Learning</span>
                            </div>
                            <div className="feature-item">
                                <span className="f-icon">🌈</span>
                                <span>Autism Friendly</span>
                            </div>
                            <div className="feature-item">
                                <span className="f-icon">🧠</span>
                                <span>Cognitive Growth</span>
                            </div>
                        </div>
                    </div>

                    <button className="start-btn" onClick={onComplete}>
                        Let's Play!
                    </button>
                </>
            )}

            {loading && <div className="loader"></div>}
        </div>
    );
};

export default SplashScreen;
