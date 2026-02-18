import React, { useState, useEffect } from 'react';
import './SplashScreen.css';

const FEATURES = [
    { icon: '🪐', title: 'Counting Game', desc: 'Tap & count planets and stars' },
    { icon: '➕', title: 'Math Fun', desc: 'Add, subtract & multiply visually' },
    { icon: '🎨', title: 'Patterns', desc: 'Spot & complete sequences' },
    { icon: '🧠', title: 'Memory Match', desc: 'Flip cards and find pairs' },
    { icon: '📚', title: 'Learn Numbers', desc: 'Explore numbers with space facts' },
];

const STATS = [
    { value: '5', label: 'Fun Games' },
    { value: '3', label: 'Difficulty Levels' },
    { value: '🏆', label: 'Leaderboard' },
    { value: '🔥', label: 'Streak Tracker' },
];

const SplashScreen = ({ onComplete }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Trigger entrance animations
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="landing-page">
            {/* Floating background orbs */}
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />

            {/* ── HERO ── */}
            <section className={`hero-section ${visible ? 'visible' : ''}`}>
                <div className="hero-badge">🌟 Visual Learning for Every Child</div>
                <div className="hero-logo">
                    <span className="hero-logo-icon">🚀</span>
                    <h1 className="hero-title">Galaxy Math</h1>
                </div>
                <p className="hero-subtitle">
                    An interactive math adventure designed for children with autism —
                    learn numbers through play, color, and sound.
                </p>
                <div className="hero-cta-group">
                    <button className="cta-primary" onClick={onComplete}>
                        🎮 Start Playing
                    </button>
                    <a className="cta-secondary" href="#features">
                        Learn More ↓
                    </a>
                </div>

                {/* Stats row */}
                <div className="stats-row">
                    {STATS.map((s, i) => (
                        <div className="stat-pill" key={i}>
                            <span className="stat-value">{s.value}</span>
                            <span className="stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── FEATURES ── */}
            <section className="features-section" id="features">
                <h2 className="section-title">5 Engaging Games</h2>
                <p className="section-sub">Each game is crafted with autism-friendly design principles</p>
                <div className="features-grid">
                    {FEATURES.map((f, i) => (
                        <div
                            className="feature-card"
                            key={i}
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <div className="feature-icon">{f.icon}</div>
                            <h3 className="feature-title">{f.title}</h3>
                            <p className="feature-desc">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── WHY SECTION ── */}
            <section className="why-section">
                <div className="why-card">
                    <h2>Built for Every Learner 💜</h2>
                    <div className="why-grid">
                        <div className="why-item">
                            <span>🔊</span>
                            <div>
                                <strong>Audio Feedback</strong>
                                <p>Every action speaks aloud for auditory learners</p>
                            </div>
                        </div>
                        <div className="why-item">
                            <span>✨</span>
                            <div>
                                <strong>Visual Rewards</strong>
                                <p>Celebrations and animations on every win</p>
                            </div>
                        </div>
                        <div className="why-item">
                            <span>🎯</span>
                            <div>
                                <strong>Adaptive Difficulty</strong>
                                <p>Easy, Medium, and Hard modes for all skill levels</p>
                            </div>
                        </div>
                        <div className="why-item">
                            <span>🔥</span>
                            <div>
                                <strong>Streak Tracking</strong>
                                <p>Daily streaks keep kids motivated to return</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FINAL CTA ── */}
            <section className="final-cta">
                <h2>Ready to explore the galaxy? 🌌</h2>
                <p>Create a free account and start your math adventure today!</p>
                <button className="cta-primary large" onClick={onComplete}>
                    🚀 Get Started — It's Free!
                </button>
            </section>

            {/* ── FOOTER ── */}
            <footer className="landing-footer">
                <p>Galaxy Math · Visual Learning Portal · Built with 💜 for autism education</p>
            </footer>
        </div>
    );
};

export default SplashScreen;
