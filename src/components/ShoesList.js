import React, { useState, useEffect } from 'react';

function ShoesList({ token, onEdit }) {
  const [shoes, setShoes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const response = await fetch('http://localhost:5000/shoes', {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token để xác thực
          },
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch shoes');
        }
        const data = await response.json();
        setShoes(data.shoes); // Lưu danh sách giày vào state
        setError('');
      } catch (err) {
        setError('Error fetching shoes');
      }
    };

    fetchShoes();
  }, [refresh, token]);

  const handleRefresh = () => {
    setRefresh((prev) => !prev); // Làm mới danh sách
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Shoes List</h2>
      <button
        onClick={handleRefresh}
        className="btn btn-info mb-4 hover:bg-blue-500 transition duration-300"
      >
        Refresh Shoes List
      </button>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <ul className="list-group">
        {shoes.map((shoe) => (
          <li
            key={shoe._id}
            className="list-group-item mb-3 p-4 rounded-lg shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-800">{shoe.name}</h3>
            <p className="text-gray-600">Price: {shoe.price.toLocaleString()} VND</p>
            <p className="text-gray-600">Type: {shoe.type}</p>
            <p className="text-gray-600">Color: {shoe.color}</p>
            <p className="text-gray-600">Attribute: {shoe.attribute}</p>
            <button
              onClick={() => onEdit(shoe._id)} // Gọi hàm onEdit khi nhấn nút
              className="btn btn-warning mt-2"
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

