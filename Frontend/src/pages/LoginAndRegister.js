import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginAndRegister.css'; // Import CSS

function LoginAndRegister({ setAdminLoggedIn, setEmployeeLoggedIn }) {
  const [isAdmin, setIsAdmin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const endpoint = isAdmin ? 'admins' : 'employees';
    const response = await fetch(`http://localhost:8080/${endpoint}?username=${username}&password=${password}`);
    const data = await response.json();
    if (data.length > 0) {
      if (isAdmin) {
        setAdminLoggedIn(true);
        navigate('/admin-dashboard');
      } else {
        setEmployeeLoggedIn(true);
        navigate('/employee-dashboard');
      }
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-register">
      <div className="form-container">
        <h1>{isAdmin ? 'Admin Login' : 'Employee Login'}</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className='submit'>Login</button>
          <div className="toggle">
            <button type="button" className='but' onClick={() => setIsAdmin(!isAdmin)}>
              {isAdmin ? 'Switch to Employee Login' : 'Switch to Admin Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginAndRegister;
