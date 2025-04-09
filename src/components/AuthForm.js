import React, { useState } from 'react';

function AuthForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://shoes-app-ksu3.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage('Error registering');
    }
  };

  // Đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://shoes-app-ksu3.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.token) {
        onLoginSuccess(data.token);
        setMessage('Login successful');
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('Error logging in');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4 bg-white rounded-lg">
            <h3 className="text-center text-2xl font-bold text-gray-800 mb-4">
              Register / Login
            </h3>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label text-gray-600">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Buttons */}
              <div className="d-flex justify-content-between">
                <button
                  type="submit"
                  className="btn btn-primary w-48 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={handleLogin}
                  className="btn btn-success w-48 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Login
                </button>
              </div>
            </form>

            {/* Message */}
            {message && (
              <p
                className={`mt-3 text-center ${
                  message.includes('successful') ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;