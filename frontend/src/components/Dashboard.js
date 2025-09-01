import React, { useState, useEffect } from 'react';
import InvestmentChart from './InvestmentChart';
import Badges from './Badges';
import { generatePDF } from './ReportPDF';

function Dashboard() {
    // Estado do usuário demo
    const [user, setUser] = useState(null);
    const [plan, setPlan] = useState('');
    const [amount, setAmount] = useState('');
    const [aportes, setAportes] = useState([]);

    // Inicializa demo offline
    useEffect(() => {
        const demoUser = {
            name: 'Investidor VIP',
            balance: 5000,
            plan: 'Nenhum',
            aportes: [1000, 2000, 1500]
        };
        setUser(demoUser);
        setAportes(demoUser.aportes);
        setPlan(demoUser.plan);
    }, []);

    if (!user) return <div>Carregando demo...</div>;

    // Função de aporte simulado
    const handleInvest = () => {
        const valor = Number(amount);
        if (!plan) return alert('Escolha um plano!');
        if (isNaN(valor) || valor <= 0) return alert('Valor inválido!');
        const novosAportes = [...aportes, valor];
        setAportes(novosAportes);
        setAmount('');
        alert(`Você aportou R$ ${valor} no plano ${plan}!`);
    };

    return (
        <div className="dashboard">
            <h1>Bem-vindo à SOMA AUREUM Demo</h1>
            <p>Nome: {user.name}</p>
            <p>Plano atual: {plan || 'Nenhum'}</p>
            <p>Saldo: R$ {user.balance}</p>

            <div className="invest-section">
                <h3>Simule um investimento</h3>
                <select value={plan} onChange={e => setPlan(e.target.value)}>
                    <option value="">Selecione</option>
                    <option value="Bronze">Bronze 🥉</option>
                    <option value="Prata">Prata 🥈</option>
                    <option value="Ouro">Ouro 🥇</option>
                    <option value="Platina">Platina 💎</option>
                    <option value="Diamante">Diamante 💎</option>
                </select>
                <input
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    min="0"
                />
                <button onClick={handleInvest}>Aportar</button>
            </div>

            <button onClick={() => generatePDF({ name: user.name, plan, aportes })}>
                Gerar Relatório PDF VIP
            </button>

            <Badges user={{ plan, balance: user.balance }} />
            <InvestmentChart aportes={aportes} />

            <p style={{ marginTop: '20px', fontStyle: 'italic', color: '#555' }}>
                *Esta é uma simulação demo. No lançamento oficial, você poderá criar sua conta e acessar sua carteira real.*
            </p>
        </div>
    );
}

export default Dashboard;