const User = require('../models/userModel');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if(exists) return res.status(400).send("Usuário já existe");
    const newUser = new User({ name, email, password, balance:0, aportes:[] });
    await newUser.save();
    res.send({ message: "Cadastro realizado com sucesso!", user: newUser });
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if(!user) return res.status(400).send("Credenciais inválidas");
    res.send({ message: "Login realizado", user });
};

const invest = async (req, res) => {
    const { email, plan, amount } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).send("Usuário não encontrado");
    user.plan = plan;
    user.balance += amount;
    user.aportes.push(amount);
    await user.save();
    res.send({ message: `Aporte realizado no plano ${plan}`, balance: user.balance, aportes: user.aportes });
};

module.exports = { register, login, invest };