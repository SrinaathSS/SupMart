import React, { useState, useEffect } from 'react';
import './InventoryPage.css'; // Import the CSS file

function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, quantity: 0, category: '' });
  const [editProduct, setEditProduct] = useState(null); // State for the product being edited
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [token, setToken] = useState(localStorage.getItem('access_token') || ''); // Retrieve token from localStorage

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/products/', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include JWT token
          },
        });
        if (!response.ok) {
          if (response.status === 401) {
            setError('Unauthorized. Please log in.');
            // Redirect to login page or handle token expiration
            window.location.href = '/login';
            return;
          }
          throw new Error(`Error fetching products: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  // Handle adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || newProduct.price <= 0 || newProduct.quantity <= 0 || !newProduct.category) return; // Validation

    try {
      const response = await fetch('http://localhost:8000/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include JWT token
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) throw new Error(`Error adding product: ${response.statusText}`);
      const addedProduct = await response.json();
      setProducts([...products, addedProduct]);
      setNewProduct({ name: '', price: 0, quantity: 0, category: '' });
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle updating a product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editProduct) return;
    try {
      const response = await fetch(`http://localhost:8000/products/${editProduct.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include JWT token
        },
        body: JSON.stringify(editProduct),
      });
      if (!response.ok) throw new Error(`Error updating product: ${response.statusText}`);
      const updatedProduct = await response.json();
      setProducts(products.map(prod => (prod.id === updatedProduct.id ? updatedProduct : prod)));
      setEditProduct(null); // Clear edit state
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle deleting a product
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8000/products/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Include JWT token
        },
      });
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="inventory-management">
      <h1>Inventory Management</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      
      {/* Product List */}
      <h2>Product List</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.category}</td>
              <td>
                <button onClick={() => setEditProduct(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Product Form */}
      <form className="add-product-form" onSubmit={handleAddProduct}>
        <h2>Add Product</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          required
        />
        <button type="submit">Add Product</button>
      </form>

      {/* Edit Product Form */}
      {editProduct && (
        <form className="edit-product-form" onSubmit={handleUpdateProduct}>
          <h2>Edit Product</h2>
          <input
            type="text"
            placeholder="Name"
            value={editProduct.name}
            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={editProduct.price}
            onChange={(e) => setEditProduct({ ...editProduct, price: parseFloat(e.target.value) })}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={editProduct.quantity}
            onChange={(e) => setEditProduct({ ...editProduct, quantity: parseInt(e.target.value) })}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={editProduct.category}
            onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
            required
          />
          <button type="submit">Update Product</button>
        </form>
      )}
    </div>
  );
}

export default InventoryPage;
