import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function InvestmentChart({ users }) {
    const labels = users.map(u => u.name);
    const data = {
        labels,
        datasets: [
            {
                label: 'Patrimônio Virtual',
                data: users.map(u => u.patrimonioVirtual),
                backgroundColor: 'rgba(255, 215, 0, 0.3)',
                borderColor: '#FFD700',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#FFC107',
                pointBorderColor: '#FFD700',
                pointRadius: 5
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: '#FFD700',
                    font: { size: 14, weight: 'bold' }
                }
            },
            tooltip: {
                backgroundColor: '#000',
                titleColor: '#FFD700',
                bodyColor: '#fff'
            }
        },
        scales: {
            x: {
                ticks: { color: '#FFD700', font: { weight: 'bold' } },
                grid: { color: 'rgba(255, 215, 0, 0.2)' }
            },
            y: {
                ticks: { color: '#FFD700', font: { weight: 'bold' } },
                grid: { color: 'rgba(255, 215, 0, 0.2)' }
            }
        }
    };

    return (
        <div style={{ marginTop: '30px', background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '20px' }}>
            <Line data={data} options={options} />
        </div>
    );
}

export default InvestmentChart;