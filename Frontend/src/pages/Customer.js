import React, { useState, useEffect } from 'react';
import './Customer.css'; // Import CSS for Customer

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [updatedCustomer, setUpdatedCustomer] = useState({});

  useEffect(() => {
    // Fetch customers from json-server
    fetch('http://localhost:8080/customers')
      .then(response => response.json())
      .then(data => setCustomers(data))
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  const handleEdit = (customer) => {
    setEditingCustomer(customer.id);
    setUpdatedCustomer({ ...customer });
  };

  const handleUpdate = () => {
    fetch(`http://localhost:8080/customers/${editingCustomer}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCustomer),
    })
      .then(response => response.json())
      .then(data => {
        setCustomers(customers.map(customer => (customer.id === editingCustomer ? data : customer)));
        setEditingCustomer(null);
        setUpdatedCustomer({});
      })
      .catch(error => console.error('Error updating customer:', error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/customers/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setCustomers(customers.filter(customer => customer.id !== id));
        alert('Customer deleted successfully');
      })
      .catch(error => console.error('Error deleting customer:', error));
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="customer">
      <h1>Customers</h1>
      <input
        type="text"
        placeholder="Search customers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <ul className="customer-list">
        {filteredCustomers.map(customer => (
          <li key={customer.id} className="customer-card">
            {editingCustomer === customer.id ? (
              <>
                <input
                  type="text"
                  value={updatedCustomer.name}
                  onChange={(e) => setUpdatedCustomer({ ...updatedCustomer, name: e.target.value })}
                  placeholder="Name"
                />
                <input
                  type="email"
                  value={updatedCustomer.email}
                  onChange={(e) => setUpdatedCustomer({ ...updatedCustomer, email: e.target.value })}
                  placeholder="Email"
                />
                <input
                  type="text"
                  value={updatedCustomer.mobile}
                  onChange={(e) => setUpdatedCustomer({ ...updatedCustomer, mobile: e.target.value })}
                  placeholder="Mobile"
                />
                <input
                  type="text"
                  value={updatedCustomer.address}
                  onChange={(e) => setUpdatedCustomer({ ...updatedCustomer, address: e.target.value })}
                  placeholder="Address"
                />
                <input
                  type="text"
                  value={updatedCustomer.purchaseDetails}
                  onChange={(e) => setUpdatedCustomer({ ...updatedCustomer, purchaseDetails: e.target.value })}
                  placeholder="Purchase Details"
                />
                <input
                  type="date"
                  value={updatedCustomer.lastPurchaseDate}
                  onChange={(e) => setUpdatedCustomer({ ...updatedCustomer, lastPurchaseDate: e.target.value })}
                />
                <input
                  type="text"
                  value={updatedCustomer.totalSpent}
                  onChange={(e) => setUpdatedCustomer({ ...updatedCustomer, totalSpent: e.target.value })}
                  placeholder="Total Spent"
                />
                <button className="update-button" onClick={handleUpdate}>Update</button>
                <button className="cancel-button" onClick={() => setEditingCustomer(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h2 className="customer-name">{customer.name}</h2>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Mobile:</strong> {customer.mobile}</p>
                <p><strong>Address:</strong> {customer.address}</p>
                <p><strong>Purchase Details:</strong> {customer.purchaseDetails}</p>
                <p><strong>Last Purchase Date:</strong> {customer.lastPurchaseDate}</p>
                <p><strong>Total Spent:</strong> {customer.totalSpent}</p>
                <button className="edit-button" onClick={() => handleEdit(customer)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(customer.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Customer;
