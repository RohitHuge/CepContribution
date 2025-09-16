import React from 'react';

const Home = ({ setIsCitizenLoggedIn }) => {
    const handleLogin = (e) => {
        e.preventDefault();
        // Dummy login logic
        setIsCitizenLoggedIn(true);
        alert('Login successful!');
    };

    return (
        <div id="login" className="tab-content active">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h2 data-i18n="welcome">Welcome to Village Portal</h2>
                    <p>Your one-stop solution for tax payments and grievance reporting.</p>
                </div>
                <div style={{ position: 'relative' }}>
                    <button id="notificationBell" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '2em', position: 'relative' }}>
                        <span title="Notifications">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9v5c0 .55-.45 1-1 1H3c-.55 0-1 .45-1 1s.45 1 1 1h18c.55 0 1-.45 1-1s-.45-1-1-1h-1c-.55 0-1-.45-1-1V9c0-3.87-3.13-7-7-7zm0 20c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"/>
                            </svg>
                        </span>
                    </button>
                    <div id="bellNotifications" style={{ display: 'none', position: 'absolute', top: '40px', right: '0', background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', minWidth: '220px', zIndex: '100', padding: '16px' }}>
                        <strong>Notifications</strong>
                        <div id="bellNotificationList">
                            <div>No new notifications.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-row" style={{ marginTop: '30px' }}>
                <div className="card">
                    <h3>🏠 Citizen Login</h3>
                    <form id="loginForm" onSubmit={handleLogin}>
                        <p>For log out refresh the page</p>
                        <div className="form-group">
                            <label htmlFor="citizenId" data-i18n="citizenIdLabel">Citizen ID / Property ID</label>
                            <input type="text" id="citizenId" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" required />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
                <div className="card">
                    <h3>📊 Quick Stats</h3>
                    <div className="tax-summary">
                        <div className="tax-item">
                            <h4>Total Properties</h4>
                            <div className="amount">1567</div>
                        </div>
                        <div className="tax-item">
                            <h4>Active Grievances</h4>
                            <div className="amount">1</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
