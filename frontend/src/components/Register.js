import React, { useState } from 'react';

function Register({ setUser }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        const res = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if(res.ok) setUser(data.user);
        else alert(data);
    };

    return (
        <div>
            <h2>Cadastro</h2>
            <input type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Cadastrar</button>
        </div>
    );
}

export default Register;