import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

function Navbar({ isAdminLoggedIn, isEmployeeLoggedIn, setAdminLoggedIn, setEmployeeLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAdminLoggedIn(false);
    setEmployeeLoggedIn(false);
    navigate('/');
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className={`navbar ${isOpen ? 'open' : 'closed'}`}>
        <button onClick={toggleNavbar} className="toggle-button">
          {isOpen ? '<<' : '>>'}
        </button>
        <ul>
          {isAdminLoggedIn && (
            <>
              <li><Link to="/admin-dashboard"><span className="icon">🏠</span><span className="text">Dashboard</span></Link></li>
              <li><Link to="/inventory"><span className="icon">📦</span><span className="text">Inventory</span></Link></li>
              <li><Link to="/salesdetails"><span className="icon">💳</span><span className="text">Sales Details</span></Link></li>
              <li><Link to="/customer"><span className="icon">👤</span><span className="text">Customer</span></Link></li>
              <li><Link to="/reports"><span className="icon">📊</span><span className="text">Reports</span></Link></li>
              <li><Link to="/employee-management"><span className="icon">🧑‍💼</span><span className="text">Employee Management</span></Link></li>
              <li><div onClick={handleLogout} className="logout-button"><span className="icon">🚪</span><span className="text">Logout</span></div></li>
            </>
          )}
          {isEmployeeLoggedIn && (
            <>
              <li><Link to="/employee-dashboard"><span className="icon">🏠</span><span className="text">Dashboard</span></Link></li>
              <li><Link to="/inventory"><span className="icon">📦</span><span className="text">Inventory</span></Link></li>
              <li><Link to="/salesdetails"><span className="icon">💳</span><span className="text">Sales Details</span></Link></li>
              <li><Link to="/customer"><span className="icon">👤</span><span className="text">Customer</span></Link></li>
              <li><div onClick={handleLogout} className="logout-button"><span className="icon">🚪</span><span className="text">Logout</span></div></li>
            </>
          )}
          {!isAdminLoggedIn && !isEmployeeLoggedIn && (
            <li><Link to="/" className="login-button"><span className="icon">🔐</span><span className="text">Login</span></Link></li>
          )}
        </ul>
      </nav>
      <div className={` ${isOpen ? 'content-shift' : ''}`}>
        {/* Your page content goes here */}
      </div>
    </>
  );
}

export default Navbar;
