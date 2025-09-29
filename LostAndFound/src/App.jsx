import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from '../pages/Home';
import LostForm from '../pages/LostForm';
import FoundForm from '../pages/FoundForm';
import Register from '../pages/Register';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import Login from '../pages/Login';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lost" element={<LostForm />} />
            <Route path="/found" element={<FoundForm />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;