import React, { useEffect, useRef } from 'react';
import DailyMissions from './DailyMissions';
import './GalaxyMap.css';

const PLANETS = [
    { id: 'learning', name: 'Learning', type: 'learning', x: 20, y: 90, color: '#ffffff', limit: 0, icon: '🌑' },
    { id: 'counting', name: 'Counting', type: 'counting', x: 50, y: 77, color: '#ffffff', limit: 1, icon: '⭐' },
    { id: 'pattern', name: 'Patterns', type: 'pattern', x: 80, y: 64, color: '#ffffff', limit: 2, icon: '🌍' },
    { id: 'addition', name: 'Addition', type: 'addition', x: 50, y: 51, color: '#FFD700', limit: 3, icon: '➕' },
    { id: 'subtraction', name: 'Subtraction', type: 'subtraction', x: 20, y: 38, color: '#FF6347', limit: 4, icon: '➖' },
    { id: 'multiplication', name: 'Multiplication', type: 'multiplication', x: 50, y: 25, color: '#4682B4', limit: 5, icon: '✖️' },
    { id: 'memory', name: 'Memory', type: 'memory', x: 80, y: 12, color: '#ffffff', limit: 6, icon: '🪐' },
];

const GalaxyMap = ({ unlockedPlanets, onSelectLevel, user, coins, onClaimReward }) => {
    const mapRef = useRef(null);

    return (
        <div className="galaxy-map-container" ref={mapRef}>
            <DailyMissions user={user} coins={coins} onClaimReward={onClaimReward} />
            <div className="galaxy-background"></div>

            <svg className="galaxy-path-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Dotted path connecting planets */}
                <path
                    d="M 20 90 L 50 77 L 80 64 L 50 51 L 20 38 L 50 25 L 80 12"
                    fill="none"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="3"
                    strokeDasharray="8,8"
                    strokeLinecap="round"
                />
            </svg>

            {PLANETS.map((planet, index) => {
                const isUnlocked = unlockedPlanets.includes(planet.id) || index === 0; // First always unlocked
                const isNext = !isUnlocked && PLANETS[index - 1] && unlockedPlanets.includes(PLANETS[index - 1].id);

                return (
                    <div
                        key={planet.id}
                        className={`planet-node ${isUnlocked ? 'unlocked' : 'locked'} ${isNext ? 'next-level' : ''}`}
                        style={{ left: `${planet.x}%`, top: `${planet.y}%` }}
                        onClick={() => isUnlocked && onSelectLevel(planet.type)}
                    >
                        <div className="planet-icon" style={{ backgroundColor: isUnlocked ? (planet.color === '#ffffff' ? '#ffffff' : planet.color) : '#333' }}>
                            {isUnlocked ? planet.icon : '🔒'}
                        </div>
                        <span className="planet-label">{planet.name}</span>
                        {isUnlocked && <div className="planet-pulse"></div>}
                    </div>
                );
            })}

        </div>
    );
};

export default GalaxyMap;
