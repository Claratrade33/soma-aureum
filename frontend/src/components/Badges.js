import React from 'react';
import './Badges.css';

function Badges({ user }) {
    const { plan } = user;

    return (
        <div className="badges-container">
            <div className="badge">
                {plan} <span>🏅</span>
            </div>
        </div>
    );
}

export default Badges;