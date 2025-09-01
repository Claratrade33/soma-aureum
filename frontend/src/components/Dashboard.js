import React, { useState, useEffect } from 'react';
import InvestmentChart from './InvestmentChart';
import Badges from './Badges';
import { generatePDF } from './ReportPDF';
import './Dashboard.css';

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [plan, setPlan] = useState('Bronze');
    const [aporte, setAporte] = useState(0);

    const plans = [
        { name: 'Bronze 🥉', color: '#cd7f32' },
        { name: 'Prata 🥈', color: '#c0c0c0' },
        { name: 'Ouro 🥇', color: '#ffd700' },
        { name: 'Platina 💎', color: '#e5e4e2' },
        { name: 'Diamante 💎', color: '#b9f2ff' },
    ];

    const demoUsers = [
        { name: 'Alice', plan: 'Ouro', aporte: 1000 },
        { name: 'Bob', plan: 'Prata', aporte: 5000 },
        { name: 'Carol', plan: 'Platina', aporte: 20000 },
        { name: 'David', plan: 'Ouro', aporte: 15000 },
    ];

    useEffect(() => {
        const totalAporte = demoUsers.reduce((sum, u) => sum + u.aporte, 0);
        const usersWithPatrimonio = demoUsers.map(u => ({
            ...u,
            patrimonioVirtual: u.aporte + totalAporte * 0.1 * (u.aporte / totalAporte)
        })).sort((a,b) => b.patrimonioVirtual - a.patrimonioVirtual); // rank
        setUsers(usersWithPatrimonio);
    }, []);

    const handleAporte = () => {
        if (!name || aporte < 1000) {
            alert("O aporte mínimo é R$ 1000");
            return;
        }

        const totalAporteAtual = users.reduce((sum, u) => sum + u.aporte, 0) + Number(aporte);

        const newUser = { name, plan, aporte: Number(aporte) };
        newUser.patrimonioVirtual = newUser.aporte + totalAporteAtual * 0.1 * (newUser.aporte / totalAporteAtual);

        const updatedUsers = users.map(u => ({
            ...u,
            patrimonioVirtual: u.aporte + totalAporteAtual * 0.1 * (u.aporte / totalAporteAtual)
        }));

        setUsers([...updatedUsers, newUser].sort((a,b) => b.patrimonioVirtual - a.patrimonioVirtual));
        setAporte(0);
    };

    const totalPatrimonio = users.reduce((sum, u) => sum + u.patrimonioVirtual, 0);
    const totalAportes = users.reduce((sum, u) => sum + u.aporte, 0);

    const getPlanColor = (planName) => {
        const p = plans.find(p => p.name.startsWith(planName));
        return p ? p.color : '#999';
    };

    return (
        <div className="dashboard-container">
            <h1>Demo SOMA AUREUM</h1>
            <p>O ecossistema distribui crescimento coletivo: cada aporte aumenta o patrimônio virtual de todos proporcionalmente.</p>

            <div className="input-group">
                <input placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)} />
                <select value={plan} onChange={e => setPlan(e.target.value)}>
                    {plans.map(p => <option key={p.name} value={p.name.split(' ')[0]}>{p.name}</option>)}
                </select>
                <input type="number" placeholder="Aporte mínimo R$ 1000" value={aporte} onChange={e => setAporte(e.target.value)} />
                <button onClick={handleAporte}>Aportar</button>
            </div>

            <div className="totals">
                <div>Total Patrimônio: <strong>R$ {totalPatrimonio.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong></div>
                <div>Total Aportes: <strong>R$ {totalAportes.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</strong></div>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Nome</th>
                            <th>Plano</th>
                            <th>Aporte</th>
                            <th>% do Total</th>
                            <th>Patrimônio Virtual</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u, idx) => {
                            const percent = (u.aporte / totalAportes) * 100;
                            return (
                                <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                                    <td>{idx + 1}</td>
                                    <td>{u.name} <Badges user={{ plan: u.plan }} /></td>
                                    <td style={{ color: getPlanColor(u.plan), fontWeight: 'bold' }}>{u.plan}</td>
                                    <td>R$ {u.aporte.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                    <td>
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{ width: `${percent}%`, backgroundColor: getPlanColor(u.plan) }}></div>
                                            <span className="progress-text">{percent.toFixed(2)}%</span>
                                        </div>
                                    </td>
                                    <td>R$ {u.patrimonioVirtual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <InvestmentChart users={users} />

            <button className="generate-pdf-btn" onClick={() => generatePDF(users)}>Gerar Relatório PDF</button>
        </div>
    );
}

export default Dashboard;