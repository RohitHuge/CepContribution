import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark">
      <Link className="navbar-brand grow" to="/">gotLost</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item grow">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item grow">
            <Link className="nav-link" to="/lost">Lost</Link>
          </li>
          <li className="nav-item grow">
            <Link className="nav-link" to="/found">Found</Link>
          </li>
          <li className="nav-item grow">
            <Link className="nav-link" to="/about">About Us</Link>
          </li>
          <li className="nav-item grow">
            <Link className="nav-link" to="/contact">Contact Us</Link>
          </li>
        </ul>

        <div className="d-flex">
          {isAuthenticated ? (
            <div className="d-flex align-items-center">
              <span className="text-light me-3">
                <i className="fas fa-user me-1"></i>
                {user?.name || 'User'}
              </span>
              <button 
                className="btn btn-outline-light btn-sm" 
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="d-flex">
              <Link to="/login" className="btn btn-outline-light btn-sm me-2">
                <i className="fas fa-sign-in-alt me-1"></i>Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                <i className="fas fa-user-plus me-1"></i>Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
