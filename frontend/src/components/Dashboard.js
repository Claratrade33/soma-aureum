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
        { name: 'Bronze 🥉', min: 1000 },
        { name: 'Prata 🥈', min: 5000 },
        { name: 'Ouro 🥇', min: 15000 },
        { name: 'Platina 💎', min: 50000 },
        { name: 'Diamante 💎', min: 100000 },
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
        }));
        setUsers(usersWithPatrimonio);
    }, []);

    const handleAporte = () => {
        if (!name || aporte < 1000) {
            alert("O aporte mínimo é R$ 1000");
            return;
        }
        const newUser = { name, plan, aporte: Number(aporte), patrimonioVirtual: aporte };
        setUsers(prev => [...prev, newUser]);
        setAporte(0);
    };

    const totalPatrimonio = users.reduce((sum, u) => sum + u.patrimonioVirtual, 0);

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

            <h2>Total Patrimônio Coletivo: {totalPatrimonio.toFixed(2)}</h2>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Plano</th>
                            <th>Aporte</th>
                            <th>Patrimônio Virtual</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u, idx) => (
                            <tr key={idx}>
                                <td>{u.name}</td>
                                <td>{u.plan}</td>
                                <td>{u.aporte}</td>
                                <td>{u.patrimonioVirtual.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Badges user={{ plan }} />
            <InvestmentChart users={users} />

            <button className="generate-pdf-btn" onClick={() => generatePDF(users)}>Gerar Relatório PDF</button>
        </div>
    );
}

export default Dashboard;