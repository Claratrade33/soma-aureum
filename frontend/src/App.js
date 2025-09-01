import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { jsPDF } from 'jspdf';

function App() {
  const [users, setUsers] = useState([]);

  // Cores inspiradas na sua numerologia/cabala
  const colors = {
    bronze: '#cd7f32',
    silver: '#c0c0c0',
    gold: '#ffd700',
    platinum: '#e5e4e2',
    diamond: '#b9f2ff',
    primary: '#4b0082', // roxo profundo
    secondary: '#ffcc00' // dourado suave
  };

  // Planos definidos
  const plans = [
    { name: 'Bronze 🥉', min: 1000, criteria: '1 aporte realizado', benefits: ['Badge Bronze', 'Dashboard demo', 'Relatório PDF básico'], color: colors.bronze },
    { name: 'Prata 🥈', min: 5000, criteria: '2 aportes mensais', benefits: ['Badge Prata', 'Gráficos detalhados', 'Relatórios mensais'], color: colors.silver },
    { name: 'Ouro 🥇', min: 15000, criteria: '3 experiências de expansão', benefits: ['Badge Ouro', 'Alertas VIP', 'Dashboard avançado'], color: colors.gold },
    { name: 'Platina 💎', min: 50000, criteria: '3 meses de participação contínua', benefits: ['Badge Platina', 'Mentorias', 'Relatórios avançados'], color: colors.platinum },
    { name: 'Diamante 💎', min: 100000, criteria: 'Participação em todas experiências trimestrais', benefits: ['Badge Diamante', 'Concierge VIP', 'Eventos exclusivos', 'Relatório premium'], color: colors.diamond },
  ];

  // Usuários demo
  const demoUsers = [
    { name: 'Alice', plan: 'Gold', aporte: 1000 },
    { name: 'Bob', plan: 'Silver', aporte: 500 },
    { name: 'Carol', plan: 'Platinum', aporte: 2000 },
    { name: 'David', plan: 'Gold', aporte: 1500 },
  ];

  useEffect(() => {
    // Simulação de fetch do backend
    const totalAporte = demoUsers.reduce((sum, u) => sum + u.aporte, 0);
    const usersWithPatrimonio = demoUsers.map(u => ({
      ...u,
      patrimonioVirtual: u.aporte + totalAporte * 0.1 * (u.aporte / totalAporte)
    }));
    setUsers(usersWithPatrimonio);
  }, []);

  // Gráfico de barras
  const data = {
    labels: users.map(u => u.name),
    datasets: [
      { label: 'Patrimônio Virtual', data: users.map(u => u.patrimonioVirtual), backgroundColor: colors.primary },
      { label: 'Aporte', data: users.map(u => u.aporte), backgroundColor: colors.secondary },
    ]
  };

  // Gerar PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Relatório SOMA AUREUM', 14, 22);
    doc.setFontSize(12);
    users.forEach((u, i) => {
      doc.text(`${i+1}. ${u.name} - Plano: ${u.plan} - Aporte: ${u.aporte} - Patrimônio: ${u.patrimonioVirtual.toFixed(2)}`, 14, 30 + i*10);
    });
    doc.save('relatorio_soma_aureum.pdf');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '50px auto', padding: '0 20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: colors.primary }}>SOMA AUREUM</h1>
        <p style={{ fontSize: '18px', color: '#555' }}>Visualização demo de aportes e crescimento coletivo</p>
      </header>

      {/* Gráfico */}
      <section style={{ marginBottom: '50px' }}>
        <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </section>

      {/* Tabela de usuários */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ color: colors.primary }}>Usuários e Patrimônio Virtual</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' }}>Nome</th>
              <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'left' }}>Plano</th>
              <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'right' }}>Aporte</th>
              <th style={{ borderBottom: '2px solid #ccc', padding: '10px', textAlign: 'right' }}>Patrimônio Virtual</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.name}>
                <td style={{ borderBottom: '1px solid #eee', padding: '10px' }}>{u.name}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: '10px' }}>{u.plan}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: '10px', textAlign: 'right' }}>{u.aporte}</td>
                <td style={{ borderBottom: '1px solid #eee', padding: '10px', textAlign: 'right' }}>{u.patrimonioVirtual.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Planos */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ color: colors.primary }}>Planos e Benefícios</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
          {plans.map(p => (
            <div key={p.name} style={{
              flex: '1 1 200px',
              border: `2px solid ${p.color}`,
              borderRadius: '10px',
              padding: '15px',
              backgroundColor: '#fff',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: p.color }}>{p.name}</h3>
              <p><strong>Participação mínima:</strong> {p.min}</p>
              <p><strong>Critérios:</strong> {p.criteria}</p>
              <ul>
                {p.benefits.map(b => <li key={b}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <button onClick={generatePDF} style={{
          padding: '10px 25px',
          fontSize: '16px',
          backgroundColor: colors.primary,
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>Gerar PDF</button>
      </div>

      <footer style={{ textAlign: 'center', color: '#888', marginBottom: '30px' }}>
        <p>SOMA AUREUM – Demo para apresentação de investidores</p>
      </footer>
    </div>
  );
}

export default App;