import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';

const Archives = () => {
  const { addToCart } = useApp();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'books', label: 'Books' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'clothing', label: 'Clothing' }
  ];

  useEffect(() => {
    // Load mock data
    const mockItems = [
      {
        id: 1,
        name: 'MacBook Pro 13"',
        price: 45000,
        condition: 'Excellent',
        seller: 'John Doe',
        category: 'electronics',
        datePosted: '2024-01-15',
        image: '/api/placeholder/300/200',
        description: 'M1 chip, 8GB RAM, 256GB SSD. Barely used, perfect condition.'
      },
      {
        id: 2,
        name: 'iPhone 12',
        price: 25000,
        condition: 'Good',
        seller: 'Jane Smith',
        category: 'electronics',
        datePosted: '2024-01-14',
        image: '/api/placeholder/300/200',
        description: '128GB, Space Gray. Some minor scratches on screen.'
      },
      {
        id: 3,
        name: 'Calculus Textbook',
        price: 1200,
        condition: 'Good',
        seller: 'Mike Johnson',
        category: 'books',
        datePosted: '2024-01-13',
        image: '/api/placeholder/300/200',
        description: 'Calculus: Early Transcendentals, 8th Edition'
      },
      {
        id: 4,
        name: 'Study Desk',
        price: 3500,
        condition: 'Excellent',
        seller: 'Sarah Wilson',
        category: 'furniture',
        datePosted: '2024-01-12',
        image: '/api/placeholder/300/200',
        description: 'Wooden study desk with drawers. Perfect for dorm room.'
      }
    ];
    setItems(mockItems);
    setFilteredItems(mockItems);
  }, []);

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
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

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

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400">Image Placeholder</span>
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

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items found matching your criteria.</p>
        </div>
      )}
    </section>
  );
};

export default Archives;
