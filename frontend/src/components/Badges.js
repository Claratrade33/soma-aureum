import React from 'react';
import './Badges.css'; // CSS específico para os badges

function Badges({ user }) {
    const badgeColors = {
        Bronze: '#cd7f32',
        Prata: '#c0c0c0',
        Ouro: '#ffd700',
        Platina: '#e5e4e2',
        Diamante: '#b9f2ff'
    };

    return (
        <div className="badges-container">
            <h2>Seu Badge Atual</h2>
            <div
                className="badge"
                style={{
                    backgroundColor: badgeColors[user.plan] || '#fff',
                    color: '#000'
                }}
            >
                {user.plan} 🏅
            </div>
        </div>
    );
}

export default Badges;