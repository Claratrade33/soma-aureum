import React from 'react';
import '../styles/Badges.css';

function Badges({ user }) {
    return (
        <div className="badges-container">
            <div className="badge">
                Badge atual: <span>{user.plan}</span>
            </div>
        </div>
    );
}

export default Badges;