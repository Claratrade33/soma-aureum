import React, { useState } from 'react';
import InvestmentChart from './InvestmentChart';

function Dashboard({ user }) {
    const [plan, setPlan] = useState('');
    const [amount, setAmount] = useState('');
    const [aportes, setAportes] = useState(user.aportes);

    const handleInvest = async () => {
        const res = await fetch('http://localhost:3000/api/users/invest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email, plan, amount: Number(amount) })
        });
        const data = await res.json();
        if(res.ok) {
            alert(data.message);
            setAportes(data.aportes);
        } else alert(data);
    };

    return (
        <div className="dashboard">
            <h1>Bem-vindo, {user.name}</h1>
            <p>Plano atual: {user.plan || "Nenhum"}</p>
            <p>Saldo: {user.balance}</p>

            <div className="invest-section">
                <h3>Investir em plano</h3>
                <select value={plan} onChange={e => setPlan(e.target.value)}>
                    <option value="">Selecione</option>
                    <option value="Bronze">Bronze 🥉</option>
                    <option value="Prata">Prata 🥈</option>
                    <option value="Ouro">Ouro 🥇</option>
                    <option value="Platina">Platina 💎</option>
                    <option value="Diamante">Diamante 💎</option>
                </select>
                <input type="number" placeholder="Valor" value={amount} onChange={e => setAmount(e.target.value)} />
                <button onClick={handleInvest}>Aportar</button>
            </div>

            <InvestmentChart aportes={aportes} />
        </div>
    );
}

export default Dashboard;