import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { getProducts, getProductImageUrls, parseProductImages, getCategories } from '../lib/appwrite';

const Hub = () => {
  const { state, addToCart, openModal } = useApp();
  const { categories, cart } = state;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dbCategories, setDbCategories] = useState([]);

  // Load categories from database on component mount
  useEffect(() => {
    loadDbCategories();
  }, []);

  const loadDbCategories = async () => {
    try {
      const response = await getCategories();
      setDbCategories(response.documents);
      console.log('Database categories loaded:', response.documents);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Find the corresponding database category
    const dbCategory = dbCategories.find(dbCat => 
      dbCat.name.toLowerCase() === category.name.toLowerCase()
    );
    
    if (dbCategory) {
      console.log('Found database category:', dbCategory);
      loadItemsForCategory(dbCategory.$id);
    } else {
      console.log('No database category found for:', category.name);
      // Fallback: try to load all products and filter manually
      loadAllProductsAndFilter(category.name);
    }
  };

  const loadAllProductsAndFilter = async (categoryName) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Loading all products and filtering by category name:', categoryName);
      
      const response = await getProducts({ isAvailable: true });
      console.log('All products loaded:', response.documents);
      
      // Find the database category that matches the name
      const dbCategory = dbCategories.find(dbCat => 
        dbCat.name.toLowerCase() === categoryName.toLowerCase()
      );
      
      let filteredProducts = [];
      if (dbCategory) {
        // Filter by category ID
        filteredProducts = response.documents.filter(product => product.category === dbCategory.$id);
        console.log('Filtered by category ID:', dbCategory.$id, 'Found:', filteredProducts.length);
      } else {
        // If no database category found, show all products
        filteredProducts = response.documents;
        console.log('No database category found, showing all products');
      }
      
      const products = filteredProducts.map(product => ({
        id: product.$id,
        name: product.name,
        price: product.price,
        condition: product.condition,
        seller: product.sellerName,
        category: product.category,
        description: product.description,
        location: product.location,
        contactInfo: product.contactInfo,
        isAvailable: product.isAvailable,
        views: product.views || 0,
        likes: product.likes || 0,
        images: parseProductImages(product.images),
        imageUrls: getProductImageUrls(product.images)
      }));
      
      console.log('Processed products:', products);
      setItems(products);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products for this category.');
    } finally {
      setLoading(false);
    }
  };

  const loadItemsForCategory = async (categoryId) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Loading products for category ID:', categoryId);
      
      const response = await getProducts({ 
        category: categoryId,
        isAvailable: true 
      });
      
      console.log('Products response:', response);
      console.log('Number of products found:', response.documents.length);
      
      const products = response.documents.map(product => ({
        id: product.$id,
        name: product.name,
        price: product.price,
        condition: product.condition,
        seller: product.sellerName,
        category: product.category,
        description: product.description,
        location: product.location,
        contactInfo: product.contactInfo,
        isAvailable: product.isAvailable,
        views: product.views || 0,
        likes: product.likes || 0,
        images: parseProductImages(product.images),
        imageUrls: getProductImageUrls(product.images)
      }));
      
      console.log('Processed products:', products);
      setItems(products);
    } catch (err) {
      console.error('Error loading products for category:', err);
      setError('Failed to load products for this category.');
    } finally {
      setLoading(false);
    }
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
          
          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0077be] dark:border-[#00F0FF] mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Loading products...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
                <button
                  onClick={() => loadItemsForCategory(selectedCategory.id)}
                  className="bg-[#0077be] dark:bg-[#00F0FF] text-white px-4 py-2 rounded-lg hover:bg-[#005a8b] dark:hover:bg-[#00b8cc] transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div key={item.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                  <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center relative">
                    {item.imageUrls && item.imageUrls.length > 0 && item.imageUrls[0] ? (
                      <img
                        src={item.imageUrls[0]}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg" style={{ display: item.imageUrls && item.imageUrls[0] ? 'none' : 'flex' }}>
                      <span className="text-gray-400">No Image</span>
                    </div>
                  </div>
                <h4 className="font-bold text-lg mb-2">{item.name}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{item.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-[#0077be] dark:text-[#00F0FF]">
                    ₹{item.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">Condition: {item.condition}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
                  <span>📍 {item.location}</span>
                  <span>👁️ {item.views} views</span>
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
          )}

          {/* No Items State */}
          {!loading && !error && items.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No items found in this category.</p>
            </div>
          )}
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
