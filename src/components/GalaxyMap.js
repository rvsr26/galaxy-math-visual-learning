import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
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
            ? `0 0 30px ${planet.color}40, inset -15px -15px 30px rgba(0,0,0,0.7), inset 10px 10px 20px rgba(255,255,255,0.1)`
            : 'inset -5px -5px 15px rgba(0,0,0,0.9)';

        let background = '';
        let texture = '';

        switch (planet.style) {
            case 'sun':
                background = `radial-gradient(circle at 35% 35%, #fff9e6 0%, #ffcc00 20%, #ff6600 50%, #993300 100%)`;
                texture = `radial-gradient(circle at 50% 50%, transparent 40%, rgba(255,255,255,0.1) 41%, transparent 45%),
                           repeating-conic-gradient(from 0deg, transparent 0deg, rgba(255,100,0,0.1) 10deg, transparent 20deg)`;
                break;
            case 'terran':
                background = `radial-gradient(circle at 30% 30%, #4ae3b5, #10b981, #064e3b)`;
                texture = `radial-gradient(circle at 20% 40%, #ffffff30 0%, transparent 40%),
                           radial-gradient(circle at 70% 60%, #ffffff20 0%, transparent 30%)`; // Simulating clouds
                break;
            case 'gas-giant':
                background = `linear-gradient(165deg, #1e1b4b 0%, ${planet.color} 40%, #1e1b4b 50%, ${planet.color} 60%, #1e1b4b 100%)`;
                texture = `repeating-linear-gradient(transparent, transparent 5px, rgba(0,0,0,0.2) 6px, rgba(0,0,0,0.2) 10px)`;
                break;
            case 'lava':
                background = `radial-gradient(circle at 30% 40%, #fca5a5, #dc2626, #450a0a)`;
                texture = `repeating-conic-gradient(from 45deg, rgba(255,255,255,0.05) 0deg, transparent 20deg),
                           radial-gradient(circle at 60% 30%, #fef08a10, transparent 20%)`; // Heat spots
                break;
            case 'ice':
                background = `radial-gradient(circle at 30% 30%, #e0f2fe, #38bdf8, #075985)`;
                texture = `linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)`;
                break;
            case 'crater':
                background = `radial-gradient(circle at 30% 30%, #e5e7eb, #9ca3af, #374151)`;
                texture = `radial-gradient(circle at 60% 40%, rgba(0,0,0,0.3) 10%, transparent 12%),
                           radial-gradient(circle at 30% 70%, rgba(0,0,0,0.2) 8%, transparent 10%),
                           radial-gradient(circle at 75% 80%, rgba(0,0,0,0.2) 12%, transparent 14%)`;
                break;
            case 'water':
                background = `radial-gradient(circle at 35% 35%, #99f6e4, #0d9488, #134e4a)`;
                texture = `linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.1) 45%, transparent 60%)`; // Water shimmer
                break;
            case 'alien':
                background = `radial-gradient(circle at 30% 30%, #fbcfe8, #db2777, #701a75)`;
                texture = `repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 10px, rgba(0,0,0,0.1) 11px, rgba(0,0,0,0.1) 20px)`;
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
        <motion.div
            whileHover={isUnlocked ? { scale: 1.1 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group
                ${isUnlocked ? 'z-10' : 'z-0 opacity-60'}
            `}
            style={{ left: `${planet.x}%`, top: `${planet.y}%` }}
            onClick={onClick}
        >
            <div className="relative flex items-center justify-center">
                {/* Atmosphere / Outer Glow */}
                {isUnlocked && (
                    <div
                        className="absolute inset-[-15%] rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                        style={{ backgroundColor: planet.color }}
                    />
                )}

                {/* Planet Sphere */}
                <div
                    className="rounded-full relative overflow-hidden transition-all duration-1000 group-hover:rotate-12 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                    style={getPlanetStyle()}
                >
                    {/* Interior Shimmer/Clouds Layer */}
                    <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

                    {/* Style-specific textures - added via CSS in getPlanetStyle() would be cleaner but we can add secondary overlay div */}
                    <div className="absolute inset-0 opacity-30 mix-blend-soft-light group-hover:opacity-50 transition-opacity duration-700"
                        style={{ background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent 70%)` }}
                    />
                </div>

                {/* Rings */}
                {planet.ring && (
                    <div
                        className="absolute w-[180%] h-[35%] rounded-[50%] border-[8px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-12 pointer-events-none transition-all duration-700 group-hover:rotate-0"
                        style={{
                            borderColor: isUnlocked ? `${planet.color}40` : '#ffffff10',
                            borderTopColor: isUnlocked ? '#ffffff80' : '#ffffff20',
                            boxShadow: isUnlocked ? `0 0 20px ${planet.color}30` : 'none',
                            transform: `translate(-50%, -50%) rotate(${isUnlocked ? '-12deg' : '0deg'}) skew(20deg)`
                        }}
                    >
                        {/* Ring Internal Glow */}
                        <div className="absolute inset-0 border border-white/10 rounded-full blur-sm" />
                    </div>
                )}

                {/* Lock Icon */}
                {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="bg-slate-950/40 backdrop-blur-md p-2 rounded-full border border-white/10">
                            <span className="text-xl filter drop-shadow-lg">🔒</span>
                        </div>
                    </div>
                )}

                {/* Next Level Indicator */}
                {isNext && (
                    <motion.div
                        initial={{ y: 0 }}
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-12 z-20"
                    >
                        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-1.5 rounded-full font-black text-[10px] shadow-xl flex items-center gap-2 border border-white/20 whitespace-nowrap uppercase tracking-tighter">
                            <span>🚀 Mission Ready</span>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-600 rotate-45 transform"></div>
                        </div>
                    </motion.div>
                )}

                {/* LABEL: Clean, always-visible labels */}
                <div className="absolute top-[120%] opacity-90 z-20 transition-all duration-500 group-hover:scale-110">
                    <div className="px-3 py-1 rounded-lg bg-slate-900/60 backdrop-blur-md text-white text-[9px] font-black tracking-[0.2em] shadow-2xl border border-white/10 whitespace-nowrap uppercase flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: planet.color }}></span>
                        {planet.name}
                    </div>
                </div>
            </div>
        </motion.div>
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
        <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden mt-16" style={{ backgroundColor: 'var(--bg-main)' }} ref={mapRef}>

            {/* 1. Deep Space Background */}
            <div className="absolute inset-0" style={{ background: 'var(--bg-main)' }}></div>

            {/* 2. Stars: Extremely minimal density */}
            <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white opacity-20"
                        style={{
                            width: '1.5px',
                            height: '1.5px',
                            top: `${(i * 13) % 100}%`,
                            left: `${(i * 17) % 100}%`,
                        }}
                    ></div>
                ))}
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
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 100 100" preserveAspectRatio="none">
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
                        d="M20 20 L80 20 C95 20 95 50 80 50 L20 50 C5 50 5 80 20 80 L80 80"
                        fill="none"
                        stroke="url(#pathGradient)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-20"
                        vectorEffect="non-scaling-stroke"
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
