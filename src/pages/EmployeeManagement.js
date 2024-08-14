import React, { useState, useEffect } from 'react';
import './EmployeeManagement.css'; // Import CSS for Employee Management

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ username: '', email: '', contact_number: '', role: 'Cashier' });
  const [editEmployee, setEditEmployee] = useState(null); // State for the employee being edited
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [token, setToken] = useState(localStorage.getItem('access_token') || ''); // Retrieve token from localStorage

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/employees/', {
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
          throw new Error(`Error fetching employees: ${response.statusText}`);
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [token]);

  const handleRoleChange = async (id, newRole) => {
    try {
      const response = await fetch(`http://localhost:8000/employees/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include JWT token
        },
        body: JSON.stringify({ role: newRole }),
      });
      if (!response.ok) throw new Error(`Error updating role: ${response.statusText}`);
      const updatedEmployee = await response.json();
      setEmployees(employees.map(employee =>
        employee.id === id ? updatedEmployee : employee
      ));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8000/employees/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Include JWT token
        },
      });
      setEmployees(employees.filter(employee => employee.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/employees/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include JWT token
        },
        body: JSON.stringify(newEmployee),
      });
      if (!response.ok) throw new Error(`Error adding employee: ${response.statusText}`);
      const addedEmployee = await response.json();
      setEmployees([...employees, addedEmployee]);
      setNewEmployee({ username: '', email: '', contact_number: '', role: 'Cashier' });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editEmployee) return;
    try {
      const response = await fetch(`http://localhost:8000/employees/${editEmployee.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include JWT token
        },
        body: JSON.stringify(editEmployee),
      });
      if (!response.ok) throw new Error(`Error updating employee: ${response.statusText}`);
      const updatedEmployee = await response.json();
      setEmployees(employees.map(emp => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
      setEditEmployee(null); // Clear edit state
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="employee-management">
      <h1>Employee Management</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      <table className="employee-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.username}</td>
              <td>{employee.email}</td>
              <td>{employee.contact_number}</td>
              <td>
                <select
                  value={employee.role}
                  onChange={(e) => handleRoleChange(employee.id, e.target.value)}
                >
                  <option value="Cashier">Cashier</option>
                  <option value="Supply Manager">Supply Manager</option>
                  <option value="Inventory Manager">Inventory Manager</option>
                  <option value="Sales Employee">Sales Employee</option>
                  <option value="Stocks Manager">Stocks Manager</option>
                </select>
              </td>
              <td>
                <button onClick={() => setEditEmployee(employee)}>Edit</button>
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form className="add-employee-form" onSubmit={handleAdd}>
        <h2>Add Employee</h2>
        <input
          type="text"
          placeholder="Username"
          value={newEmployee.username}
          onChange={(e) => setNewEmployee({ ...newEmployee, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newEmployee.email}
          onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={newEmployee.contact_number}
          onChange={(e) => setNewEmployee({ ...newEmployee, contact_number: e.target.value })}
          required
        />
        <select
          value={newEmployee.role}
          onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
        >
          <option value="Cashier">Cashier</option>
          <option value="Supply Manager">Supply Manager</option>
          <option value="Inventory Manager">Inventory Manager</option>
          <option value="Sales Employee">Sales Employee</option>
          <option value="Stocks Manager">Stocks Manager</option>
        </select>
        <button type="submit">Add Employee</button>
      </form>
      {editEmployee && (
        <form className="edit-employee-form" onSubmit={handleUpdate}>
          <h2>Update Employee</h2>
          <input
            type="text"
            placeholder="Username"
            value={editEmployee.username}
            onChange={(e) => setEditEmployee({ ...editEmployee, username: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={editEmployee.email}
            onChange={(e) => setEditEmployee({ ...editEmployee, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={editEmployee.contact_number}
            onChange={(e) => setEditEmployee({ ...editEmployee, contact_number: e.target.value })}
            required
          />
          <select
            value={editEmployee.role}
            onChange={(e) => setEditEmployee({ ...editEmployee, role: e.target.value })}
          >
            <option value="Cashier">Cashier</option>
            <option value="Supply Manager">Supply Manager</option>
            <option value="Inventory Manager">Inventory Manager</option>
            <option value="Sales Employee">Sales Employee</option>
            <option value="Stocks Manager">Stocks Manager</option>
          </select>
          <button type="submit">Update Employee</button>
        </form>
      )}
    </div>
  );
}

export default EmployeeManagement;
