import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function InvestmentChart({ aportes }) {
    const data = {
        labels: aportes.map((_, i) => `Aporte ${i + 1}`),
        datasets: [
            {
                label: 'Valor do aporte',
                data: aportes,
                borderColor: '#FFD700',
                backgroundColor: 'rgba(255, 215, 0, 0.3)',
                tension: 0.3
            }
        ]
    };

    return (
        <div style={{ width: '100%', maxWidth: '600px', margin: '20px auto' }}>
            <h3>Gráfico de aportes</h3>
            <Line data={data} />
        </div>
    );
}

export default InvestmentChart;