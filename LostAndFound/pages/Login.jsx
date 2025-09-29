import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../src/contexts/AuthContext';
import '../src/components/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/'); // Redirect to home page after successful login
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <h2>Login Page</h2><br />
      {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
      <form id="login" method="get" onSubmit={handleSubmit}>
        <label><b>Email</b></label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br /><br />
        <label><b>Password</b></label>
        <input 
          type="password" 
          name="password" 
          id="Pass" 
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br /><br />
        <input 
          type="submit" 
          name="log" 
          id="log" 
          value={loading ? "Logging in..." : "Log In Here"}
          disabled={loading}
        />
        <br /><br />
        <div style={{textAlign: 'center', marginTop: '20px'}}>
          <p>Don't have an account? <Link to="/register" style={{color: '#007bff', textDecoration: 'none'}}>Register here</Link></p>
        </div>
        {/* <input 
          type="checkbox" 
          id="check"
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleChange}
        />
        <span>Remember me</span>
        <br /><br />
        <Link to="#">Forgot Password</Link> */}
      </form>
    </div>
  );
};

export default Login;
