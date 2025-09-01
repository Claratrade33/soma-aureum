import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    const [user, setUser] = useState(null);

    if(!user) return (
        <div className="app-container">
            <h1>SOMA AUREUM</h1>
            <Login setUser={setUser} />
            <Register setUser={setUser} />
        </div>
    );

    return <Dashboard user={user} />;
}

export default App;