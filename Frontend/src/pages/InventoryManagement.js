import React, { useState } from 'react';
import './InventoryManagement.css'; // Import the CSS file

function InventoryManagement() {
  const [stockLevels, setStockLevels] = useState([]);
  const [shipment, setShipment] = useState('');
  const [returnProduct, setReturnProduct] = useState('');
  const [reorderProduct, setReorderProduct] = useState('');

  const handleCheckStock = () => {
    // Placeholder logic for checking stock levels
    setStockLevels([{ id: 1, name: 'Product A', quantity: 100 }]);
  };

  const handleProcessShipment = () => {
    // Placeholder logic for processing shipments
    alert(`Shipment received: ${shipment}`);
  };

  const handleManageReturns = () => {
    // Placeholder logic for processing returns
    alert(`Product return processed for: ${returnProduct}`);
  };

  const handleReorder = () => {
    // Placeholder logic for reordering products
    alert(`Product reordered: ${reorderProduct}`);
  };

  return (
    <div className="inventory-management-container">
      <h1>Inventory Management</h1>
      <div className="stock-levels">
        <button onClick={handleCheckStock}>Check Stock Levels</button>
        <ul>
          {stockLevels.map(item => (
            <li key={item.id}>{item.name} - Quantity: {item.quantity}</li>
          ))}
        </ul>
      </div>
      <div className="shipment-processing">
        <label htmlFor="shipment">Incoming Shipment:</label>
        <input
          type="text"
          id="shipment"
          value={shipment}
          onChange={(e) => setShipment(e.target.value)}
        />
        <button onClick={handleProcessShipment}>Process Shipment</button>
      </div>
      <div className="product-returns">
        <label htmlFor="returnProduct">Product Return:</label>
        <input
          type="text"
          id="returnProduct"
          value={returnProduct}
          onChange={(e) => setReturnProduct(e.target.value)}
        />
        <button onClick={handleManageReturns}>Manage Returns</button>
      </div>
      <div className="reorder-product">
        <label htmlFor="reorderProduct">Reorder Product:</label>
        <input
          type="text"
          id="reorderProduct"
          value={reorderProduct}
          onChange={(e) => setReorderProduct(e.target.value)}
        />
        <button onClick={handleReorder}>Reorder Product</button>
      </div>
    </div>
  );
}

export default InventoryManagement;
