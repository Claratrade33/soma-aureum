import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function InvestmentChart({ users }) {
    const labels = users.map(u => u.name);

    const data = {
        labels,
        datasets: [{
            label: 'Patrimônio Virtual',
            data: users.map(u => u.patrimonioVirtual),
            backgroundColor: 'rgba(255, 215, 0, 0.3)', // dourado suave
            borderColor: 'gold', // linha dourada
            borderWidth: 3,
            tension: 0.4, // curva suave
            pointBackgroundColor: 'gold',
            pointBorderColor: '#121212',
            pointRadius: 6,
            pointHoverRadius: 8,
            fill: true,
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: '#FFD700', // legend dourada
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                }
            },
            tooltip: {
                backgroundColor: '#1a1a1a',
                titleColor: '#FFD700',
                bodyColor: '#FFD700'
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
        <div style={{ marginTop: "30px", backgroundColor: "#121212", padding: "20px", borderRadius: "15px", boxShadow: "0 5px 20px rgba(0,0,0,0.5)" }}>
            <Line data={data} options={options} />
        </div>
    );
}

export default InvestmentChart;