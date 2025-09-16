import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import Register from './components/Register';
import TaxPayment from './components/TaxPayment';
import Grievance from './components/Grievance';
import TrackStatus from './components/TrackStatus';
import Admin from './components/Admin';
import UpiModal from './components/UpiModal';
import AdminLoginModal from './components/AdminLoginModal';
import './index.css';

const App = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [isCitizenLoggedIn, setIsCitizenLoggedIn] = useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [showUpiModal, setShowUpiModal] = useState(false);
    const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);

    const handleTabClick = (tabId) => {
        const requiresCitizenLogin = ['tax-payment', 'grievance', 'track'].includes(tabId);
        if (requiresCitizenLogin && !isCitizenLoggedIn) {
            alert('Please login to access this feature.');
            setActiveTab('login');
            return;
        }

        if (tabId === 'admin' && !isAdminLoggedIn) {
            setShowAdminLoginModal(true);
            return;
        }
        setActiveTab(tabId);
    };

    return (
        <div className="container">
            <Header />
            <NavigationBar activeTab={activeTab} onTabClick={handleTabClick} />
            <div id="notification" className="notification"></div>
            {activeTab === 'login' && <Home setIsCitizenLoggedIn={setIsCitizenLoggedIn} />}
            {activeTab === 'register' && <Register />}
            {activeTab === 'tax-payment' && <TaxPayment setShowUpiModal={setShowUpiModal} />}
            {activeTab === 'grievance' && <Grievance />}
            {activeTab === 'track' && <TrackStatus />}
            {activeTab === 'admin' && <Admin />}
            {showUpiModal && <UpiModal setShowUpiModal={setShowUpiModal} />}
            {showAdminLoginModal && <AdminLoginModal setShowAdminLoginModal={setShowAdminLoginModal} setIsAdminLoggedIn={setIsAdminLoggedIn} setActiveTab={setActiveTab} />}
        </div>
    );
};

export default App;