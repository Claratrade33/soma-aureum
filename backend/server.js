require('dotenv').config(); // lê variáveis de ambiente
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Erro ao conectar MongoDB:', err));

// Variáveis de ambiente para chaves
const privateKey = process.env.PRIVATE_KEY;
const publicKey = process.env.PUBLIC_KEY;
console.log('Chaves carregadas:', publicKey, privateKey);

// Rotas da API
const userRoutes = require('./routes/userRoutes'); // arquivo userRoutes.js no backend
app.use('/api/users', userRoutes);

// Servir frontend build do React
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => console.log(`SOMA AUREUM rodando na porta ${PORT}`));