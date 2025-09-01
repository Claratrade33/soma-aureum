import React, { useState, useEffect } from 'react';
import Badges from './Badges';
import InvestmentChart from './InvestmentChart';
import { generatePDF } from './ReportPDF';

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [plan, setPlan] = useState('Bronze');
    const [aporte, setAporte] = useState(0);

    const fetchUsers = async () => {
        const res = await fetch('http://localhost:3000/api/users');
        const data = await res.json();
        setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAporte = async () => {
        await fetch('http://localhost:3000/api/users/aporte', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, plan, aporte: Number(aporte) })
        });
        fetchUsers();
    };

    const totalPatrimonio = users.reduce((sum, u) => sum + u.patrimonioVirtual, 0);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Demo SOMA AUREUM</h1>
            <p>O ecossistema distribui crescimento coletivo: cada aporte aumenta o patrimônio virtual de todos proporcionalmente.</p>

            <div style={{ marginTop: "20px" }}>
                <input placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)} />
                <select value={plan} onChange={e => setPlan(e.target.value)}>
                    <option value="Bronze">Bronze</option>
                    <option value="Prata">Prata</option>
                    <option value="Ouro">Ouro</option>
                    <option value="Platina">Platina</option>
                    <option value="Diamante">Diamante</option>
                </select>
                <input type="number" placeholder="Aporte" value={aporte} onChange={e => setAporte(e.target.value)} />
                <button onClick={handleAporte}>Aportar</button>
            </div>

            <h2>Total Patrimônio Coletivo: {totalPatrimonio.toFixed(2)}</h2>

            <table border="1" style={{ marginTop: '20px', width: '100%' }}>
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

            <Badges user={{ plan }} />
            <InvestmentChart users={users} />

            <button style={{ marginTop: "20px" }} onClick={() => generatePDF(users)}>Gerar Relatório PDF</button>
        </div>
    );
}

export default Dashboard;