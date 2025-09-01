require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

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

// Modelo de usuário simplificado
const userSchema = new mongoose.Schema({
  name: String,
  plan: String,
  aporte: Number,
  patrimonioVirtual: Number
});

const User = mongoose.model('User', userSchema);

// Rota demo: carregar todos usuários
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Rota demo: adicionar aporte
app.post('/api/users/aporte', async (req, res) => {
  const { name, plan, aporte } = req.body;

  // Cria usuário se não existir
  let user = await User.findOne({ name });
  if(!user) {
    user = new User({ name, plan, aporte, patrimonioVirtual: aporte });
  } else {
    user.aporte += aporte;
    user.patrimonioVirtual += aporte;
  }

  await user.save();

  // Atualiza patrimônio virtual de todos proporcional ao total
  const allUsers = await User.find();
  const totalPatrimonio = allUsers.reduce((sum, u) => sum + u.aporte, 0);

  allUsers.forEach(async u => {
    u.patrimonioVirtual = u.aporte + (totalPatrimonio * 0.1 * (u.aporte / totalPatrimonio)); // 10% de crescimento coletivo
    await u.save();
  });

  res.json({ message: 'Aporte registrado', user });
});

app.listen(PORT, () => console.log(`SOMA AUREUM demo rodando na porta ${PORT}`));