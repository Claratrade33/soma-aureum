require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Conexão MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/soma_aureum', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado!'))
.catch(err => console.error('Erro ao conectar MongoDB:', err));

// Criação de admin padrão
const createAdmin = async () => {
  const adminExists = await User.findOne({ role: 'admin' });
  if (!adminExists) {
    const admin = new User({ name: 'admin', plan: 'premium', aporte: 0, patrimonioVirtual: 0, role: 'admin' });
    await admin.save();
    console.log('Usuário admin criado!');
  }
};
createAdmin();

// Rotas
app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`SOMA AUREUM rodando na porta ${PORT}`));