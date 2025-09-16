import React from 'react';

const Admin = () => {
    const showAdminFunction = (func) => {
        // Implement admin function logic here
    };

    const sendAdminMessage = () => {
        // Implement send admin message logic here
    };

    return (
        <div id="admin" className="tab-content active">
            <h2>Admin Dashboard</h2>
            <div className="admin-stats">
                <div className="stat-card">
                    <h3>Total Properties</h3>
                    <div className="number">0</div>
                </div>
                <div className="stat-card">
                    <h3>Tax Collected</h3>
                    <div className="number">₹0</div>
                </div>
                <div className="stat-card">
                    <h3>Pending Grievances</h3>
                    <div className="number">0</div>
                </div>
                <div className="stat-card">
                    <h3>Resolved This Month</h3>
                    <div className="number">0</div>
                </div>
            </div>
            <div className="form-row">
                <div className="card">
                    <h3>Admin Actions</h3>
                    <button className="btn btn-primary" onClick={() => showAdminFunction('users')}>Manage Users</button>
                    <button className="btn btn-primary" onClick={() => showAdminFunction('taxes')}>Tax Management</button>
                    <button className="btn btn-primary" onClick={() => showAdminFunction('grievances')}>Grievance Management</button>
                    <div style={{ marginTop: '24px' }}>
                        <input type="text" id="adminMessageInput" placeholder="Type message to user..." style={{ width: '70%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginRight: '8px' }} />
                        <button className="btn btn-warning" onClick={sendAdminMessage}>Send Message to User</button>
                    </div>
                </div>
            </div>
            <div id="adminDynamicContent" className="card" style={{ marginTop: '20px' }}>
                <p>Select an admin action to view data.</p>
            </div>
        </div>
    );
};

export default Admin;
