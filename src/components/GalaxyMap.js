import React, { useEffect, useRef, useState } from 'react';
import DailyMissions from './DailyMissions';

const PLANETS = [
    // ROW 1: Left to Right
    { id: 'learning', name: 'Learning', type: 'learning', x: 20, y: 20, size: 90, style: 'sun', color: '#fbbf24' },
    { id: 'counting', name: 'Counting', type: 'counting', x: 50, y: 20, size: 70, style: 'terran', color: '#4ade80' },
    { id: 'pattern', name: 'Patterns', type: 'pattern', x: 80, y: 20, size: 75, style: 'gas-giant', color: '#a78bfa', ring: true },

    // ROW 2: Right to Left
    { id: 'addition', name: 'Addition', type: 'addition', x: 80, y: 50, size: 85, style: 'lava', color: '#f87171' },
    { id: 'subtraction', name: 'Subtraction', type: 'subtraction', x: 50, y: 50, size: 75, style: 'ice', color: '#22d3ee', ring: true },
    { id: 'multiplication', name: 'Multiplication', type: 'multiplication', x: 20, y: 50, size: 95, style: 'gas-giant', color: '#e879f9', ring: true },

    // ROW 3: Left to Right
    { id: 'division', name: 'Division', type: 'division', x: 20, y: 80, size: 80, style: 'crater', color: '#fb923c' },
    { id: 'fraction', name: 'Fractions', type: 'fraction', x: 50, y: 80, size: 80, style: 'water', color: '#2dd4bf' },
    { id: 'memory', name: 'Memory', type: 'memory', x: 80, y: 80, size: 85, style: 'alien', color: '#ec4899', ring: true },
];

const Planet = ({ planet, isUnlocked, isNext, onClick }) => {
    const getPlanetStyle = () => {
        const baseShadow = isUnlocked
            ? `0 0 20px ${planet.color}80, inset -10px -10px 20px rgba(0,0,0,0.5)`
            : 'inset -5px -5px 10px rgba(0,0,0,0.8)';

        let background = '';

        switch (planet.style) {
            case 'sun':
                background = `radial-gradient(circle at 30% 30%, #fef3c7, #f59e0b, #b45309)`;
                break;
            case 'terran':
                background = `radial-gradient(circle at 30% 30%, #86efac, #22c55e, #14532d)`;
                break;
            case 'gas-giant':
                background = `radial-gradient(circle at 30% 30%, transparent 60%, rgba(0,0,0,0.4)), 
                              repeating-linear-gradient(45deg, ${planet.color}, ${planet.color} 10px, #4c1d95 20px)`;
                break;
            case 'lava':
                background = `radial-gradient(circle at 30% 30%, #fca5a5, #ef4444, #7f1d1d)`;
                break;
            case 'ice':
                background = `radial-gradient(circle at 30% 30%, #cffafe, #22d3ee, #0e7490)`;
                break;
            case 'crater':
                background = `radial-gradient(circle at 50% 50%, #fdba74 10%, transparent 10%), 
                              radial-gradient(circle at 20% 70%, #fdba74 5%, transparent 6%),
                              radial-gradient(circle at 30% 30%, #fed7aa, #f97316, #9a3412)`;
                break;
            case 'water':
                background = `radial-gradient(circle at 30% 30%, #99f6e4, #14b8a6, #0f766e)`;
                break;
            case 'alien':
                background = `radial-gradient(circle at 30% 30%, #fbcfe8, #db2777, #831843)`;
                break;
            default:
                background = `radial-gradient(circle at 30% 30%, #fff, ${planet.color}, #000)`;
        }

        return {
            width: planet.size,
            height: planet.size,
            background: background,
            boxShadow: baseShadow,
            filter: isUnlocked ? 'none' : 'grayscale(100%) contrast(0.8) brightness(0.6)',
        };
    };

    return (
        <div
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-all duration-500
                ${isUnlocked ? 'hover:scale-110 z-10' : 'z-0 opacity-80'}
            `}
            style={{ left: `${planet.x}%`, top: `${planet.y}%` }}
            onClick={onClick}
        >
            <div className="relative flex items-center justify-center">
                {/* Planet Sphere */}
                <div
                    className="rounded-full relative transition-transform duration-700 hover:rotate-6"
                    style={getPlanetStyle()}
                >
                    <div className="absolute inset-0 rounded-full opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                </div>

                {/* Rings */}
                {planet.ring && (
                    <div
                        className="absolute w-[160%] h-[40%] rounded-[50%] border-[6px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-12 pointer-events-none"
                        style={{
                            borderColor: isUnlocked ? '#ffffff40' : '#ffffff10',
                            borderTopColor: isUnlocked ? '#ffffff90' : '#ffffff20',
                            boxShadow: isUnlocked ? '0 0 10px rgba(255,255,255,0.2)' : 'none'
                        }}
                    ></div>
                )}

                {/* Lock Icon */}
                {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl filter drop-shadow-lg">🔒</span>
                    </div>
                )}

                {/* Next Level Indicator */}
                {isNext && (
                    <div className="absolute -top-10 animate-bounce z-20">
                        <div className="bg-white text-slate-900 px-3 py-1 rounded-xl font-bold text-sm shadow-xl flex items-center gap-1 border border-yellow-400 whitespace-nowrap">
                            🚀 Start Here!
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 transform"></div>
                        </div>
                    </div>
                )}

                {/* LABEL: Always visible below planet, improved readability */}
                <div className={`absolute top-[110%] transition-all duration-300 transform z-20 opacity-100`}>
                    <div className={`
                        px-3 py-1 rounded-full text-white font-bold whitespace-nowrap text-sm shadow-lg border border-white/10
                        ${isUnlocked ? 'bg-slate-900/60 backdrop-blur-sm' : 'bg-slate-800/80 text-slate-400'}
                    `}>
                        {planet.name}
                    </div>
                </div>
            </div>
        </div>
    );
};

const GalaxyMap = ({ unlockedPlanets, onSelectLevel, user, coins, onClaimReward }) => {
    const mapRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden mt-16 bg-[#020617]" ref={mapRef}>

            {/* 1. Deep Space Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e1b4b_0%,_#020617_100%)]"></div>

            {/* 2. Stars */}
            <div className="absolute inset-0 opacity-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-soft-light"></div>
            {Array.from({ length: 50 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-white animate-pulse"
                    style={{
                        width: Math.random() * 2 + 1 + 'px',
                        height: Math.random() * 2 + 1 + 'px',
                        top: Math.random() * 100 + '%',
                        left: Math.random() * 100 + '%',
                        animationDuration: Math.random() * 3 + 2 + 's',
                        opacity: Math.random()
                    }}
                ></div>
            ))}

            {/* Lab 2 Header Overlay */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none">
                <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-2 backdrop-blur-md">
                    Lab 2 System
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] tracking-wide">
                    GALAXY <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">MATH</span>
                </h1>
            </div>

            <div className="absolute top-4 left-4 z-20">
                <DailyMissions user={user} coins={coins} onClaimReward={onClaimReward} />
            </div>

            {/* Parallax Layer */}
            <div
                className="absolute inset-0 w-full h-full transition-transform duration-100 ease-out"
                style={{
                    transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`
                }}
            >
                {/* Connecting Path: Snake/Z-Pattern */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                    <defs>
                        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="50%" stopColor="#818cf8" />
                            <stop offset="100%" stopColor="#c084fc" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <path
                        d="M20% 20% L80% 20% C95% 20% 95% 50% 80% 50% L20% 50% C5% 50% 5% 80% 20% 80% L80% 80%"
                        fill="none"
                        stroke="url(#pathGradient)"
                        strokeWidth="3"
                        strokeDasharray="10,10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glow)"
                        className="animate-pulse"
                    />
                </svg>

                {/* Planets */}
                {PLANETS.map((planet, index) => {
                    const isUnlocked = unlockedPlanets.includes(planet.id) || index === 0;
                    const isNext = !isUnlocked && (index === 0 || unlockedPlanets.includes(PLANETS[index - 1].id));

                    return (
                        <Planet
                            key={planet.id}
                            planet={planet}
                            isUnlocked={isUnlocked}
                            isNext={isNext}
                            onClick={() => isUnlocked && onSelectLevel(planet.type)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default GalaxyMap;
