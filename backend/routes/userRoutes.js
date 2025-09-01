const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Retorna todos os usuários
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Adicionar aporte (demo interativo, opcional)
router.post('/aporte', async (req, res) => {
  const { name, plan, aporte } = req.body;

  if (!name || !plan || aporte <= 0) {
    return res.status(400).json({ message: 'Dados inválidos' });
  }

  let user = await User.findOne({ name });
  if (!user) {
    user = new User({ name, plan, aporte, patrimonioVirtual: aporte });
  } else {
    user.aporte += aporte;
  }
  await user.save();

  const allUsers = await User.find();
  const totalAporte = allUsers.reduce((sum, u) => sum + u.aporte, 0);

  await Promise.all(allUsers.map(async u => {
    u.patrimonioVirtual = u.aporte + (totalAporte * 0.1 * (u.aporte / totalAporte));
    await u.save();
  }));

  res.json({ message: 'Aporte registrado', user });
});

module.exports = router;