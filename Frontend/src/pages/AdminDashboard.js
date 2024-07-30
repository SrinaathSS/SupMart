import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Import CSS

function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    sales: {
      total: 12345,
      category: 5678,
      topSelling: ['Product A', 'Product B'],
      trends: 'Upward',
    },
    inventory: {
      totalValue: 45678,
      lowStock: 15,
      fastMoving: ['Product C', 'Product D'],
      slowMoving: ['Product E', 'Product F'],
    },
    customers: {
      total: 1234,
      active: 1000,
      demographics: {
        female: 60,
        male: 40,
      },
    },
    employees: {
      total: 50,
      attendance: {
        present: 45,
        absent: 5,
      },
      performance: 'Excellent',
    },
    notifications: [
      'Low Stock Alert: Product G',
      'Order Cancellation: Order #1235',
      'New Customer Registration: John Doe',
    ],
    recentActivity: [
      'Order #1234 processed',
      'Product #5678 added',
      'Employee Jane Doe logged in',
    ],
    newProduct: {
      name: '',
      price: 0,
      quantity: 0,
    },
  });

  const handleAddProduct = () => {
    navigate('/inventory');
  };

  const handleManageEmployees = () => {
    navigate('/employee-management');
  };

  return (
    <div className="dashboard admin-dashboard">
      <h1>Welcome Admin<br/>Admin Dashboard</h1>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2>Sales Overview</h2>
          <p>Total Sales: ${data.sales.total}</p>
          <p>Sales by Category: ${data.sales.category}</p>
          <p>Top-Selling Products: {data.sales.topSelling.join(', ')}</p>
          <p>Sales Trends: {data.sales.trends}</p>
        </div>
        <div className="dashboard-card">
          <h2>Inventory Overview</h2>
          <p>Total Stock Value: ${data.inventory.totalValue}</p>
          <p>Low Stock Items: {data.inventory.lowStock}</p>
          <p>Fast-Moving Items: {data.inventory.fastMoving.join(', ')}</p>
          <p>Slow-Moving Items: {data.inventory.slowMoving.join(', ')}</p>
        </div>
        <div className="dashboard-card">
          <h2>Customer Overview</h2>
          <p>Total Customers: {data.customers.total}</p>
          <p>Active Customers: {data.customers.active}</p>
          <p>
            Customer Demographics: {data.customers.demographics.female}% Female, {data.customers.demographics.male}% Male
          </p>
        </div>
        <div className="dashboard-card">
          <h2>Employee Overview</h2>
          <p>Total Employees: {data.employees.total}</p>
          <p>
            Attendance: {data.employees.attendance.present} Present, {data.employees.attendance.absent} Absent
          </p>
          <p>Performance Metrics: {data.employees.performance}</p>
        </div>
        <div className="dashboard-card">
          <h2>Quick Actions</h2>
          <button onClick={handleAddProduct}>Add Product</button>
          <button onClick={handleManageEmployees}>Manage Employees</button>
        </div>
        <div className="dashboard-card">
          <h2>Notifications</h2>
          <ul>
            {data.notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))}
          </ul>
        </div>
        <div className="dashboard-card">
          <h2>Recent Activity</h2>
          <ul>
            {data.recentActivity.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
