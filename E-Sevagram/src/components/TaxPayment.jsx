import React, { useState } from 'react';

const TaxPayment = ({ setShowUpiModal }) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const handlePayment = (e) => {
        e.preventDefault();
        if (selectedPaymentMethod === 'upi') {
            setShowUpiModal(true);
        } else {
            alert('Payment successful!');
        }
    };

    return (
        <div id="tax-payment" className="tab-content active">
            <h2>Tax Payment Portal</h2>
            <form id="paymentForm" onSubmit={handlePayment}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="payPropertyId">Property ID</label>
                        <input type="text" id="payPropertyId" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="payAmount">Amount</label>
                        <input type="number" id="payAmount" required />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="payTaxType">Tax Type</label>
                    <select id="payTaxType" required>
                        <option value="">Select Tax Type</option>
                        <option value="property">Property Tax</option>
                        <option value="water">Water Tax</option>
                        <option value="sanitation">Sanitation Tax</option>
                        <option value="all">All Taxes</option>
                    </select>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="bankName">Bank Name</label>
                        <input type="text" id="bankName" placeholder="Enter Bank Name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="accountNumber">Account Number</label>
                        <input type="text" id="accountNumber" placeholder="Enter Account Number" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ifsc">IFSC Code</label>
                        <input type="text" id="ifsc" placeholder="Enter IFSC Code" required />
                    </div>
                </div>
                <h3>Payment Method</h3>
                <div className="payment-methods">
                    <div className={`payment-method ${selectedPaymentMethod === 'upi' ? 'selected' : ''}`} onClick={() => setSelectedPaymentMethod('upi')}>
                        <div>💳 UPI</div>
                    </div>
                    <div className={`payment-method ${selectedPaymentMethod === 'card' ? 'selected' : ''}`} onClick={() => setSelectedPaymentMethod('card')}>
                        <div>💳 Credit/Debit Card</div>
                    </div>
                    <div className={`payment-method ${selectedPaymentMethod === 'netbanking' ? 'selected' : ''}`} onClick={() => setSelectedPaymentMethod('netbanking')}>
                        <div>🏦 Net Banking</div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" id="proceedPaymentBtn">Proceed to Payment</button>
            </form>
        </div>
    );
};

export default TaxPayment;
