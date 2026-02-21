import React, { useState, useEffect, useCallback } from 'react';
import CelebrationOverlay from './CelebrationOverlay';
import ScoreOverlay from './ScoreOverlay';
import { useSound } from './useSound';

const MathGame = ({ difficulty, gameType, onBack, onScoreSave, settings }) => {
    const [problem, setProblem] = useState({ q: '', a: 0 });
    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState('');
    const [score, setScore] = useState(0);
    const [wrongBtn, setWrongBtn] = useState(null);
    const [correctBtn, setCorrectBtn] = useState(null);
    const [showCelebration, setShowCelebration] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [soundOn, setSoundOn] = useState(true);
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = React.useRef(null);
    const { playCorrect, playWrong, speak, isMilestone } = useSound(soundOn);

    const getSymbol = () => {
        switch (gameType) {
            case 'addition': return '+';
            case 'subtraction': return '-';
            case 'multiplication': return '×';
            default: return '+';
        }
    };

    const getTitle = () => {
        switch (gameType) {
            case 'addition': return 'Addition Adventure';
            case 'subtraction': return 'Subtraction Squad';
            case 'multiplication': return 'Multiplication Mission';
            default: return 'Math Game';
        }
    };

    const getColor = () => {
        switch (gameType) {
            case 'addition': return 'from-red-400 to-rose-600';
            case 'subtraction': return 'from-cyan-400 to-blue-600';
            case 'multiplication': return 'from-purple-400 to-fuchsia-600';
            default: return 'from-slate-700 to-slate-900';
        }
    };

    const optionsRef = React.useRef(options);
    useEffect(() => {
        optionsRef.current = options;
    }, [options]);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognitionRef.current = recognition;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            const numberMatch = transcript.match(/-?\d+/);
            if (numberMatch) {
                const number = parseInt(numberMatch[0]);
                if (optionsRef.current.includes(number)) {
                    checkAnswer(number);
                    speak(`You said ${number}`);
                } else {
                    speak(`I heard ${number}, but that is not an option.`);
                }
            } else {
                speak("I didn't hear a number. Try again!");
            }
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            setIsListening(false);
            if (event.error === 'not-allowed') {
                setMessage('❌ Microphone blocked. Please allow access!');
            }
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        return () => {
            recognition.stop();
        };
    }, [speak]);

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

    // Keyboard and Direct Input Handling
    const inputBufferRef = React.useRef('');
    const inputTimeoutRef = React.useRef(null);


    const generateProblem = useCallback(() => {
        let n1, n2, ans;
        let max = 10;
        if (difficulty === 'medium') max = 20;
        if (difficulty === 'hard') max = 50;

        if (gameType === 'addition') {
            n1 = Math.floor(Math.random() * max) + 1;
            n2 = Math.floor(Math.random() * max) + 1;
            ans = n1 + n2;
        } else if (gameType === 'subtraction') {
            n1 = Math.floor(Math.random() * max) + 1;
            n2 = Math.floor(Math.random() * n1); // Ensure positive result
            ans = n1 - n2;
        } else if (gameType === 'multiplication') {
            let mMax = difficulty === 'hard' ? 12 : (difficulty === 'medium' ? 9 : 5);
            n1 = Math.floor(Math.random() * mMax) + 1;
            n2 = Math.floor(Math.random() * mMax) + 1;
            ans = n1 * n2;
        }

        setProblem({ q: `${n1} ${getSymbol()} ${n2} = ?`, a: ans });

        let opts = [ans];
        while (opts.length < 3) {
            let offset = Math.floor(Math.random() * 5) + 1;
            let r = Math.random() > 0.5 ? ans + offset : ans - offset;
            if (r >= 0 && !opts.includes(r)) opts.push(r);
        }
        setOptions(opts.sort(() => Math.random() - 0.5));
        setMessage('Solve this!');
        setWrongBtn(null);
        setCorrectBtn(null);
    }, [difficulty, gameType]);

    useEffect(() => { generateProblem(); }, [generateProblem]);

    const checkAnswer = (selected) => {
        if (selected === problem.a) {
            const newScore = score + 1;
            setScore(newScore);
            setCorrectBtn(selected);
            setMessage('Correct! 🎉');
            playCorrect();
            speak('Correct!');
            if (onScoreSave) onScoreSave(newScore);

            if (isMilestone(newScore)) {
                setShowCelebration(true);
            } else {
                setTimeout(generateProblem, 1000);
            }
        } else {
            setWrongBtn(selected);
            setMessage('Try again! 🤔');
            playWrong();
            speak('Try again!');
            setTimeout(() => setWrongBtn(null), 700);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Option shortcuts 1, 2, 3
            if (e.key >= '1' && e.key <= '3') {
                const index = parseInt(e.key) - 1;
                if (options[index] !== undefined) {
                    checkAnswer(options[index]);
                    return;
                }
            }

            // Direct number input
            if (e.key >= '0' && e.key <= '9') {
                inputBufferRef.current += e.key;

                // Clear buffer after 1 second of inactivity
                if (inputTimeoutRef.current) clearTimeout(inputTimeoutRef.current);
                inputTimeoutRef.current = setTimeout(() => {
                    inputBufferRef.current = '';
                }, 1000);

                const typedValue = parseInt(inputBufferRef.current);
                // If it matches the answer exactly, or matches one of the options
                if (typedValue === problem.a) {
                    checkAnswer(typedValue);
                    inputBufferRef.current = '';
                } else if (options.includes(typedValue)) {
                    // Check if it's a complete number (next digit might be coming, but if it matches an option...)
                    // For single digit answers, this might be too quick. 
                    // But usually multiple choice means they pick one.
                }
            }

            // Enter to progress or restart
            if (e.key === 'Enter') {
                if (showCelebration) {
                    setShowCelebration(false);
                    generateProblem();
                } else if (showScore) {
                    setShowScore(false);
                    generateProblem();
                    setScore(0);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [options, problem.a, showCelebration, showScore, generateProblem]);

    useEffect(() => { generateProblem(); }, [generateProblem]);

    return (
        <div className="min-h-screen pt-20 px-4 flex flex-col items-center" style={{ backgroundColor: 'var(--bg-main)' }}>
            {showCelebration && (
                <CelebrationOverlay
                    score={score}
                    settings={settings}
                    onDone={() => { setShowCelebration(false); generateProblem(); }}
                />
            )}
            {showScore && (
                <ScoreOverlay
                    score={score}
                    onRestart={() => { setShowScore(false); generateProblem(); setScore(0); }}
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

            <h2 className={`text-3xl md:text-4xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r ${getColor()} animate-pulse`}>
                {getTitle()}
            </h2>

            {/* Problem Card */}
            <div className="glass-panel p-12 mb-12 transform hover:scale-105 transition-transform duration-300">
                <div className={`text-6xl md:text-8xl font-black bg-gradient-to-br ${getColor()} bg-clip-text text-transparent drop-shadow-lg`}>
                    {problem.q.replace('?', '')} <span className="text-white animate-pulse">?</span>
                </div>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-3 gap-6 animate-fade-in-up w-full max-w-2xl">
                {options.map((opt, i) => (
                    <button
                        key={i}
                        className={`
                            h-24 md:h-32 text-3xl md:text-5xl font-bold rounded-2xl border-4 transition-all duration-200 shadow-xl
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

            {/* Message Area */}
            {message && (
                <div className={`mt-12 text-2xl md:text-3xl font-black text-center animate-fade-in
                    ${correctBtn !== null ? 'text-green-400' : 'text-slate-200'}
                `}>
                    {message}
                </div>
            )}
        </div>
    );
};

export default MathGame;
