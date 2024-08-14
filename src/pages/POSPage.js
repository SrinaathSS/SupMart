import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './POSPage.css';

function POSPage() {
  const [customer, setCustomer] = useState({ name: '', email: '', contactNumber: '' });
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/products/');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleAddCustomer = async () => {
    try {
      const response = await fetch('http://localhost:8000/customers/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer),
      });
      if (response.ok) {
        alert('Customer added successfully!');
      } else {
        alert('Failed to add customer.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleProductSelect = (product) => {
    const existingProduct = selectedProducts.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
    setTotal(total + product.price);
  };

  const handleCashout = async () => {
    try {
      // Adding to the sales API
      const salesResponse = await fetch('http://localhost:8000/sales/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: selectedProducts, totalAmount: total }),
      });

      if (!salesResponse.ok) throw new Error('Failed to process sale.');

      // Update product stock in the product API
      for (const product of selectedProducts) {
        await fetch(`http://localhost:8000/products/${product.id}/`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: product.quantity - product.quantity }),
        });
      }

      // Generate PDF receipt
      generatePDFReceipt();

      alert('Sale completed successfully!');
      setSelectedProducts([]);
      setTotal(0);
    } catch (error) {
      console.error('Error during cashout:', error);
    }
  };

  const generatePDFReceipt = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Receipt', 14, 22);
    doc.setFontSize(12);
    doc.text(`Customer Name: ${customer.name}`, 14, 30);
    doc.text(`Email: ${customer.email}`, 14, 36);
    doc.text(`Contact: ${customer.contactNumber}`, 14, 42);
    
    const tableColumn = ["Product Name", "Quantity", "Price"];
    const tableRows = [];

    selectedProducts.forEach(product => {
      const productData = [
        product.name,
        product.quantity,
        product.price * product.quantity,
      ];
      tableRows.push(productData);
    });

    doc.autoTable({
      startY: 50,
      head: [tableColumn],
      body: tableRows,
    });

    doc.text(`Total: $${total}`, 14, doc.autoTable.previous.finalY + 10);
    doc.save('receipt.pdf');
  };

  return (
    <div className="pos-page">
      <h2>Point of Sale (POS)</h2>

      {/* Customer Section */}
      <div className="customer-section">
        <h3>Add Customer</h3>
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={customer.name}
          onChange={handleCustomerChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Customer Email"
          value={customer.email}
          onChange={handleCustomerChange}
        />
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={customer.contactNumber}
          onChange={handleCustomerChange}
        />
        <button onClick={handleAddCustomer}>Add Customer</button>
      </div>

      {/* Product Selection */}
      <div className="product-selection">
        <h3>Select Products</h3>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <span>{product.name} - ${product.price}</span>
              <button onClick={() => handleProductSelect(product)}>Add to Order</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Order Summary and Cashout */}
      <div className="order-summary">
        <h3>Order Summary</h3>
        <ul>
          {selectedProducts.map((product) => (
            <li key={product.id}>
              {product.name} x {product.quantity} - ${product.price * product.quantity}
            </li>
          ))}
        </ul>
        <h3>Total: ${total}</h3>
        <button onClick={handleCashout}>Cashout</button>
      </div>
    </div>
  );
}

export default POSPage;
