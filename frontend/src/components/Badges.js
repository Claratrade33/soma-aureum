import React from 'react';

function Badges({ user }) {
    const planColors = {
        Bronze: '#cd7f32',
        Prata: '#c0c0c0',
        Ouro: '#ffd700',
        Platina: '#e5e4e2',
        Diamante: '#b9f2ff'
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <span style={{
                padding: '10px 20px',
                borderRadius: '20px',
                backgroundColor: planColors[user.plan] || '#fff',
                color: '#4b0082',
                fontWeight: 'bold'
            }}>
                {user.plan} Badge
            </span>
        </div>
    );
}

export default Badges;