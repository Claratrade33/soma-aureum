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

    const fetchUsers = async () => {
        const res = await fetch('http://localhost:3000/api/users');
        const data = await res.json();
        setUsers(data);
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleAporte = async () => {
        if (!name || aporte < 1000) {
            alert("O aporte mínimo é R$ 1000");
            return;
        }
        await fetch('http://localhost:3000/api/users/aporte', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, plan, aporte: Number(aporte) })
        });
        setAporte(0);
        fetchUsers();
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
                        {users.map(u => (
                            <tr key={u._id}>
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