require('dotenv').config(); // lê as variáveis de ambiente
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com MongoDB usando MONGO_URI
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.error('Erro MongoDB:', err));

// Exemplo de uso das keys
const privateKey = process.env.PRIVATE_KEY;
const publicKey = process.env.PUBLIC_KEY;

console.log('Chaves carregadas:', publicKey, privateKey);

// Rotas de exemplo
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Servir frontend React
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => console.log(`SOMA AUREUM rodando na porta ${PORT}`));