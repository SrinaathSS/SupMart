import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginAndRegister from './pages/LoginAndRegister';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Customer from './pages/Customer';
import SalesDetails from './pages/SalesDetails';
import Reports from './pages/Reports';
import User from './pages/EmployeeManagement';
import Inventory from './pages/InventoryPage';
import './App.css';

function App() {
  const [isAdminLoggedIn, setAdminLoggedIn] = useState(false);
  const [isEmployeeLoggedIn, setEmployeeLoggedIn] = useState(false);

  return (
    <Router>
      <div className='App'>
        <Navbar 
          isAdminLoggedIn={isAdminLoggedIn} 
          isEmployeeLoggedIn={isEmployeeLoggedIn} 
          setAdminLoggedIn={setAdminLoggedIn} 
          setEmployeeLoggedIn={setEmployeeLoggedIn}
        />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<LoginAndRegister setAdminLoggedIn={setAdminLoggedIn} setEmployeeLoggedIn={setEmployeeLoggedIn} />} />
            {isAdminLoggedIn && (
              <>
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/salesdetails" element={<SalesDetails />} />
                <Route path="/customer" element={<Customer />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/employee-management" element={<User />} />
                <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
              </>
            )}
            {isEmployeeLoggedIn && (
              <>
                <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/salesdetails" element={<SalesDetails />} />
                <Route path="/customer" element={<Customer />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
