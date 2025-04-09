import React, { useState } from 'react';

function UpdateShoes({ token, shoe, onUpdateSuccess, onCancel }) {
  const [editShoe, setEditShoe] = useState({
    name: shoe.name,
    image: shoe.image,
    price: shoe.price,
    type: shoe.type,
    color: shoe.color,
    attribute: shoe.attribute,
  });
  const [error, setError] = useState('');

  const handleUpdateShoe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://shoes-app-ksu3.onrender.com/shoes/${shoe._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(editShoe),
      });
      const data = await response.json();
      if (data.shoe) {
        onUpdateSuccess(data.shoe);
        setError('');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Error updating shoe');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditShoe((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="card shadow-lg p-4 mb-4 bg-white rounded-lg">
      <h3 className="text-lg font-bold mb-3">Edit Shoe</h3>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleUpdateShoe}>
        <div className="mb-3">
          <label className="form-label text-gray-600">ID</label>
          <input
            type="text"
            className="form-control"
            value={shoe.id}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={editShoe.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-gray-600">Image URL</label>
          <input
            type="text"
            name="image"
            className="form-control"
            value={editShoe.image}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-gray-600">Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={editShoe.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-gray-600">Type</label>
          <input
            type="text"
            name="type"
            className="form-control"
            value={editShoe.type}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-gray-600">Color</label>
          <input
            type="text"
            name="color"
            className="form-control"
            value={editShoe.color}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label text-gray-600">Attribute</label>
          <input
            type="text"
            name="attribute"
            className="form-control"
            value={editShoe.attribute}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mr-2 hover:bg-blue-600 transition duration-300"
        >
          Update Shoe
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary hover:bg-gray-600 transition duration-300"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateShoes;