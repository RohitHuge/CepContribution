import React from 'react';

const NavigationBar = ({ activeTab, onTabClick }) => {
    return (
        <div className="nav-tabs">
            <button className={`nav-tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => onTabClick('login')}>🏠 Home</button>
            <button className={`nav-tab ${activeTab === 'register' ? 'active' : ''}`} onClick={() => onTabClick('register')}>📝 Register</button>
            <button className={`nav-tab ${activeTab === 'tax-payment' ? 'active' : ''}`} onClick={() => onTabClick('tax-payment')}>💳 Pay Tax</button>
            <button className={`nav-tab ${activeTab === 'grievance' ? 'active' : ''}`} onClick={() => onTabClick('grievance')}>📋 Report Issue</button>
            <button className={`nav-tab ${activeTab === 'track' ? 'active' : ''}`} onClick={() => onTabClick('track')}>🔍 Track Status</button>
            <button className={`nav-tab ${activeTab === 'admin' ? 'active' : ''}`} onClick={() => onTabClick('admin')}>👨‍💼 Admin</button>
        </div>
    );
};

export default NavigationBar;
