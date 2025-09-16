import React from 'react';

const Header = () => {
    const changeLanguage = () => {
        // Implement language change logic here
    };

    return (
        <div className="header">
            <h1>🏛️ E-Sevagram</h1>
            <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                <select id="languageSelector" onChange={changeLanguage}>
                    <option value="en">English</option>
                    <option value="mr">मराठी</option>
                </select>
            </div>
            <p>Seamless Tax Collection & Grievance Management System</p>
        </div>
    );
};

export default Header;
