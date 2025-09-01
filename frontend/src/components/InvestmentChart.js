import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function InvestmentChart({ aportes }) {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            new Chart(chartRef.current, {
                type: 'line',
                data: {
                    labels: aportes.map((_, i) => `Aporte ${i+1}`),
                    datasets: [{
                        label: 'Evolução dos Aportes',
                        data: aportes,
                        borderColor: '#D4AF37',
                        backgroundColor: 'rgba(212,175,55,0.2)',
                        fill: true,
                        tension: 0.3
                    }]
                },
                options: {
                    plugins: { legend: { labels: { color: '#111' } } },
                    scales: { x: { ticks: { color: '#111' } }, y: { ticks: { color: '#111' } } }
                }
            });
        }
    }, [aportes]);

    return <canvas ref={chartRef} />;
}

export default InvestmentChart;