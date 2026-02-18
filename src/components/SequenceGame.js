import React, { useState, useEffect, useRef, useCallback } from 'react';
import './SequenceGame.css';
import CelebrationOverlay from './CelebrationOverlay';
import { useSound } from './useSound';

const COLORS = ['red', 'blue', 'green', 'yellow'];
const COLOR_FREQS = { red: 261.63, blue: 329.63, green: 392.00, yellow: 523.25 };

const SequenceGame = ({ difficulty, onBack, onScoreSave }) => {
    const [sequence, setSequence] = useState([]);
    const [playerSequence, setPlayerSequence] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [message, setMessage] = useState('Watch the pattern! 👀');
    const [score, setScore] = useState(0);
    const [activeColor, setActiveColor] = useState(null);
    const [mistakes, setMistakes] = useState(0);
    const [canReplay, setCanReplay] = useState(false);
    const [hasReplayed, setHasReplayed] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const [soundOn, setSoundOn] = useState(true);
    const { speak, isMilestone } = useSound(soundOn);
    const audioCtxRef = useRef(null);

    const maxMistakes = difficulty === 'easy' ? 1 : 0;
    const stepDelay = difficulty === 'easy' ? 1200 : difficulty === 'medium' ? 1000 : 800;

    useEffect(() => { startNewGame(); }, []);

    const playTone = useCallback((color) => {
        if (!soundOn) return;
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        if (!audioCtxRef.current) audioCtxRef.current = new AC();
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(COLOR_FREQS[color], ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    }, [soundOn]);

    const startNewGame = () => {
        setSequence([]);
        setPlayerSequence([]);
        setScore(0);
        setMistakes(0);
        setMessage('Watch carefully! 👀');
        setCanReplay(false);
        setHasReplayed(false);
        addToSequence([]);
    };

    const playSequence = useCallback((seq) => {
        setIsPlaying(false);
        setPlayerSequence([]);
        let i = 0;
        const interval = setInterval(() => {
            if (i >= seq.length) {
                clearInterval(interval);
                setActiveColor(null);
                setIsPlaying(true);
                setCanReplay(true);
                setHasReplayed(false);
                setMessage(`Your turn! (${seq.length} steps)`);
                speak(`Your turn! ${seq.length} steps`);
                return;
            }
            const color = seq[i];
            setActiveColor(color);
            playTone(color);
            setTimeout(() => setActiveColor(null), stepDelay * 0.55);
            i++;
        }, stepDelay);
    }, [playTone, stepDelay, speak]);

    const addToSequence = useCallback((currentSeq) => {
        const nextColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        const newSeq = [...currentSeq, nextColor];
        setSequence(newSeq);
        setMessage(`Watch! ${newSeq.length} step${newSeq.length > 1 ? 's' : ''}... 👀`);
        speak(`Watch! ${newSeq.length} steps`);
        setTimeout(() => playSequence(newSeq), 800);
    }, [playSequence, speak]);

    const handleReplay = () => {
        if (!canReplay || hasReplayed) return;
        setHasReplayed(true);
        setCanReplay(false);
        speak('Replaying!');
        playSequence(sequence);
    };

    const handleColorClick = (color) => {
        if (!isPlaying) return;
        playTone(color);
        setActiveColor(color);
        setTimeout(() => setActiveColor(null), 300);

        const newPlayerSeq = [...playerSequence, color];
        setPlayerSequence(newPlayerSeq);

        const step = newPlayerSeq.length - 1;
        if (newPlayerSeq[step] !== sequence[step]) {
            const newMistakes = mistakes + 1;
            if (newMistakes > maxMistakes) {
                setMessage('Game Over! Try again! 🤕');
                speak('Game over! Try again!');
                setIsPlaying(false);
                setTimeout(startNewGame, 2000);
            } else {
                setMistakes(newMistakes);
                setMessage(`Oops! ${maxMistakes - newMistakes + 1} chance left! Try again from start!`);
                speak('Oops! Try again!');
                setPlayerSequence([]);
            }
            return;
        }

        if (newPlayerSeq.length === sequence.length) {
            const newScore = score + 10;
            setMessage('Perfect! Next level! 🎉');
            speak('Perfect!');
            setScore(newScore);
            if (onScoreSave) onScoreSave(newScore);
            setIsPlaying(false);
            setMistakes(0);
            if (isMilestone(Math.floor(newScore / 10))) {
                setShowCelebration(true);
            } else {
                setTimeout(() => addToSequence(sequence), 1500);
            }
        } else {
            setMessage(`Step ${newPlayerSeq.length} of ${sequence.length} ✅`);
        }
    };

    return (
        <div className="game-container">
            {showCelebration && (
                <CelebrationOverlay score={score} onDone={() => { setShowCelebration(false); addToSequence(sequence); }} />
            )}

            <div className="game-topbar">
                <button className="back-btn" onClick={onBack}>⬅ Back</button>
                <div className="score-board">⭐ {score}</div>
                <button className="sound-toggle" onClick={() => setSoundOn(s => !s)}>{soundOn ? '🔊' : '🔇'}</button>
            </div>

            <h2>Simon Says 🧠</h2>

            <div className="simon-info">
                <div className="simon-step-indicator">
                    {isPlaying && playerSequence.length < sequence.length && (
                        <span>Step {playerSequence.length + 1} of {sequence.length}</span>
                    )}
                </div>
                <div className="message">{message}</div>
            </div>

            <div className="simon-board">
                {COLORS.map(color => (
                    <button
                        key={color}
                        className={`simon-btn ${color} ${activeColor === color ? 'active' : ''} ${!isPlaying ? 'disabled' : ''}`}
                        onClick={() => handleColorClick(color)}
                        aria-label={color}
                    />
                ))}
            </div>

            <div className="simon-controls">
                <button
                    className={`replay-btn ${(!canReplay || hasReplayed) ? 'used' : ''}`}
                    onClick={handleReplay}
                    disabled={!canReplay || hasReplayed}
                >
                    🔁 Replay Once
                </button>
                {difficulty === 'easy' && mistakes > 0 && (
                    <div className="mistake-indicator">⚠️ {maxMistakes - mistakes + 1} chance left</div>
                )}
            </div>
        </div>
    );
};

export default SequenceGame;
