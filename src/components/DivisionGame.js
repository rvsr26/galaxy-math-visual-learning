import React, { useState, useEffect, useCallback } from 'react';
import CelebrationOverlay from './CelebrationOverlay';
import ScoreOverlay from './ScoreOverlay';
import { useSound } from './useSound';

const MONSTERS = ['👹', '👾', '🤖', '👽'];

const DivisionGame = ({ difficulty, onBack, onScoreSave, settings }) => {
    const [cookies, setCookies] = useState([]);
    const [monsters, setMonsters] = useState([]);
    const [draggedCookie, setDraggedCookie] = useState(null);
    const [score, setScore] = useState(0);
    const [showCelebration, setShowCelebration] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [message, setMessage] = useState('');
    const [soundOn, setSoundOn] = useState(true);
    const { playCorrect, playWrong, speak, isMilestone } = useSound(soundOn);
    const [selectedCookie, setSelectedCookie] = useState(null);

    const generateProblem = useCallback(() => {
        let numMonsters = 2;
        let maxTotal = 10;

        if (difficulty === 'medium') { numMonsters = Math.random() > 0.5 ? 2 : 3; maxTotal = 20; }
        if (difficulty === 'hard') { numMonsters = Math.floor(Math.random() * 2) + 3; maxTotal = 30; }

        const perMonster = Math.floor(Math.random() * (maxTotal / numMonsters)) + 1;
        const totalCookies = perMonster * numMonsters;

        const newCookies = Array.from({ length: totalCookies }, (_, i) => ({ id: i, status: 'jar' }));

        const selectedMonsters = MONSTERS.sort(() => 0.5 - Math.random()).slice(0, numMonsters).map((emoji, idx) => ({
            id: idx,
            emoji: emoji,
            cookies: []
        }));

        setCookies(newCookies);
        setMonsters(selectedMonsters);
        setMessage(`Share ${totalCookies} cookies equally between ${numMonsters} monsters!`);
        speak(`Share ${totalCookies} cookies equally between ${numMonsters} monsters!`);

    }, [difficulty, speak]);

    useEffect(() => {
        generateProblem();
    }, [difficulty, generateProblem]);

    const handleDragStart = (e, cookieId) => {
        setDraggedCookie(cookieId);
    };

    const handleDrop = (e, monsterId) => {
        e.preventDefault();
        if (draggedCookie !== null) {
            giveCookieToMonster(draggedCookie, monsterId);
            setDraggedCookie(null);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleCookieClick = (cookieId) => {
        if (selectedCookie === cookieId) setSelectedCookie(null);
        else setSelectedCookie(cookieId);
    };

    const handleMonsterClick = (monsterId) => {
        if (selectedCookie !== null) {
            giveCookieToMonster(selectedCookie, monsterId);
            setSelectedCookie(null);
        }
    };

    const giveCookieToMonster = (cookieId, monsterId) => {
        setCookies(prev => prev.map(c => c.id === cookieId ? { ...c, status: monsterId } : c));
        setMonsters(prev => prev.map(m => m.id === monsterId ? { ...m, cookies: [...m.cookies, cookieId] } : m));
        speak("Yum!");
    };

    const returnCookieToJar = (cookieId) => {
        const monster = monsters.find(m => m.cookies.includes(cookieId));
        if (monster) {
            setMonsters(prev => prev.map(m => m.id === monster.id ? { ...m, cookies: m.cookies.filter(c => c !== cookieId) } : m));
        }
        setCookies(prev => prev.map(c => c.id === cookieId ? { ...c, status: 'jar' } : c));
    };

    const checkAnswer = () => {
        const jarCookies = cookies.filter(c => c.status === 'jar');
        if (jarCookies.length > 0) {
            setMessage("Distribute all the cookies first!");
            speak("Distribute all the cookies first!");
            return;
        }

        const counts = monsters.map(m => m.cookies.length);
        const allEqual = counts.every(val => val === counts[0]);

        if (allEqual) {
            const newScore = score + 10;
            setScore(newScore);
            if (onScoreSave) onScoreSave(newScore);
            playCorrect();
            setMessage("Fair sharing! Good job! 🎉");
            speak("Fair sharing! Good job!");

            if (isMilestone(newScore / 10)) {
                setShowCelebration(true);
            } else {
                setTimeout(generateProblem, 2000);
            }
        } else {
            playWrong();
            setMessage("Not fair! Some monsters have more cookies! 🍪");
            speak("Not fair! Some monsters have more cookies!");
        }
    };

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

                <button
                    className="p-3 bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors"
                    onClick={() => setSoundOn(s => !s)}
                    title="Toggle Sound"
                >
                    {soundOn ? '🔊' : '🔇'}
                </button>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 mb-4 animate-pulse">
                Cookie Sharing 🍪
            </h2>

            <p className="text-xl text-slate-300 mb-8 text-center max-w-2xl font-medium">
                {message}
            </p>

            {/* Game Area */}
            <div className="w-full max-w-6xl flex flex-col items-center gap-8">

                {/* Cookie Jar */}
                <div className="w-full bg-slate-800/50 rounded-3xl p-6 border border-white/5 min-h-[160px]">
                    <h3 className="text-lg font-bold text-slate-400 mb-4 uppercase tracking-wider">Cookie Jar</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {cookies.filter(c => c.status === 'jar').map(cookie => (
                            <div
                                key={cookie.id}
                                className={`
                                    text-4xl cursor-grab active:cursor-grabbing transition-transform hover:scale-110
                                    ${selectedCookie === cookie.id ? 'scale-125 drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]' : ''}
                                `}
                                draggable
                                onDragStart={(e) => handleDragStart(e, cookie.id)}
                                onClick={() => handleCookieClick(cookie.id)}
                            >
                                🍪
                            </div>
                        ))}
                    </div>
                </div>

                {/* Monsters */}
                <div className="flex flex-wrap justify-center gap-8 w-full">
                    {monsters.map(monster => (
                        <div
                            key={monster.id}
                            className={`
                                flex-1 min-w-[200px] bg-slate-900/80 rounded-3xl p-6 border-2 flex flex-col items-center transition-all duration-300
                                ${selectedCookie !== null ? 'border-orange-500/50 hover:bg-orange-500/10 cursor-pointer shadow-[0_0_20px_rgba(249,115,22,0.2)]' : 'border-slate-700'}
                            `}
                            onDrop={(e) => handleDrop(e, monster.id)}
                            onDragOver={handleDragOver}
                            onClick={() => handleMonsterClick(monster.id)}
                        >
                            <div className="text-6xl mb-4 animate-bounce-slow">{monster.emoji}</div>

                            {/* Plate */}
                            <div className="w-full bg-slate-800 rounded-2xl p-4 min-h-[100px] flex flex-wrap content-start gap-2 border-inner shadow-inner">
                                {monster.cookies.map(cId => (
                                    <div
                                        key={cId}
                                        className="text-3xl cursor-pointer hover:scale-110 transition-transform"
                                        onClick={(e) => { e.stopPropagation(); returnCookieToJar(cId); }}
                                    >
                                        🍪
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 px-4 py-1 bg-slate-800 rounded-full text-sm font-bold text-slate-400">
                                Cookies: {monster.cookies.length}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    <button
                        onClick={checkAnswer}
                        className="btn-galaxy text-xl px-12 py-4 animate-pulse"
                    >
                        Check Fairness ✅
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DivisionGame;
