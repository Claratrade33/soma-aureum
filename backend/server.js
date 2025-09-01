const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Rotas da API
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Servir frontend build
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`SOMA AUREUM rodando na porta ${PORT}`));