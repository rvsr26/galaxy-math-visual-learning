import React, { useState, useEffect, useCallback } from 'react';
import CelebrationOverlay from './CelebrationOverlay';
import ScoreOverlay from './ScoreOverlay';
import { useSound } from './useSound';

const EMOJIS = ['🪐', '⭐', '🌍', '🌙', '☀️', '🌟', '💫', '🚀', '🛸', '🌌'];
const ENCOURAGEMENTS = [
    'Great job! 🎉', 'You did it! ⭐', 'Awesome counting! 🌟',
    'Super smart! 🧠', 'Brilliant! 💫', 'You rock! 🎸',
    'Fantastic! 🦄', 'Wow, amazing! 🚀', 'Perfect! 🏆', 'Keep it up! 💪'
];

const CountingGame = ({ difficulty, onBack, onScoreSave }) => {
    const [targetNumber, setTargetNumber] = useState(0);
    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState('');
    const [score, setScore] = useState(0);
    const [currentEmoji, setCurrentEmoji] = useState(EMOJIS[0]);
    const [tapped, setTapped] = useState(new Set());
    const [phase, setPhase] = useState('count'); // 'count' | 'answer'
    const [wrongBtn, setWrongBtn] = useState(null);
    const [correctBtn, setCorrectBtn] = useState(null);
    const [showCelebration, setShowCelebration] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [soundOn, setSoundOn] = useState(true);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = React.useRef(null);
    const { playCorrect, playWrong, playCount, speak, isMilestone } = useSound(soundOn);

    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.lang = 'en-US';
            recognitionRef.current.interimResults = false;

            recognitionRef.current.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                console.log('Voice Input:', transcript);

                const numberMatch = transcript.match(/\d+/);
                if (numberMatch) {
                    const number = parseInt(numberMatch[0]);
                    if (phase === 'answer') {
                        if (options.includes(number)) {
                            checkAnswer(number);
                            speak(`You said ${number}`);
                        } else {
                            speak(`I heard ${number}, but that is not an option.`);
                        }
                    } else {
                        speak("Finish counting first!");
                    }
                } else {
                    speak("I didn't hear a number. Try again!");
                }
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error', event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }, [options, phase, speak]);

    const toggleVoiceInput = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
        } else {
            recognitionRef.current?.start();
            setIsListening(true);
            speak("Listening...");
        }
    };

    useEffect(() => { generateNewRound(); }, [difficulty]);

    const generateNewRound = useCallback(() => {
        let max = 5;
        if (difficulty === 'medium') max = 10;
        if (difficulty === 'hard') max = 20;
        const num = Math.floor(Math.random() * max) + 1;
        setTargetNumber(num);
        setCurrentEmoji(EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);
        let opts = [num];
        while (opts.length < 3) {
            let r = Math.floor(Math.random() * max) + 1;
            if (!opts.includes(r)) opts.push(r);
        }
        setOptions(opts.sort((a, b) => a - b));
        setTapped(new Set());
        setPhase('count');
        setMessage('👆 Tap each one to count!');
        setWrongBtn(null);
        setCorrectBtn(null);
    }, [difficulty]);

    const handleTap = (index) => {
        if (tapped.has(index)) return;
        const newTapped = new Set(tapped);
        newTapped.add(index);
        setTapped(newTapped);
        const count = newTapped.size;
        playCount(count);
        speak(String(count));
        if (count === targetNumber) {
            setTimeout(() => {
                setPhase('answer');
                setMessage('How many did you count?');
                speak('How many did you count?');
            }, 400);
        }
    };

    const checkAnswer = (selected) => {
        if (selected === targetNumber) {
            const newScore = score + 1;
            playCorrect();
            setCorrectBtn(selected);
            const msg = ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
            setMessage(msg);
            speak(msg);
            setScore(newScore);
            if (onScoreSave) onScoreSave(newScore);
            if (isMilestone(newScore)) {
                setShowCelebration(true);
            } else {
                setTimeout(generateNewRound, 1600);
            }
        } else {
            playWrong();
            setWrongBtn(selected);
            setMessage('Try again! Count the items! 🔍');
            speak('Try again!');
            setTimeout(() => setWrongBtn(null), 700);
        }
    };

    const progress = targetNumber > 0 ? (tapped.size / targetNumber) * 100 : 0;

    return (
        <div className="min-h-screen bg-slate-950 pt-20 px-4 flex flex-col items-center">
            {showCelebration && (
                <CelebrationOverlay score={score} onDone={() => { setShowCelebration(false); generateNewRound(); }} />
            )}
            {showScore && (
                <ScoreOverlay
                    score={score}
                    onRestart={() => { setShowScore(false); generateNewRound(); setScore(0); }}
                    onHome={onBack}
                />
            )}

            {/* Top Bar */}
            <div className="w-full max-w-4xl flex items-center justify-between mb-8">
                <div className="flex gap-3">
                    <button
                        onClick={onBack}
                        className="px-4 py-2 bg-slate-800/50 hover:bg-slate-700 text-white rounded-xl font-bold border border-white/10 transition-colors"
                    >
                        ⬅ Back
                    </button>
                    <button
                        onClick={() => setShowScore(true)}
                        className="px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-xl font-bold border border-red-500/20 transition-colors"
                    >
                        ❌ End
                    </button>
                </div>

                <div className="px-6 py-2 bg-yellow-500/20 border border-yellow-500/40 rounded-full">
                    <span className="text-xl font-bold text-yellow-400">⭐ {score}</span>
                </div>

                <div className="flex gap-2">
                    <button
                        className={`p-3 rounded-xl transition-all ${isListening ? 'bg-red-500 animate-pulse text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                        onClick={toggleVoiceInput}
                        title="Voice Answer"
                        disabled={phase !== 'answer'}
                        style={{ opacity: phase === 'answer' ? 1 : 0.5 }}
                    >
                        {isListening ? '🎤' : '🎙️'}
                    </button>
                    <button
                        className="p-3 bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors"
                        onClick={() => setSoundOn(s => !s)}
                        title="Toggle Sound"
                    >
                        {soundOn ? '🔊' : '🔇'}
                    </button>
                </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500 mb-8 text-center animate-bounce-slow">
                Let's Count! 1️⃣2️⃣3️⃣
            </h2>

            {/* Progress Bar */}
            {phase === 'count' && (
                <div className="w-full max-w-md mb-8">
                    <div className="flex justify-between text-sm text-slate-400 mb-2 font-bold px-1">
                        <span>Progress</span>
                        <span>{tapped.size} / {targetNumber}</span>
                    </div>
                    <div className="h-6 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                        <div
                            className="h-full bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-500 ease-out shadow-[0_0_15px_rgba(74,222,128,0.5)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Game Area */}
            <div className="w-full max-w-5xl flex-1 flex flex-col items-center">
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12 perspective-1000">
                    {Array.from({ length: targetNumber }).map((_, i) => (
                        <button
                            key={i}
                            className={`
                                w-20 h-20 md:w-28 md:h-28 text-4xl md:text-6xl rounded-2xl flex items-center justify-center
                                transition-all duration-300 transform border-2 shadow-xl
                                ${tapped.has(i)
                                    ? 'bg-green-500/20 border-green-500 grayscale-0 scale-90 rotate-12'
                                    : 'bg-slate-800/80 border-slate-700 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-cyan-400/20'
                                }
                            `}
                            onClick={() => handleTap(i)}
                            style={{ animationDelay: `${i * 0.07}s` }}
                            aria-label={`Item ${i + 1}`}
                        >
                            <span className={tapped.has(i) ? 'animate-ping-once' : 'animate-float'}>
                                {currentEmoji}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Answer Options */}
                {phase === 'answer' && (
                    <div className="grid grid-cols-3 gap-6 animate-fade-in-up">
                        {options.map(opt => (
                            <button
                                key={opt}
                                className={`
                                    w-24 h-24 md:w-32 md:h-32 text-3xl md:text-5xl font-bold rounded-2xl border-4 transition-all duration-200 shadow-2xl
                                    ${correctBtn === opt
                                        ? 'bg-green-500 border-green-400 text-white scale-110 shadow-green-500/50'
                                        : wrongBtn === opt
                                            ? 'bg-red-500 border-red-400 text-white animate-shake'
                                            : 'bg-slate-800 border-slate-600 text-white hover:border-cyan-400 hover:bg-slate-700 hover:scale-105'
                                    }
                                `}
                                onClick={() => checkAnswer(opt)}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Message Area */}
            {message && (
                <div className={`mt-8 mb-8 text-2xl md:text-3xl font-black text-center animate-fade-in
                    ${correctBtn !== null ? 'text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]' : 'text-slate-200'}
                `}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default CountingGame;
