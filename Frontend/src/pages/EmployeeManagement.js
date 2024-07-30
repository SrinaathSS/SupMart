import React, { useState, useEffect } from 'react';
import './EmployeeManagement.css'; // Import CSS for Employee Management

function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ username: '', email: '', contactNumber: '', role: 'Cashier' });
  const [editEmployee, setEditEmployee] = useState(null); // State for the employee being edited

  useEffect(() => {
    fetch('http://localhost:8080/employees')
      .then(response => response.json())
      .then(data => setEmployees(data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const handleRoleChange = (id, newRole) => {
    const updatedEmployees = employees.map(employee =>
      employee.id === id ? { ...employee, role: newRole } : employee
    );
    setEmployees(updatedEmployees);
    fetch(`http://localhost:8080/employees/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role: newRole }),
    }).catch(error => console.error('Error updating role:', error));
  };

  const handleDelete = id => {
    setEmployees(employees.filter(employee => employee.id !== id));
    fetch(`http://localhost:8080/employees/${id}`, {
      method: 'DELETE',
    }).catch(error => console.error('Error deleting employee:', error));
  };

  const handleAdd = e => {
    e.preventDefault();
    fetch('http://localhost:8080/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmployee),
    })
      .then(response => response.json())
      .then(addedEmployee => {
        setEmployees([...employees, addedEmployee]);
        setNewEmployee({ username: '', email: '', contactNumber: '', role: 'Cashier' });
      })
      .catch(error => console.error('Error adding employee:', error));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editEmployee) return;
    fetch(`http://localhost:8080/employees/${editEmployee.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editEmployee),
    })
      .then(response => response.json())
      .then(updatedEmployee => {
        setEmployees(employees.map(emp => (emp.id === updatedEmployee.id ? updatedEmployee : emp)));
        setEditEmployee(null); // Clear edit state
      })
      .catch(error => console.error('Error updating employee:', error));
  };

  return (
    <div className="employee-management">
      <h1>Employee Management</h1>
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
              <td>{employee.contactNumber}</td>
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
          value={newEmployee.contactNumber}
          onChange={(e) => setNewEmployee({ ...newEmployee, contactNumber: e.target.value })}
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
            value={editEmployee.contactNumber}
            onChange={(e) => setEditEmployee({ ...editEmployee, contactNumber: e.target.value })}
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
