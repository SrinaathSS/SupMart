import React, { useState } from 'react';
import './CustomerManagement.css'; // Import the CSS file

function CustomerManagement() {
  const [inquiry, setInquiry] = useState('');
  const [complaint, setComplaint] = useState('');
  const [returnRequest, setReturnRequest] = useState('');

  const handleAssistCustomer = () => {
    // Placeholder logic for assisting customers
    alert(`Customer inquiry: ${inquiry}`);
  };

  const handleHandleComplaint = () => {
    // Placeholder logic for handling complaints
    alert(`Customer complaint: ${complaint}`);
  };

  const handleProcessReturn = () => {
    // Placeholder logic for processing returns
    alert(`Customer return processed for: ${returnRequest}`);
  };

  return (
    <div className="customer-management-container">
      <h1>Customer Management</h1>
      <div className="customer-inquiries">
        <label htmlFor="inquiry">Customer Inquiry:</label>
        <input
          type="text"
          id="inquiry"
          value={inquiry}
          onChange={(e) => setInquiry(e.target.value)}
        />
        <button className='Cbut' onClick={handleAssistCustomer}>Assist Customer</button>
      </div>
      <div className="customer-complaints">
        <label htmlFor="complaint">Customer Complaint:</label>
        <input
          type="text"
          id="complaint"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        />
        <button className='Cbut' onClick={handleHandleComplaint}>Handle Complaint</button>
      </div>
      <div className="customer-returns">
        <label htmlFor="returnRequest">Product Return Request:</label>
        <input
          type="text"
          id="returnRequest"
          value={returnRequest}
          onChange={(e) => setReturnRequest(e.target.value)}
        />
        <button className='Cbut' onClick={handleProcessReturn}>Process Return</button>
      </div>
    </div>
  );
}

export default CustomerManagement;
