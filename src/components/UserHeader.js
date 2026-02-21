import React from 'react';
import './UserHeader.css';

const UserHeader = ({ username, streak, onLogout }) => {
    return (
        <div className="user-header">
            <div className="user-info">
                <span className="user-avatar">👤</span>
                <span className="user-name">{username}</span>
            </div>
            <div className="streak-badge" title="Day Streak">
                🔥 <span>{streak}</span> day streak
            </div>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
    );
};

export default UserHeader;
