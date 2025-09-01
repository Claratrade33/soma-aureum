import React from 'react';
import { Bar } from 'react-chartjs-2';
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

function InvestmentChart({ users }) {
    const data = {
        labels: users.map(u => u.name),
        datasets: [
            {
                label: 'Patrimônio Virtual',
                data: users.map(u => u.patrimonioVirtual),
                backgroundColor: 'rgba(255, 191, 0, 0.7)',
            },
            {
                label: 'Aporte',
                data: users.map(u => u.aporte),
                backgroundColor: 'rgba(0, 123, 204, 0.7)',
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Investimentos dos Usuários' }
        }
    };

    return <Bar data={data} options={options} />;
}

export default InvestmentChart;