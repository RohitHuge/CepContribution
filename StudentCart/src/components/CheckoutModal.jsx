import React, { useState } from 'react';

const CheckoutModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [orderSummary, setOrderSummary] = useState({
    items: [
      { name: 'MacBook Pro 13"', price: 45000, quantity: 1 },
      { name: 'iPhone 12', price: 25000, quantity: 1 }
    ],
    subtotal: 70000,
    shipping: 100,
    tax: 7000,
    total: 77100
  });

  const addresses = [
    {
      id: 1,
      name: 'John Doe',
      phone: '+91 98765 43210',
      address: '123 Main Street, Apartment 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      isDefault: true
    },
    {
      id: 2,
      name: 'John Doe',
      phone: '+91 98765 43210',
      address: '456 College Road, Room 205',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
      isDefault: false
    }
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'upi', name: 'UPI', icon: '📱' },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
    { id: 'cod', name: 'Cash on Delivery', icon: '💰' }
  ];

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setStep(2);
  };

  const handlePaymentSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handlePlaceOrder = () => {
    // Handle order placement logic here
    console.log('Order placed:', {
      address: selectedAddress,
      paymentMethod: selectedPaymentMethod,
      orderSummary
    });
    
    // Show success message and close modal
    alert('Order placed successfully!');
    setIsOpen(false);
    setStep(1);
    setSelectedAddress(null);
    setSelectedPaymentMethod('');
  };

  const closeModal = () => {
    setIsOpen(false);
    setStep(1);
    setSelectedAddress(null);
    setSelectedPaymentMethod('');
  };

  return (
    <div
      id="checkout-modal"
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 ${isOpen ? 'flex' : 'hidden'} items-center justify-center`}
      aria-hidden={!isOpen}
    >
      <div
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl relative max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close Checkout Modal"
        >
          ×
        </button>

        <h2 id="checkout-title" className="text-2xl font-bold mb-6">
          Checkout
        </h2>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 1 ? 'bg-[#0077be] dark:bg-[#00F0FF] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-[#0077be] dark:bg-[#00F0FF]' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 2 ? 'bg-[#0077be] dark:bg-[#00F0FF] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            }`}>
              2
            </div>
            <div className={`w-16 h-1 ${step >= 3 ? 'bg-[#0077be] dark:bg-[#00F0FF]' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 3 ? 'bg-[#0077be] dark:bg-[#00F0FF] text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            }`}>
              3
            </div>
          </div>
        </div>

        {/* Step 1: Address Selection */}
        {step === 1 && (
          <div>
            <h3 className="text-xl font-bold mb-6">Select Delivery Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  onClick={() => handleAddressSelect(address)}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedAddress?.id === address.id
                      ? 'border-[#0077be] dark:border-[#00F0FF] bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg">{address.name}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{address.phone}</p>
                      <p className="text-gray-600 dark:text-gray-300">{address.address}</p>
                      <p className="text-gray-600 dark:text-gray-300">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                    </div>
                    {address.isDefault && (
                      <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full text-xs font-medium">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Payment Method */}
        {step === 2 && (
          <div>
            <h3 className="text-xl font-bold mb-6">Select Payment Method</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => handlePaymentSelect(method.id)}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedPaymentMethod === method.id
                      ? 'border-[#0077be] dark:border-[#00F0FF] bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{method.icon}</span>
                    <span className="font-medium">{method.name}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedPaymentMethod}
                className="bg-[#0077be] dark:bg-[#00F0FF] text-white py-2 px-6 rounded-lg hover:bg-[#005a8b] dark:hover:bg-[#00b8cc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Order Summary */}
        {step === 3 && (
          <div>
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
            
            {/* Selected Address */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-semibold mb-2">Delivery Address:</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {selectedAddress?.name}, {selectedAddress?.phone}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {selectedAddress?.address}, {selectedAddress?.city}, {selectedAddress?.state} - {selectedAddress?.pincode}
              </p>
            </div>

            {/* Payment Method */}
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-semibold mb-2">Payment Method:</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
              </p>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h4 className="font-semibold mb-4">Order Items:</h4>
              <div className="space-y-2">
                {orderSummary.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span>{item.name} (Qty: {item.quantity})</span>
                    <span className="font-medium">₹{item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{orderSummary.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>₹{orderSummary.shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>₹{orderSummary.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 dark:border-gray-700 pt-2">
                  <span>Total:</span>
                  <span className="text-[#0077be] dark:text-[#00F0FF]">
                    ₹{orderSummary.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(2)}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handlePlaceOrder}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
