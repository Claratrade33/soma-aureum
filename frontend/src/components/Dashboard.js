// Dashboard.js
import React, { useState, useEffect } from 'react';
import Badges from './Badges';
import InvestmentChart from './InvestmentChart';
import { generatePDF } from './ReportPDF';
import './Dashboard.css'; // CSS premium preto & dourado

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [plan, setPlan] = useState('Bronze');
    const [aporte, setAporte] = useState(0);

    // Usuários de exemplo coerentes com os planos
    const demoUsers = [
        { _id: 1, name: 'Alice', plan: 'Ouro', aporte: 15000, patrimonioVirtual: 16500 },
        { _id: 2, name: 'Bob', plan: 'Prata', aporte: 5000, patrimonioVirtual: 5500 },
        { _id: 3, name: 'Carol', plan: 'Platina', aporte: 50000, patrimonioVirtual: 55000 },
        { _id: 4, name: 'David', plan: 'Ouro', aporte: 15000, patrimonioVirtual: 16500 },
    ];

    useEffect(() => {
        // Simula fetch do backend
        setUsers(demoUsers);
    }, []);

    const handleAporte = () => {
        if (!name || aporte < 1000) return; // mínimo Bronze
        const newUser = {
            _id: users.length + 1,
            name,
            plan,
            aporte: Number(aporte),
            patrimonioVirtual: Number(aporte) * 1.1 // crescimento 10%
        };
        setUsers([...users, newUser]);
        setName('');
        setAporte(0);
    };

    const totalPatrimonio = users.reduce((sum, u) => sum + u.patrimonioVirtual, 0);

    return (
        <div className="dashboard-container">
            <h1>SOMA AUREUM</h1>
            <p>O ecossistema distribui crescimento coletivo: cada aporte aumenta o patrimônio virtual de todos proporcionalmente.</p>

            <div className="input-group">
                <input placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)} />
                <select value={plan} onChange={e => setPlan(e.target.value)}>
                    <option value="Bronze">Bronze</option>
                    <option value="Prata">Prata</option>
                    <option value="Ouro">Ouro</option>
                    <option value="Platina">Platina</option>
                    <option value="Diamante">Diamante</option>
                </select>
                <input type="number" placeholder="Aporte mínimo 1000" value={aporte} onChange={e => setAporte(e.target.value)} />
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