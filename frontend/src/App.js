import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [users, setUsers] = useState([]);

  const colors = {
    bronze: '#cd7f32',
    silver: '#c0c0c0',
    gold: '#ffd700',
    platinum: '#e5e4e2',
    diamond: '#b9f2ff',
    primary: '#FFD700',
    secondary: '#FFC107'
  };

  const plans = [
    { name: 'Bronze 🥉', min: 1000, criteria: '1 aporte realizado', benefits: ['Badge Bronze', 'Dashboard demo', 'Relatório PDF básico'], color: colors.bronze },
    { name: 'Prata 🥈', min: 5000, criteria: '2 aportes mensais', benefits: ['Badge Prata', 'Gráficos detalhados', 'Relatórios mensais'], color: colors.silver },
    { name: 'Ouro 🥇', min: 15000, criteria: '3 experiências de expansão', benefits: ['Badge Ouro', 'Alertas VIP', 'Dashboard avançado'], color: colors.gold },
    { name: 'Platina 💎', min: 50000, criteria: '3 meses de participação contínua', benefits: ['Badge Platina', 'Mentorias', 'Relatórios avançados'], color: colors.platinum },
    { name: 'Diamante 💎', min: 100000, criteria: 'Participação em todas experiências trimestrais', benefits: ['Badge Diamante', 'Concierge VIP', 'Eventos exclusivos', 'Relatório premium'], color: colors.diamond },
  ];

  const demoUsers = [
    { name: 'Alice', plan: 'Ouro', aporte: 10000 },
    { name: 'Bob', plan: 'Bronze', aporte: 1000 },
    { name: 'Carol', plan: 'Prata', aporte: 50000 },
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

  const data = {
    labels: users.map(u => u.name),
    datasets: [
      { label: 'Patrimônio Virtual', data: users.map(u => u.patrimonioVirtual), backgroundColor: colors.primary },
      { label: 'Aporte', data: users.map(u => u.aporte), backgroundColor: colors.secondary },
    ]
  };

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

  const pageStyle = {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1000px',
    margin: '50px auto',
    padding: '0 20px 50px 20px',
    background: '#000000',
    color: '#FFD700',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.7)',
  };

  const cardStyle = (color) => ({
    flex: '1 1 220px',
    border: `2px solid ${color}`,
    borderRadius: '15px',
    padding: '20px',
    backgroundColor: 'rgba(255,255,255,0.05)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
    backdropFilter: 'blur(10px)'
  });

  const buttonStyle = {
    padding: '12px 30px',
    fontSize: '16px',
    background: 'linear-gradient(45deg, #FFD700, #FFC107)',
    color: '#000',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 5px 15px rgba(0,0,0,0.5)'
  };

  return (
    <div style={pageStyle}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '48px', letterSpacing: '3px', textShadow: '0 4px 10px rgba(0,0,0,0.7)' }}>SOMA AUREUM</h1>
        <p style={{ fontSize: '20px', color: '#FFD700' }}>Visualização demo de aportes e crescimento coletivo</p>
      </header>

      <section style={{ marginBottom: '50px' }}>
        <Bar data={data} options={{ responsive: true, plugins: { legend: { position: 'top', labels: { color: '#FFD700' } } } }} />
      </section>

      <section style={{ marginBottom: '50px' }}>
        <h2>Usuários e Patrimônio Virtual</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px', textAlign: 'left' }}>Nome</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Plano</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Aporte</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Patrimônio Virtual</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.name} style={{ cursor: 'pointer' }}
                  onMouseOver={(e)=> e.currentTarget.style.background='rgba(255,255,255,0.1)'} 
                  onMouseOut={(e)=> e.currentTarget.style.background='transparent'}>
                <td style={{ padding: '10px' }}>{u.name}</td>
                <td style={{ padding: '10px' }}>{u.plan}</td>
                <td style={{ padding: '10px', textAlign: 'right' }}>{u.aporte}</td>
                <td style={{ padding: '10px', textAlign: 'right' }}>{u.patrimonioVirtual.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginBottom: '50px' }}>
        <h2>Planos e Benefícios</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
          {plans.map(p => (
            <div key={p.name} style={cardStyle(p.color)}>
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
        <button 
          style={buttonStyle}
          onMouseOver={(e)=> e.currentTarget.style.transform='scale(1.05)'}
          onMouseOut={(e)=> e.currentTarget.style.transform='scale(1)'}
          onClick={generatePDF}
        >
          Gerar PDF
        </button>
      </div>

      <footer style={{ textAlign: 'center', color: '#ccc', marginBottom: '30px' }}>
        <p>SOMA AUREUM – Demo para apresentação de investidores</p>
      </footer>
    </div>
  );
}

export default App;