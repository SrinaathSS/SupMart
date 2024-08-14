import React from 'react';
import './EmployeeDashboard.css'; // Import CSS

function EmployeeDashboard() {
  return (
    <div className="dashboard employee-dashboard">
      <h1>Employee Dashboard</h1>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2>Today's Tasks</h2>
          <ul>
            <li>Process sales transactions</li>
            <li>Restock shelves</li>
            <li>Assist customers</li>
          </ul>
        </div>
        <div className="dashboard-card">
          <h2>Sales Summary</h2>
          <p>Total Sales Today: $5,678</p>
          <p>Transactions Completed: 20</p>
        </div>
        <div className="dashboard-card">
          <h2>Customer Feedback</h2>
          <ul>
            <li>Customer #1234: Positive</li>
            <li>Customer #5678: Neutral</li>
            <li>Customer #91011: Negative</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
