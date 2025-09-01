import React, { useEffect, useState } from 'react';
import InvestmentChart from './InvestmentChart';
import Badges from './Badges';
import { generatePDF } from './ReportPDF';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [plan, setPlan] = useState('');
    const [amount, setAmount] = useState('');
    const [aportes, setAportes] = useState([]);

    useEffect(() => {
        // Busca usuário demo
        fetch('/api/demo')
            .then(res => res.json())
            .then(data => {
                setUser(data);
                setAportes(data.aportes);
                setPlan(data.plan);
            });
    }, []);

    if (!user) return <div>Carregando...</div>;

    const handleInvest = () => {
        if (!plan || !amount) return alert('Escolha um plano e valor!');
        const valor = Number(amount);
        if (isNaN(valor) || valor <= 0) return alert('Valor inválido!');
        const novosAportes = [...aportes, valor];
        setAportes(novosAportes);
        setAmount('');
        alert(`Você aportou R$ ${valor} no plano ${plan}!`);
    };

    return (
        <div className="dashboard">
            <h1>Bem-vindo, {user.name}</h1>
            <p>Plano atual: {plan || 'Nenhum'}</p>
            <p>Saldo: R$ {user.balance}</p>

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

            <button onClick={() => generatePDF({ name: user.name, plan, aportes })}>
                Gerar Relatório PDF VIP
            </button>

            <Badges user={{ plan, balance: user.balance }} />
            <InvestmentChart aportes={aportes} />
        </div>
    );
}

export default Dashboard;