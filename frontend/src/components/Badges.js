import React from 'react';
import './Badges.css';

function Badges({ user }) {
    const plan = user.plan;

    return (
        <div className="badges-container">
            <h3>Plano Atual</h3>
            <span className={`badge badge-${plan.toLowerCase()}`}>
                {plan}
            </span>
        </div>
    );
}

export default Badges;