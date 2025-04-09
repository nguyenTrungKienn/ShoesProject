import React, { useState } from 'react';

function AddShoe({ token, onShoeAdded }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');
  const [color, setColor] = useState('');
  const [attribute, setAttribute] = useState('');
  const [message, setMessage] = useState('');

  const handleAddShoe = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/shoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Gửi token để xác thực
        },
        body: JSON.stringify({ name, price, type, color, attribute }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add shoe');
      }

      setMessage('Shoe added successfully');
      setName('');
      setPrice('');
      setType('');
      setColor('');
      setAttribute('');

      if (onShoeAdded) {
        onShoeAdded(); // Gọi callback để làm mới danh sách giày
      }
    } catch (error) {
      console.error('Error adding shoe:', error);
      setMessage(error.message || 'Error adding shoe');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Shoe</h2>
      <form onSubmit={handleAddShoe}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type</label>
          <input
            type="text"
            id="type"
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="color" className="form-label">Color</label>
          <input
            type="text"
            id="color"
            className="form-control"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="attribute" className="form-label">Attribute</label>
          <input
            type="text"
            id="attribute"
            className="form-control"
            value={attribute}
            onChange={(e) => setAttribute(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Shoe</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default AddShoe;