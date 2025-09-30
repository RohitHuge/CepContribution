import React, { useState } from 'react';

const OrdersModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 70000,
      items: [
        { name: 'MacBook Pro 13"', price: 45000, quantity: 1 },
        { name: 'iPhone 12', price: 25000, quantity: 1 }
      ],
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '2024-01-20'
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 1200,
      items: [
        { name: 'Calculus Textbook', price: 1200, quantity: 1 }
      ],
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2024-01-18'
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'processing',
      total: 3500,
      items: [
        { name: 'Study Desk', price: 3500, quantity: 1 }
      ],
      trackingNumber: null,
      estimatedDelivery: '2024-01-25'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return '✅';
      case 'shipped':
        return '🚚';
      case 'processing':
        return '⏳';
      case 'cancelled':
        return '❌';
      default:
        return '📦';
    }
  };

  const cancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setOrders(prev => 
        prev.map(order => 
          order.id === orderId 
            ? { ...order, status: 'cancelled' }
            : order
        )
      );
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div
      id="orders-modal"
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 ${isOpen ? 'flex' : 'hidden'} items-center justify-center`}
      aria-hidden={!isOpen}
    >
      <div
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-6xl relative max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="orders-title"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close Orders Modal"
        >
          ×
        </button>

        <h2 id="orders-title" className="text-2xl font-bold mb-6">
          My Orders ({orders.length})
        </h2>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-500 text-lg">No orders found</p>
            <p className="text-gray-400">Start shopping to see your orders here!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                    <p className="text-gray-500 text-sm">Placed on {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      <span className="mr-1">{getStatusIcon(order.status)}</span>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <p className="text-2xl font-bold text-[#0077be] dark:text-[#00F0FF] mt-2">
                      ₹{order.total.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Items:</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span>{item.name} (Qty: {item.quantity})</span>
                        <span className="font-medium">₹{item.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {order.trackingNumber && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-1">Tracking Number:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                      {order.trackingNumber}
                    </p>
                  </div>
                )}

                <div className="mb-4">
                  <h4 className="font-medium mb-1">Estimated Delivery:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(order.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <button className="text-[#0077be] dark:text-[#00F0FF] hover:underline text-sm">
                    View Details
                  </button>
                  
                  {order.status === 'processing' && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Cancel Order
                    </button>
                  )}
                  
                  {order.status === 'delivered' && (
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                      Leave Review
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersModal;
