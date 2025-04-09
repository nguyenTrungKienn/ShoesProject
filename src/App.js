import React, { useState } from 'react';
import AuthForm from './components/AuthForm';
import ShoesList from './components/ShoesList';
import AddShoe from './components/AddShoe'; // Import component thêm giày
import UpdateShoes from './components/UpdateShoes';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState('');
  const [view, setView] = useState('list'); // 'list' hoặc 'add'
  const [selectedShoeId, setSelectedShoeId] = useState(null); // Lưu ID sản phẩm được chọn
  

  const handleLoginSuccess = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();
      setToken(null);
      setMessage(data.message);
    } catch (error) {
      setMessage('Error logging out');
    }
  };

  const handleShowToken = async () => {
    try {
      const response = await fetch('http://localhost:5000/shoes', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch token');
      }

      const data = await response.json();
      alert(`Token: ${token}`);
    } catch (error) {
      console.error('Error fetching token:', error);
      alert('Error fetching token');
    }
  };

  const handleShoeAdded = () => {
    setView('list'); // Sau khi thêm giày xong, quay lại danh sách
  };
  const handleShoeUpdated = () => {
    setView('list'); // Quay lại danh sách sau khi cập nhật
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Shoes App</h1>
        {!token ? (
          <AuthForm onLoginSuccess={handleLoginSuccess} />
        ) : (
          <div>
            <button onClick={handleLogout} className="btn btn-danger mb-2">Logout</button>
            <button onClick={() => setView('list')} className="btn btn-outline-primary mb-2 mx-1">View List</button>
            <button onClick={() => setView('add')} className="btn btn-outline-success mb-2 mx-1">Add Shoe</button>

            {view === 'list' && (
              <ShoesList
                token={token}
                onEdit={(id) => {
                  setSelectedShoeId(id);
                  setView('update');
                }}
              />
            )}
            {view === 'add' && <AddShoe token={token} onShoeAdded={handleShoeAdded} />}
            {view === 'update' && (
              <UpdateShoes
                token={token}
                shoeId={selectedShoeId}
                onUpdateSuccess={handleShoeUpdated}
              />
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
