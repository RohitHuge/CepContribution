import React from 'react';

const AdminLoginModal = ({ setShowAdminLoginModal, setIsAdminLoggedIn, setActiveTab }) => {
    const handleAdminLogin = () => {
        // Dummy admin login logic
        setIsAdminLoggedIn(true);
        setShowAdminLoginModal(false);
        setActiveTab('admin');
        alert('Admin login successful!');
    };

    return (
        <div id="adminLoginModal" style={{ display: 'flex', position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: '10000', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', maxWidth: '350px', margin: 'auto', textAlign: 'center', position: 'relative' }}>
                <h3>Admin Login</h3>
                <div className="form-group">
                    <label htmlFor="adminIdInput">Admin ID</label>
                    <input type="text" id="adminIdInput" placeholder="Enter Admin ID" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
                </div>
                <div className="form-group">
                    <label htmlFor="adminPasswordInput">Password</label>
                    <input type="password" id="adminPasswordInput" placeholder="Enter Password" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }} />
                </div>
                <button className="btn btn-success" id="adminLoginBtn" onClick={handleAdminLogin}>Login</button>
                <button className="btn btn-warning" id="closeAdminLoginModalBtn" style={{ marginLeft: '10px' }} onClick={() => setShowAdminLoginModal(false)}>Cancel</button>
            </div>
        </div>
    );
};

export default AdminLoginModal;
