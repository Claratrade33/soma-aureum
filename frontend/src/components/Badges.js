import React from 'react';
import './Badges.css';

function Badges({ user }) {
    return (
        <div className="badges-container">
            <div className="badge">Badge do plano: <span>{user.plan}</span></div>
        </div>
    );
}

export default Badges;