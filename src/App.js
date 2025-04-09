import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import ShoesList from './components/ShoesList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState('');

  // Callback khi đăng nhập thành công
  const handleLoginSuccess = (newToken) => {
    setToken(newToken);
  };

  // Đăng xuất
  const handleLogout = async () => {
    try {
      const response = await fetch('https://shoes-app-ksu3.onrender.com/logout', {
        method: 'POST',
        credentials: 'include', // Gửi cookie
      });
      const data = await response.json();
      setToken(null);
      setMessage(data.message);
    } catch (error) {
      setMessage('Error logging out');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Shoes App</h1>
        {!token ? (
          <AuthForm onLoginSuccess={handleLoginSuccess} />
        ) : (
          <div>
            <button onClick={handleLogout}>Logout</button>
            <ShoesList token={token} />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;