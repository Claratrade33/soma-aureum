import React from 'react';
import './Badges.css'; // Importando o CSS premium

function Badges({ user }) {
    const planColors = {
        Bronze: '#cd7f32',
        Prata: '#c0c0c0',
        Ouro: '#ffd700',
        Platina: '#e5e4e2',
        Diamante: '#b9f2ff'
    };

    return (
        <div className="badges-container">
            <h2 style={{ color: '#FFD700', textAlign: 'center', marginBottom: '15px' }}>Seu Plano</h2>
            <div className="badge" style={{ borderColor: planColors[user.plan] || 'gold' }}>
                <span style={{ color: planColors[user.plan] || 'gold' }}>{user.plan}</span>
            </div>
        </div>
    );
}

export default Badges;