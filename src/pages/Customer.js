import React, { useState, useEffect } from 'react';
import './Customer.css'; // Import CSS for Customer

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [updatedCustomer, setUpdatedCustomer] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [token, setToken] = useState(localStorage.getItem('access_token') || ''); // Retrieve token from localStorage

  // Fetch customers from the backend
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/customers/', {
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
          throw new Error(`Error fetching customers: ${response.statusText}`);
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [token]);

  const handleEdit = (customer) => {
    setEditingCustomer(customer.id);
    setUpdatedCustomer({ ...customer });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8000/customers/${editingCustomer}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include JWT token
        },
        body: JSON.stringify(updatedCustomer),
      });
      if (!response.ok) throw new Error(`Error updating customer: ${response.statusText}`);
      const data = await response.json();
      setCustomers(customers.map(customer => (customer.id === editingCustomer ? data : customer)));
      setEditingCustomer(null);
      setUpdatedCustomer({});
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8000/customers/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Include JWT token
        },
      });
      setCustomers(customers.filter(customer => customer.id !== id));
      alert('Customer deleted successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="customer">
      <h1>Customers</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}
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
                  value={updatedCustomer.purchase_details}
                  onChange={(e) => setUpdatedCustomer({ ...updatedCustomer, purchase_details: e.target.value })}
                  placeholder="Purchase Details"
                />
                <input
                  type="date"
                  value={updatedCustomer.last_purchase_date}
                  onChange={(e) => setUpdatedCustomer({ ...updatedCustomer, last_purchase_date: e.target.value })}
                />
                <input
                  type="text"
                  value={updatedCustomer.total_spent}
                  onChange={(e) => setUpdatedCustomer({ ...updatedCustomer, total_spent: e.target.value })}
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
                <p><strong>Purchase Details:</strong> {customer.purchase_details}</p>
                <p><strong>Last Purchase Date:</strong> {customer.last_purchase_date}</p>
                <p><strong>Total Spent:</strong> {customer.total_spent}</p>
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
