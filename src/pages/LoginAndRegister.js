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
  
    try {
      // Request the JWT token
      const tokenResponse = await fetch('http://localhost:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!tokenResponse.ok) {
        throw new Error('Failed to obtain token');
      }
  
      const { access, refresh } = await tokenResponse.json();
  
      // Store the tokens
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
  
      // Fetch user data
      const userResponse = await fetch(`http://localhost:8000/${endpoint}/`, {
        headers: {
          'Authorization': `Bearer ${access}`,
        },
      });
  
      if (userResponse.ok) {
        const data = await userResponse.json();
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
      } else {
        alert('Error fetching user data');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      alert('An error occurred while connecting to the server');
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
