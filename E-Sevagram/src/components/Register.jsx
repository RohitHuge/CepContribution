import React from 'react';

const Register = () => {
    const handleRegister = (e) => {
        e.preventDefault();
        alert('Registration successful!');
    };

    return (
        <div id="register" className="tab-content active">
            <h2>Register New Citizen</h2>
            <form id="registerForm" onSubmit={handleRegister}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="regName">Full Name</label>
                        <input type="text" id="regName" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="regFatherName">Father's Name</label>
                        <input type="text" id="regFatherName" required />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="regPhone">Phone Number</label>
                        <input type="tel" id="regPhone" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="regEmail">Email</label>
                        <input type="email" id="regEmail" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="regAddress">Address</label>
                    <textarea id="regAddress" rows="3" required></textarea>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="regPropertyId">Property ID</label>
                        <input type="text" id="regPropertyId" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="regAadhaar">Aadhaar Number</label>
                        <input type="text" id="regAadhaar" required />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="regPassword">Create Password</label>
                    <input type="password" id="regPassword" required />
                </div>
                <button type="submit" className="btn btn-success">Register</button>
            </form>
        </div>
    );
};

export default Register;
