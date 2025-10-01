import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { state, toggleDarkMode, openModal } = useApp();
  const { isDarkMode, cartCount } = state;
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenModal = (modalId) => {
    openModal(modalId);
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleAuthClick = () => {
    navigate('/auth');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 dark:bg-[#0D0D0D]/80 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-black tracking-widest text-[#0077be] dark:text-[#00F0FF] font-['Orbitron']">
          Student Cart
        </h1>
        
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('hub')}
            className="text-sm uppercase tracking-wider hover:text-[#0077be] dark:hover:text-[#00F0FF] transition-colors"
          >
            The Hub
          </button>
          <button 
            onClick={() => scrollToSection('archives')}
            className="text-sm uppercase tracking-wider hover:text-[#0077be] dark:hover:text-[#00F0FF] transition-colors"
          >
            The Archives
          </button>
          {/* Video Calls - COMMENTED OUT */}
          {/* <button 
            onClick={() => scrollToSection('video-section')}
            className="text-sm uppercase tracking-wider hover:text-[#0077be] dark:hover:text-[#00F0FF] transition-colors"
          >
            Video Calls
          </button> */}
          <button 
            onClick={() => handleOpenModal('orders-modal')}
            className="text-sm uppercase tracking-wider hover:text-[#0077be] dark:hover:text-[#00F0FF] transition-colors"
          >
            My Orders
          </button>
          {/* <button 
            onClick={() => handleOpenModal('address-modal')}
            className="text-sm uppercase tracking-wider hover:text-[#0077be] dark:hover:text-[#00F0FF] transition-colors"
          >
            My Addresses
          </button> */}
          {!isAuthenticated ? (
            <button 
              onClick={handleAuthClick}
              className="text-sm uppercase tracking-wider hover:text-[#0077be] dark:hover:text-[#00F0FF] transition-colors"
            >
              Login
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/upload')}
                className="bg-[#0077be] dark:bg-[#00F0FF] text-white px-4 py-2 rounded-lg hover:bg-[#005a8b] dark:hover:bg-[#00b8cc] transition-colors text-sm font-medium"
              >
                Sell Item
              </button>
              <span className="text-sm">Welcome, {user?.name || 'User'}</span>
              <button 
                onClick={handleLogout}
                className="text-sm uppercase tracking-wider hover:text-[#0077be] dark:hover:text-[#00F0FF] transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-2xl">
          ☰
        </button>

        {/* Theme toggle */}
        <button 
          onClick={toggleDarkMode}
          className="ml-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </nav>
    </header>
  );
};

export default Header;
