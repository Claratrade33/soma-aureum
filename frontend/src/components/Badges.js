import React from 'react';

function Badges({ user }) {
    const badges = [];

    if(user.aportes.length >= 1) badges.push("Primeiro Aporte 🥇");
    if(user.plan === "Ouro") badges.push("Investidor Ouro 🥇");
    if(user.plan === "Platina") badges.push("Clube Platina 💎");
    if(user.plan === "Diamante") badges.push("Clube Diamante 💎");

    return (
        <div>
            <h3>Seus Badges VIP:</h3>
            {badges.length ? badges.map((b,i) => <p key={i}>{b}</p>) : <p>Sem badges ainda</p>}
        </div>
    );
}

export default Badges;