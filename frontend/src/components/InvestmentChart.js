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
            backgroundColor: 'rgba(255, 215, 0, 0.5)',
            borderColor: 'gold',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { labels: { color: '#ffd700' } },
        },
        scales: {
            x: { ticks: { color: '#fff' } },
            y: { ticks: { color: '#fff' } },
        }
    };

    return (
        <div style={{ marginTop: "30px" }}>
            <Line data={data} options={options} />
        </div>
    );
}

export default InvestmentChart;