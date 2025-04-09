import React, { useState, useEffect } from 'react';
import AddShoes from './AddShoes';
import UpdateShoes from './UpdateShoes';

function ShoesList({ token }) {
  const [shoes, setShoes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState('');
  const [tokenDisplay, setTokenDisplay] = useState('');
  const [editShoe, setEditShoe] = useState(null);

  // Fetch danh sách giày
  const fetchShoes = async () => {
    try {
      console.log('Fetching shoes with token:', token); // Debug token
      const response = await fetch('https://shoes-app-ksu3.onrender.com/shoes', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Gửi cookie (nếu có)
      });

      console.log('Response status:', response.status); // Debug status
      console.log('Response headers:', response.headers.get('content-type')); // Debug headers

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data); // Debug dữ liệu trả về

      if (data.shoes) {
        setShoes(data.shoes);
        setError('');
      } else {
        setError(data.error || 'No shoes data found');
      }
    } catch (err) {
      console.error('Fetch error:', err); // Debug lỗi
      setError(err.message || 'Error fetching shoes');
    }
  };

  useEffect(() => {
    if (token) {
      fetchShoes();
    } else {
      setError('No token provided. Please login.');
    }
  }, [refresh, token]);

  // Xử lý hiển thị token và fetch API
  const handleShowTokenAndFetch = () => {
    setTokenDisplay(token ? token : 'No token available');
    fetchShoes();
  };

  // Callback khi thêm giày thành công
  const handleAddSuccess = (newShoe) => {
    setShoes([...shoes, newShoe]);
  };

  // Callback khi cập nhật giày thành công
  const handleUpdateSuccess = (updatedShoe) => {
    setShoes(shoes.map((s) => (s._id === updatedShoe._id ? updatedShoe : s)));
    setEditShoe(null);
  };

  // Xử lý chỉnh sửa giày
  const handleEditShoe = (shoe) => {
    setEditShoe(shoe);
  };

  // Hủy chỉnh sửa
  const handleCancelEdit = () => {
    setEditShoe(null);
  };

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Shoes List</h2>

      {/* Button hiển thị token và gọi API */}
      <button
        onClick={handleShowTokenAndFetch}
        className="btn btn-primary mb-4 mr-2 hover:bg-blue-600 transition duration-300"
      >
        Show Token and Fetch API
      </button>

      {/* Button Refresh */}
      <button
        onClick={handleRefresh}
        className="btn btn-info mb-4 mr-2 hover:bg-blue-500 transition duration-300"
      >
        Refresh Shoes List
      </button>

      {/* Component AddShoes */}
      <AddShoes token={token} onAddSuccess={handleAddSuccess} />

      {/* Hiển thị token */}
      {tokenDisplay && (
        <p className="mb-3 text-gray-700 break-all">
          <strong>Token:</strong> {tokenDisplay}
        </p>
      )}

      {/* Hiển thị lỗi */}
      {error && <p className="text-red-500 mb-3">{error}</p>}

      {/* Component UpdateShoes */}
      {editShoe && (
        <UpdateShoes
          token={token}
          shoe={editShoe}
          onUpdateSuccess={handleUpdateSuccess}
          onCancel={handleCancelEdit}
        />
      )}

      {/* Danh sách giày */}
      <ul className="list-group">
        {shoes.map((shoe) => (
          <li
            key={shoe._id}
            className="list-group-item mb-3 p-4 rounded-lg shadow-sm d-flex justify-content-between align-items-center"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{shoe.name}</h3>
              <p className="text-gray-600">Price: {shoe.price.toLocaleString()} VND</p>
              <p className="text-gray-600">Type: {shoe.type}</p>
              <p className="text-gray-600">Color: {shoe.color}</p>
              <p className="text-gray-600">Attribute: {shoe.attribute}</p>
            </div>
            <button
              onClick={() => handleEditShoe(shoe)}
              className="btn btn-warning btn-sm hover:bg-yellow-600 transition duration-300"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoesList;