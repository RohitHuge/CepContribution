import React from 'react';
import { useApp } from '../contexts/AppContext';

const CartModal = () => {
  const { state, updateCartItem, removeFromCart, openModal, closeModal } = useApp();
  const { cart, activeModal } = state;
  const isOpen = activeModal === 'cart-modal';

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    updateCartItem(id, newQuantity);
  };

  const removeItem = (id) => {
    removeFromCart(id);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const proceedToCheckout = () => {
    // Close cart modal
    closeModal();
    
    // Open checkout modal
    openModal('checkout-modal');
  };

  return (
    <div
      id="cart-modal"
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 ${isOpen ? 'flex' : 'hidden'} items-center justify-center`}
      aria-hidden={!isOpen}
    >
      <div
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl relative max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close Cart Modal"
        >
          ×
        </button>

        <h2 id="cart-title" className="text-2xl font-bold mb-6">
          Shopping Cart ({getTotalItems()} items)
        </h2>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <p className="text-gray-400">Add some items to get started!</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs">IMG</span>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-500 text-sm">Seller: {item.seller}</p>
                    <p className="text-[#0077be] dark:text-[#00F0FF] font-bold text-lg">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold">Total:</span>
                <span className="text-2xl font-bold text-[#0077be] dark:text-[#00F0FF]">
                  ₹{getTotalPrice().toLocaleString()}
                </span>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={closeModal}
                  className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={proceedToCheckout}
                  className="flex-1 bg-[#0077be] dark:bg-[#00F0FF] text-white py-3 px-4 rounded-lg hover:bg-[#005a8b] dark:hover:bg-[#00b8cc] transition-colors font-medium"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
