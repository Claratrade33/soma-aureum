import React from 'react';

function Badges({ user }) {
    const plan = user.plan || "Bronze";

    const colors = {
        Bronze: "#cd7f32",
        Prata: "#c0c0c0",
        Ouro: "#ffd700",
        Platina: "#e5e4e2",
        Diamante: "#b9f2ff"
    };

    return (
        <div style={{ marginTop: "20px" }}>
            <span style={{
                backgroundColor: colors[plan],
                padding: "5px 10px",
                borderRadius: "5px",
                color: "#000"
            }}>
                {plan} 🏅
            </span>
        </div>
    );
}

export default Badges;