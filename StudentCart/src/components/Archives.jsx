import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { getProducts, getProductImageUrls, parseProductImages } from '../lib/appwrite';

const Archives = () => {
  const { addToCart } = useApp();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [dbCategories, setDbCategories] = useState([]);
  const [categories, setCategories] = useState([
    { value: 'all', label: 'All Categories' }
  ]);

  useEffect(() => {
    loadDbCategories();
    loadProducts();
  }, []);

  const loadDbCategories = async () => {
    try {
      const response = await getCategories();
      setDbCategories(response.documents);
      
      // Update categories dropdown with database categories
      const categoryOptions = [
        { value: 'all', label: 'All Categories' },
        ...response.documents.map(cat => ({
          value: cat.$id,
          label: cat.name
        }))
      ];
      setCategories(categoryOptions);
      console.log('Categories updated:', categoryOptions);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getProducts();
      console.log('All products loaded:', response.documents);
      
      // Log unique categories found
      const categories = [...new Set(response.documents.map(p => p.category))];
      console.log('Categories found in database:', categories);
      
      const products = response.documents.map(product => ({
        id: product.$id,
        name: product.name,
        price: product.price,
        condition: product.condition,
        seller: product.sellerName,
        category: product.category,
        datePosted: product.createdAt,
        description: product.description,
        location: product.location,
        contactInfo: product.contactInfo,
        isAvailable: product.isAvailable,
        views: product.views || 0,
        likes: product.likes || 0,
        images: parseProductImages(product.images),
        imageUrls: getProductImageUrls(product.images)
      }));
      
      setItems(products);
      setFilteredItems(products);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = items;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by availability
    filtered = filtered.filter(item => item.isAvailable);

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.datePosted) - new Date(a.datePosted);
        case 'oldest':
          return new Date(a.datePosted) - new Date(b.datePosted);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    setFilteredItems(filtered);
  }, [items, selectedCategory, searchTerm, sortBy]);

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <section id="archives" className="min-h-screen py-20">
      <h2 className="text-4xl md:text-6xl font-black mb-12 text-center font-['Orbitron'] uppercase">
        THE ARCHIVES
      </h2>
      
      {/* Filters */}
      <div className="bg-white/80 dark:bg-[#0D0D0D]/80 backdrop-blur-sm p-4 rounded-lg shadow-md mb-8 flex flex-wrap gap-4 items-center justify-center">
        <div className="flex-grow min-w-48">
          <label htmlFor="category-filter" className="block text-sm font-medium mb-1">
            Filter by Category
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded-md shadow-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-grow min-w-48">
          <label htmlFor="search-input" className="block text-sm font-medium mb-1">
            Search Items
          </label>
          <input
            id="search-input"
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md shadow-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex-grow min-w-48">
          <label htmlFor="sort-select" className="block text-sm font-medium mb-1">
            Sort By
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border rounded-md shadow-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

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
              onClick={loadProducts}
              className="bg-[#0077be] dark:bg-[#00F0FF] text-white px-4 py-2 rounded-lg hover:bg-[#005a8b] dark:hover:bg-[#00b8cc] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Items Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center relative">
                {item.imageUrls && item.imageUrls.length > 0 && item.imageUrls[0] ? (
                  <img
                    src={item.imageUrls[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="absolute inset-0 flex items-center justify-center" style={{ display: item.imageUrls && item.imageUrls[0] ? 'none' : 'flex' }}>
                  <span className="text-gray-400">No Image</span>
                </div>
              </div>
            
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                {item.description}
              </p>
              
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl font-bold text-[#0077be] dark:text-[#00F0FF]">
                  ₹{item.price.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {item.condition}
                </span>
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>By {item.seller}</span>
                <span>{new Date(item.datePosted).toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
                <span>📍 {item.location}</span>
                <span>👁️ {item.views} views</span>
              </div>
              
              <button
                onClick={() => handleAddToCart(item)}
                className="w-full bg-[#0077be] dark:bg-[#00F0FF] text-white py-2 px-4 rounded-lg hover:bg-[#005a8b] dark:hover:bg-[#00b8cc] transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
        </div>
      )}

      {!loading && !error && filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items found matching your criteria.</p>
        </div>
      )}
    </section>
  );
};

export default Archives;
