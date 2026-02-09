
import React, { useState, useEffect, useRef } from 'react';
import './SequenceGame.css';

const SequenceGame = ({ difficulty, onBack }) => {
    const [sequence, setSequence] = useState([]);
    const [playerSequence, setPlayerSequence] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [message, setMessage] = useState('Watch the pattern! 👀');
    const [score, setScore] = useState(0);
    const [activeColor, setActiveColor] = useState(null);

    const colors = ['red', 'blue', 'green', 'yellow'];
    const sounds = {
        red: 261.63, // C4
        blue: 329.63, // E4
        green: 392.00, // G4
        yellow: 523.25 // C5
    };

    useEffect(() => {
        startNewGame();
        return () => stopSound();
    }, []);

    const playTone = (color) => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(sounds[color], ctx.currentTime);

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    };

    const stopSound = () => {
        // Cleanup if needed
    };

    const startNewGame = () => {
        setSequence([]);
        setPlayerSequence([]);
        setScore(0);
        setMessage('Watch carefully! 👀');
        addToSequence([]);
    };

    const addToSequence = (currentSeq) => {
        const nextColor = colors[Math.floor(Math.random() * colors.length)];
        const newSeq = [...currentSeq, nextColor];
        setSequence(newSeq);
        setPlayerSequence([]);
        setIsPlaying(false); // Player cannot click while showing sequence

        // Play sequence
        let i = 0;
        const interval = setInterval(() => {
            if (i >= newSeq.length) {
                clearInterval(interval);
                setActiveColor(null);
                setIsPlaying(true); // Player turn
                setMessage('Your turn! ');
                return;
            }

            const color = newSeq[i];
            setActiveColor(color);
            playTone(color);

            setTimeout(() => {
                setActiveColor(null);
            }, 600);

            i++;
        }, 1000);
    };

    const handleColorClick = (color) => {
        if (!isPlaying) return;

        playTone(color);
        setActiveColor(color);
        setTimeout(() => setActiveColor(null), 300);

        const newPlayerSeq = [...playerSequence, color];
        setPlayerSequence(newPlayerSeq);

        // Check if correct so far
        if (newPlayerSeq[newPlayerSeq.length - 1] !== sequence[newPlayerSeq.length - 1]) {
            setMessage('Game Over! Try again! 🤕');
            setIsPlaying(false);
            setTimeout(startNewGame, 2000);
            return;
        }

        // Check if completed sequence
        if (newPlayerSeq.length === sequence.length) {
            setMessage('Good job! Next level! 🎉');
            setScore(score + 10);
            setIsPlaying(false);
            setTimeout(() => addToSequence(sequence), 1500);
        }
    };

    return (
        <div className="game-container">
            <button className="back-btn" onClick={onBack}>⬅ Back</button>
            <h2>Simon Says 🧠</h2>
            <div className="score-board">Score: {score}</div>
            <div className="message">{message}</div>

            <div className="simon-board">
                {colors.map(color => (
                    <div
                        key={color}
                        className={`simon-btn ${color} ${activeColor === color ? 'active' : ''}`}
                        onClick={() => handleColorClick(color)}
                    />
                ))}
            </div>
        </div>
    );
};

export default SequenceGame;
