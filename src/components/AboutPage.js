import React from 'react';
import './AboutPage.css';
import studentPhoto from './image.png';

const AboutPage = ({ onBack }) => {
    return (
        <div className="about-container">
            <div className="about-topbar">
                <button className="about-back-btn" onClick={onBack}>⬅ Back</button>
            </div>

            {/* Hero Banner */}
            <div className="about-hero">
                <div className="about-hero-badge">Lab Project · 2025</div>
                <h1 className="about-title">Visual Math Learning Portal</h1>
                <p className="about-subtitle">
                    A gamified learning platform designed to help children with autism master
                    basic mathematical concepts through visual aids and interactive exercises.
                </p>
            </div>

            {/* Main Content */}
            <div className="about-main">

                {/* Left — Student Profile Card */}
                <div className="about-profile-card">
                    <div className="about-avatar">
                        <img src={studentPhoto} alt="R. Vishnu Sathwick" className="about-avatar-img" />
                    </div>
                    <div className="about-profile-info">
                        <h2 className="about-profile-name">R. Vishnu Sathwick</h2>
                        <p className="about-profile-roll">CB.SC.U4CSE23644</p>
                        <div className="about-profile-tags">
                            <span className="about-tag">Full Stack Dev</span>
                            <span className="about-tag">React</span>
                            <span className="about-tag">Node.js</span>
                        </div>
                        <div className="about-profile-links">
                            <a href="https://github.com/rvsr26/galaxy-math-visual-learning" target="_blank" rel="noreferrer" className="about-link-btn">
                                📁 GitHub
                            </a>
                            <a href="https://galaxy-math-visual-learning.vercel.app/" target="_blank" rel="noreferrer" className="about-link-btn">
                                🚀 Live Demo
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right — Info Grid */}
                <div className="about-info-grid">

                    <div className="about-info-card">
                        <div className="about-info-icon">📚</div>
                        <div>
                            <h3>Course Details</h3>
                            <p><span className="label">Course</span>Full Stack Frameworks</p>
                            <p><span className="label">Code</span>23CSE461</p>
                            <p><span className="label">Faculty</span>Dr. T. Senthil Kumar</p>
                            <p><span className="label">Semester</span>6th Semester, 2025</p>
                        </div>
                    </div>

                    <div className="about-info-card">
                        <div className="about-info-icon">🎮</div>
                        <div>
                            <h3>Games Available</h3>
                            <ul className="about-game-list">
                                <li>🍎 Counting Game</li>
                                <li>➕ Math Fun</li>
                                <li>🎨 Pattern Recognition</li>
                                <li>🧠 Memory Match</li>
                                <li>📚 Learning Mode</li>
                            </ul>
                        </div>
                    </div>

                    <div className="about-info-card">
                        <div className="about-info-icon">🛠️</div>
                        <div>
                            <h3>Tech Stack</h3>
                            <ul className="about-game-list">
                                <li>⚛️ React.js (Frontend)</li>
                                <li>🟢 Node.js + Express (Backend)</li>
                                <li>🍃 MongoDB (Database)</li>
                                <li>🔐 JWT Authentication</li>
                                <li>🎵 Web Audio API</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            {/* Footer Strip */}
            <div className="about-footer-strip">
                <span>© 2025 Visual Math Learning Portal · Amrita School of Computing</span>
            </div>
        </div>
    );
};

export default AboutPage;
