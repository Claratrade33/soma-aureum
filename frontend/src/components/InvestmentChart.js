import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function InvestmentChart({ users }) {
    const data = {
        labels: users.map(u => u.name),
        datasets: [
            {
                label: 'Patrimônio Virtual',
                data: users.map(u => u.patrimonioVirtual),
                borderColor: '#ffd700',
                backgroundColor: 'rgba(255, 215, 0, 0.2)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Patrimônio Virtual por Usuário' },
        },
    };

    return <Line data={data} options={options} />;
}

export default InvestmentChart;