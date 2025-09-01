import React, { useEffect } from 'react';
import { Chart } from 'chart.js/auto';

function InvestmentChart({ aportes }) {
  useEffect(() => {
    const ctx = document.getElementById('investmentChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: aportes.map((_, i) => `Aporte ${i + 1}`),
        datasets: [{
          label: 'Valor do Aporte',
          data: aportes,
          backgroundColor: '#f4c430'
        }]
      }
    });
  }, [aportes]);

  return (
    <div>
      <h2>Gráfico de Investimentos</h2>
      <canvas id="investmentChart"></canvas>
    </div>
  );
}

export default InvestmentChart;