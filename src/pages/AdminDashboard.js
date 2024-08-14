import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Import CSS

function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    sales: {
      total: 0,
      category: {},
      topSelling: [], // Ensure this is initialized as an empty array
      trends: '',
    },
    inventory: {
      totalValue: 0,
      lowStock: 0,
      fastMoving: [], // Ensure this is initialized as an empty array
      slowMoving: [], // Ensure this is initialized as an empty array
    },
    customers: {
      total: 0,
      active: 0,
      demographics: {
        female: 0,
        male: 0,
      },
    },
    employees: {
      total: 0,
      attendance: {
        present: 0,
        absent: 0,
      },
      performance: '',
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [token, setToken] = useState(localStorage.getItem('access_token') || ''); // Retrieve token from localStorage

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Sales Data
        const salesResponse = await fetch('http://localhost:8000/sales', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include JWT token
          },
        });
        if (!salesResponse.ok) throw new Error(`Error fetching sales data: ${salesResponse.statusText}`);
        const salesData = await salesResponse.json();

        // Fetch Inventory Data
        const inventoryResponse = await fetch('http://localhost:8000/products', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include JWT token
          },
        });
        if (!inventoryResponse.ok) throw new Error(`Error fetching inventory data: ${inventoryResponse.statusText}`);
        const products = await inventoryResponse.json();
        const lowStock = products.filter(product => product.quantity < 10).length;
        const totalValue = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
        const fastMoving = products.filter(product => product.quantity > 50).map(product => product.name);
        const slowMoving = products.filter(product => product.quantity < 10).map(product => product.name);

        // Fetch Customers Data
        const customersResponse = await fetch('http://localhost:8000/customers', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include JWT token
          },
        });
        if (!customersResponse.ok) throw new Error(`Error fetching customers data: ${customersResponse.statusText}`);
        const customers = await customersResponse.json();
        const activeCustomers = customers.filter(customer => customer.isActive).length;

        // Fetch Employees Data
        const employeesResponse = await fetch('http://localhost:8000/employees', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include JWT token
          },
        });
        if (!employeesResponse.ok) throw new Error(`Error fetching employees data: ${employeesResponse.statusText}`);
        const employees = await employeesResponse.json();
        const present = employees.filter(employee => employee.attendance === 'present').length;
        const absent = employees.filter(employee => employee.attendance === 'absent').length;

        // Update state with fetched data
        setData({
          sales: {
            total: salesData.totalSales || 0,
            category: salesData.salesByCategory || {}, // Ensure default value
            topSelling: salesData.topSellingProducts || [], // Ensure it's always an array
            trends: salesData.salesTrends || '',
          },
          inventory: {
            totalValue,
            lowStock,
            fastMoving: fastMoving || [], // Ensure it's always an array
            slowMoving: slowMoving || [], // Ensure it's always an array
          },
          customers: {
            total: customers.length,
            active: activeCustomers,
            demographics: {
              female: (customers.filter(customer => customer.gender === 'female').length / customers.length) * 100 || 0,
              male: (customers.filter(customer => customer.gender === 'male').length / customers.length) * 100 || 0,
            },
          },
          employees: {
            total: employees.length,
            attendance: {
              present,
              absent,
            },
            performance: employees.performance || '', // Ensure default value
          },
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleAddProduct = () => {
    navigate('/inventory');
  };

  const handleManageEmployees = () => {
    navigate('/employee-management');
  };

  return (
    <div className="dashboard admin-dashboard">
      <h1>Welcome Admin<br />Admin Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2>Sales Overview</h2>
          <p>Total Sales: ${data.sales.total.toFixed(2)}</p>
          <p>
            Sales by Category: {Object.entries(data.sales.category).length ?
              Object.entries(data.sales.category).map(([category, amount]) => `${category}: $${amount.toFixed(2)}`).join(', ')
              : 'No data available'}
          </p>
          <p>
            Top-Selling Products: {data.sales.topSelling.length ?
              data.sales.topSelling.map(([name, quantity]) => `${name}: ${quantity} units sold`).join(', ')
              : 'No data available'}
          </p>
          <p>Sales Trends: {data.sales.trends || 'No data available'}</p>
        </div>
        <div className="dashboard-card">
          <h2>Inventory Overview</h2>
          <p>Total Stock Value: ${data.inventory.totalValue.toFixed(2)}</p>
          <p>Low Stock Items: {data.inventory.lowStock}</p>
          <p>Fast-Moving Items: {data.inventory.fastMoving.length ?
            data.inventory.fastMoving.join(', ')
            : 'No data available'}</p>
          <p>Slow-Moving Items: {data.inventory.slowMoving.length ?
            data.inventory.slowMoving.join(', ')
            : 'No data available'}</p>
        </div>
        <div className="dashboard-card">
          <h2>Customer Overview</h2>
          <p>Total Customers: {data.customers.total}</p>
          <p>Active Customers: {data.customers.active}</p>
          <p>
            Customer Demographics: {data.customers.demographics.female.toFixed(2)}% Female, {data.customers.demographics.male.toFixed(2)}% Male
          </p>
        </div>
        <div className="dashboard-card">
          <h2>Employee Overview</h2>
          <p>Total Employees: {data.employees.total}</p>
          <p>
            Attendance: {data.employees.attendance.present} Present, {data.employees.attendance.absent} Absent
          </p>
          <p>Performance Metrics: {data.employees.performance || 'No data available'}</p>
        </div>
        <div className="dashboard-card">
          <h2>Quick Actions</h2>
          <button onClick={handleAddProduct}>Add Product</button>
          <button onClick={handleManageEmployees}>Manage Employees</button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
