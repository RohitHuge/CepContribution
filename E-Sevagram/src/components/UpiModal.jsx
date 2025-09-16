import React from 'react';

const UpiModal = ({ setShowUpiModal }) => {
    const handlePaymentDone = () => {
        setShowUpiModal(false);
        alert('Payment successful!');
    };

    return (
        <div id="upiModal" style={{ display: 'flex', position: 'fixed', top: '0', left: '0', width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: '9999', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', maxWidth: '370px', margin: 'auto', textAlign: 'center', position: 'relative' }}>
                <h3>UPI Payment</h3>
                <div id="qrSection" style={{ display: 'block' }}>
                    <img src="qr.jpg" alt="UPI QR Code" style={{ width: '200px', height: '200px', margin: '20px 0' }} />
                    <div style={{ color: '#b71c1c', background: '#fff3cd', border: '1px solid #ffeeba', borderRadius: '8px', padding: '10px 12px', marginBottom: '10px', fontSize: '0.98em' }}>
                        <strong>Notice:</strong> If you click 'Payment Done' without actually paying the tax, you will be required to pay extra some charges.
                    </div>
                    <button className="btn btn-success" id="qrPaidBtn" style={{ marginTop: '15px' }} onClick={handlePaymentDone}>Payment Done</button>
                </div>
                <button className="btn btn-warning" id="closeUpiModalBtn" style={{ marginLeft: '10px', marginTop: '15px' }} onClick={() => setShowUpiModal(false)}>Cancel</button>
            </div>
        </div>
    );
};

export default UpiModal;
