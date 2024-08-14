import React, { useState, useEffect } from 'react';
import './SalesDetails.css';

function SalesDetails() {
  const [salesData, setSalesData] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantitySold, setQuantitySold] = useState('');
  const [token, setToken] = useState(localStorage.getItem('access_token') || ''); // JWT token

  useEffect(() => {
    // Fetch sales data
    fetch('http://localhost:8000/sales/', {
      headers: {
        'Authorization': `Bearer ${token}`, // Include JWT token
      },
    })
      .then(response => response.json())
      .then(data => setSalesData(data))
      .catch(error => console.error('Error fetching sales data:', error));

    // Fetch product data
    fetch('http://localhost:8000/products/', {
      headers: {
        'Authorization': `Bearer ${token}`, // Include JWT token
      },
    })
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, [token]);

  // Calculate total sales
  const totalSales = salesData.reduce((acc, sale) => acc + parseFloat(sale.total_amount), 0);

  // Group sales by category
  const salesByCategory = salesData.reduce((acc, sale) => {
    const product = products.find(p => p.id === sale.product);
    if (product) {
      const category = product.category;
      if (acc[category]) {
        acc[category] += parseFloat(sale.total_amount);
      } else {
        acc[category] = parseFloat(sale.total_amount);
      }
    }
    return acc;
  }, {});

  // Calculate top-selling products
  const productSales = salesData.reduce((acc, sale) => {
    const product = products.find(p => p.id === sale.product);
    if (product) {
      if (acc[product.name]) {
        acc[product.name] += sale.quantity_sold;
      } else {
        acc[product.name] = sale.quantity_sold;
      }
    }
    return acc;
  }, {});

  const topSellingProducts = Object.entries(productSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5); // Get top 5 products

  // Handle search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm)
  );

  // Handle quantity update
  const handleQuantityUpdate = (e) => {
    e.preventDefault();
    
    if (selectedProduct && quantitySold > 0) {
      const newSale = {
        product: selectedProduct.id,
        quantity_sold: quantitySold,
        total_amount: selectedProduct.price * quantitySold,
      };

      // Add a new sale entry in the backend and update the product quantity
      fetch('http://localhost:8000/sales/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include JWT token
        },
        body: JSON.stringify(newSale),
      })
        .then(response => response.json())
        .then(data => {
          setSalesData([...salesData, data]);
          // Update product quantity in the frontend
          setProducts(products.map(product =>
            product.id === selectedProduct.id
              ? { ...product, quantity: product.quantity - quantitySold }
              : product
          ));
          console.log('Sale added:', data);
        })
        .catch(error => console.error('Error adding sale:', error));

      // Reset form fields
      setQuantitySold('');
      setSelectedProduct(null);
    }
  };

  return (
    <div className="sales-details">
      <h2>Supermarket Sales Details</h2>
      <div className="sales-card">
        <h3>Total Sales</h3>
        <p>${totalSales.toFixed(2)}</p>
      </div>
      <div className="sales-card">
        <h3>Sales by Category</h3>
        <ul className="category-list">
          {Object.entries(salesByCategory).length === 0 ? (
            <li>No sales data available.</li>
          ) : (
            Object.entries(salesByCategory).map(([category, amount]) => (
              <li key={category} className="category-item">
                <span className="category-name">{category}:</span> ${amount.toFixed(2)}
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="sales-card">
        <h3>Top Selling Products</h3>
        <ul className="top-products-list">
          {topSellingProducts.length === 0 ? (
            <li>No sales data available.</li>
          ) : (
            topSellingProducts.map(([name, quantity]) => (
              <li key={name} className="top-product-item">
                <span className="product-name">{name}:</span> {quantity} units sold
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="sales-product-container">
        <div className="sales-card product-list-container">
          <h3>Search Products</h3>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <ul className="product-list">
            {filteredProducts.length === 0 ? (
              <li>No products found.</li>
            ) : (
              filteredProducts.map(product => (
                <li key={product.id} onClick={() => setSelectedProduct(product)}>
                  {product.name} - ${product.price}
                </li>
              ))
            )}
          </ul>
        </div>
        {selectedProduct && (
          <div className="sales-card update-quantity-container">
            <h3>Update Quantity for {selectedProduct.name}</h3>
            <form onSubmit={handleQuantityUpdate}>
              <label>
                Quantity Sold:
                <input
                  type="number"
                  value={quantitySold}
                  onChange={(e) => setQuantitySold(parseInt(e.target.value))}
                  min="1"
                  required
                />
              </label>
              <button type="submit">Update Quantity</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default SalesDetails;
