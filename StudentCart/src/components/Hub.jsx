import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';

const Hub = () => {
  const { state, addToCart, openModal } = useApp();
  const { categories, cart } = state;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Load items for this category
    loadItemsForCategory(category.id);
  };

  const loadItemsForCategory = (categoryId) => {
    // Mock data - in real app, this would be an API call
    const mockItems = [
      {
        id: 1,
        name: 'MacBook Pro 13"',
        price: 45000,
        condition: 'Excellent',
        seller: 'John Doe',
        image: '/api/placeholder/300/200',
        description: 'M1 chip, 8GB RAM, 256GB SSD'
      },
      {
        id: 2,
        name: 'iPhone 12',
        price: 25000,
        condition: 'Good',
        seller: 'Jane Smith',
        image: '/api/placeholder/300/200',
        description: '128GB, Space Gray'
      }
    ];
    setItems(mockItems);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const handleOpenCart = () => {
    openModal('cart-modal');
  };

  return (
    <section id="hub" className="min-h-screen py-20">
      <h2 className="text-4xl md:text-6xl font-black mb-4 font-['Orbitron'] uppercase">
        MARKETPLACE ONLINE
      </h2>
      <p className="text-lg text-gray-400 mb-12 max-w-3xl">
        A premium command center for buying and selling second-hand student essentials. 
        No fluff. No noise. Just the gear you need.
      </p>
      
      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className={`bg-gradient-to-br ${category.color} p-8 rounded-xl cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
          >
            <div className="text-4xl mb-4">{category.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
            <p className="text-white/80 text-sm">{category.description}</p>
          </div>
        ))}
      </div>

      {/* Items Display */}
      {selectedCategory && (
        <div className="bg-white/80 dark:bg-[#0D0D0D]/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-6">
            {selectedCategory.name} Items
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Image Placeholder</span>
                </div>
                <h4 className="font-bold text-lg mb-2">{item.name}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{item.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-[#0077be] dark:text-[#00F0FF]">
                    ₹{item.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">Condition: {item.condition}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Seller: {item.seller}</span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-[#0077be] dark:bg-[#00F0FF] text-white px-4 py-2 rounded-lg hover:bg-[#005a8b] dark:hover:bg-[#00b8cc] transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6">
          <button
            onClick={handleOpenCart}
            className="bg-[#0077be] dark:bg-[#00F0FF] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
          >
            <span>🛒</span>
            <span>Cart ({cart.length})</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default Hub;
