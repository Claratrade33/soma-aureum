import React, { useState } from 'react';

function Login({ setUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const res = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if(res.ok) setUser(data.user);
        else alert(data);
    };

    return (
        <div>
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Entrar</button>
        </div>
    );
}

export default Login;