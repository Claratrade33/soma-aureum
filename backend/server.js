require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/soma_aureum', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado!'))
.catch(err => console.error('Erro ao conectar MongoDB:', err));

// Criar demo users e admin
const createDemoData = async () => {
  const count = await User.countDocuments();
  if(count === 0) {
    const demoUsers = [
      { name: 'Alice', plan: 'Gold', aporte: 1000 },
      { name: 'Bob', plan: 'Silver', aporte: 500 },
      { name: 'Carol', plan: 'Platinum', aporte: 2000 },
      { name: 'David', plan: 'Gold', aporte: 1500 },
      { name: 'Admin', plan: 'Premium', aporte: 0, role: 'admin' }
    ];

    const totalAporte = demoUsers.reduce((sum, u) => sum + u.aporte, 0);
    for(const u of demoUsers) {
      u.patrimonioVirtual = u.aporte + totalAporte * 0.1 * (u.aporte / totalAporte);
      await new User(u).save();
    }
    console.log('Usuários demo e admin criados!');
  }
};
createDemoData();

// Rotas
app.use('/api/users', userRoutes);

// Servir frontend build
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, () => console.log(`SOMA AUREUM rodando na porta ${PORT}`));