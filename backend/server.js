require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Rota demo usuário
app.get('/api/demo', (req, res) => {
    const demoUser = {
        name: 'Investidor VIP',
        balance: 5000,
        plan: 'Nenhum',
        aportes: [1000, 2000, 1500]
    };
    res.json(demoUser);
});

// Todas as outras rotas vão para frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => console.log(`SOMA AUREUM Demo rodando na porta ${PORT}`));