import React, { useState, useEffect } from 'react';
import './InventoryPage.css'; // Import the CSS file

function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [newProductQuantity, setNewProductQuantity] = useState(0);
  const [newProductCategory, setNewProductCategory] = useState('');

  // Fetch products from JSON file or API
  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data || []);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddProduct = () => {
    if (!newProductName || newProductPrice <= 0 || newProductQuantity <= 0 || !newProductCategory) return; // Validation

    const newProduct = { 
      id: Date.now().toString(), 
      name: newProductName, 
      price: parseFloat(newProductPrice), 
      quantity: parseInt(newProductQuantity), 
      category: newProductCategory 
    };

    // Show alert message
    window.alert('Product added');

    // Add product to JSON server
    fetch('http://localhost:8080/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        setProducts([...products, newProduct]); // Update local state
        setNewProductName('');
        setNewProductPrice(0);
        setNewProductQuantity(0);
        setNewProductCategory('');
      })
      .catch(error => {
        console.error('Error adding product:', error);
        window.alert('Failed to add product');
      });
  };

  return (
    <div className="inventory-container">
      <h1>Inventory</h1>
      <div className="add-product-form">
        <h2>Add New Product</h2>
        <p className="form-subheading">Fill in the details below to add a new product:</p>
        <input
          type="text"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          placeholder="Product Name"
        />
        <input
          type="number"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(e.target.value)}
          placeholder="Price"
        />
        <input
          type="number"
          value={newProductQuantity}
          onChange={(e) => setNewProductQuantity(e.target.value)}
          placeholder="Quantity"
        />
        <input
          type="text"
          value={newProductCategory}
          onChange={(e) => setNewProductCategory(e.target.value)}
          placeholder="Category"
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <p><strong>Category:</strong> {product.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryPage;
