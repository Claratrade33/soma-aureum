const { users, User } = require('../models/userModel');

const register = (req, res) => {
    const { name, email, password } = req.body;
    if(users.find(u => u.email === email)) return res.status(400).send("Usuário já existe");
    const newUser = new User(name, email, password);
    users.push(newUser);
    res.send({ message: "Cadastro realizado com sucesso!", user: newUser });
};

const login = (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if(!user) return res.status(400).send("Credenciais inválidas");
    res.send({ message: "Login realizado", user });
};

const invest = (req, res) => {
    const { email, plan, amount } = req.body;
    const user = users.find(u => u.email === email);
    if(!user) return res.status(400).send("Usuário não encontrado");
    user.plan = plan;
    user.balance += amount;
    res.send({ message: `Aporte realizado no plano ${plan}`, balance: user.balance });
};

module.exports = { register, login, invest };