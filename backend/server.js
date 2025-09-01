require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão MongoDB
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/soma_aureum';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado!'))
.catch(err => console.error('Erro ao conectar MongoDB:', err));

// Chaves privadas e públicas
const privateKey = process.env.PRIVATE_KEY || 'chave_privada_teste';
const publicKey = process.env.PUBLIC_KEY || 'chave_publica_teste';
console.log('Chaves carregadas:', publicKey, privateKey);

// Rotas de usuários
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Servir frontend React (pasta build)
const frontendBuildPath = path.join(__dirname, '../frontend/build');
app.use(express.static(frontendBuildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => console.log(`SOMA AUREUM rodando na porta ${PORT}`));