import React, { useState } from 'react';

function AddShoes({ token, onAddSuccess }) {
  const [newShoe, setNewShoe] = useState({
    name: '',
    image: '',
    price: '',
    type: '',
    color: '',
    attribute: '',
  });
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Xử lý thêm giày mới
  const handleAddShoe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://shoes-app-ksu3.onrender.com/shoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(newShoe),
      });
      const data = await response.json();
      if (data.shoe) {
        onAddSuccess(data.shoe);
        setNewShoe({ name: '', image: '', price: '', type: '', color: '', attribute: '' });
        setShowAddForm(false);
        setError('');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Error adding shoe');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShoe((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="btn btn-success mb-4 hover:bg-green-600 transition duration-300"
      >
        {showAddForm ? 'Hide Add Form' : 'Add New Shoe'}
      </button>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      {showAddForm && (
        <div className="card shadow-lg p-4 mb-4 bg-white rounded-lg">
          <h3 className="text-lg font-bold mb-3">Add New Shoe</h3>
          <form onSubmit={handleAddShoe}>
            <div className="mb-3">
              <label className="form-label text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={newShoe.name}
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
                value={newShoe.image}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-gray-600">Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={newShoe.price}
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
                value={newShoe.type}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-gray-600">Color</label>
              <input
                type="text"
                name="color"
                className="form-control"
                value={newShoe.color}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-gray-600">Attribute</label>
              <input
                type="text"
                name="attribute"
                className="form-control"
                value={newShoe.attribute}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary hover:bg-blue-600 transition duration-300"
            >
              Add Shoe
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddShoes;