import React, { useState, useEffect } from 'react';
import lostItemsService from '../src/services/lostItemsService';
import LostItemCard from '../src/components/LostItemCard';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import '../src/components/FoundForm.css';

const FoundForm = () => {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('lost');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'documents', label: 'Documents' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'books', label: 'Books' },
    { value: 'other', label: 'Other' }
  ];

  const statuses = [
    { value: 'lost', label: 'Lost Items' },
    { value: 'found', label: 'Found Items' },
    { value: 'returned', label: 'Returned Items' }
  ];

  useEffect(() => {
    fetchLostItems();
  }, [selectedCategory, selectedStatus]);

  const fetchLostItems = async () => {
    try {
      setLoading(true);
      setError('');
      
      let result;
      if (selectedCategory === 'all') {
        result = await lostItemsService.getLostItemsByStatus(selectedStatus);
      } else {
        // For now, we'll get all items and filter by category on frontend
        // In a real app, you might want to create a more specific API call
        result = await lostItemsService.getLostItemsByStatus(selectedStatus);
        if (result.success) {
          result.documents = result.documents.filter(item => item.category === selectedCategory);
        }
      }
      
      if (result.success) {
        setLostItems(result.documents);
      } else {
        setError('Failed to fetch lost items');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchLostItems();
      return;
    }

    try {
      setLoading(true);
      setError('');
      const result = await lostItemsService.searchLostItems(searchTerm);
      
      if (result.success) {
        // Filter by status and category
        let filteredItems = result.documents.filter(item => item.status === selectedStatus);
        if (selectedCategory !== 'all') {
          filteredItems = filteredItems.filter(item => item.category === selectedCategory);
        }
        setLostItems(filteredItems);
      } else {
        setError('Search failed');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleContact = (item) => {
    // You can implement contact functionality here
    // For now, we'll just show an alert
    alert(`Contacting ${item.contact_name} at ${item.contact_email}`);
  };

  return (
    <>
      <Navbar />
      <main>
        <section>
          <div className="container-fluid py-5">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h1 className="text-center mb-4">
                    <i className="fas fa-search me-3"></i>
                    Found Something? Check Here!
                  </h1>
                  <p className="text-center text-muted mb-5">
                    Browse through lost items to see if you can help someone find their belongings
                  </p>
                </div>
              </div>

              {/* Search and Filter Section */}
              <div className="row mb-4">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-md-4">
                          <label htmlFor="searchInput" className="form-label">
                            <i className="fas fa-search me-2"></i>Search Items
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="searchInput"
                            placeholder="Search by item name, description, or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                          />
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="categorySelect" className="form-label">
                            <i className="fas fa-tags me-2"></i>Category
                          </label>
                          <select
                            className="form-select"
                            id="categorySelect"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                          >
                            {categories.map(category => (
                              <option key={category.value} value={category.value}>
                                {category.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-3">
                          <label htmlFor="statusSelect" className="form-label">
                            <i className="fas fa-filter me-2"></i>Status
                          </label>
                          <select
                            className="form-select"
                            id="statusSelect"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                          >
                            {statuses.map(status => (
                              <option key={status.value} value={status.value}>
                                {status.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-2 d-flex align-items-end">
                          <button
                            className="btn btn-primary w-100"
                            onClick={handleSearch}
                            disabled={loading}
                          >
                            {loading ? (
                              <i className="fas fa-spinner fa-spin me-2"></i>
                            ) : (
                              <i className="fas fa-search me-2"></i>
                            )}
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="alert alert-danger" role="alert">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      {error}
                    </div>
                  </div>
                </div>
              )}

              {/* Loading State */}
              {loading && (
                <div className="row">
                  <div className="col-12 text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading lost items...</p>
                  </div>
                </div>
              )}

              {/* No Items Found */}
              {!loading && lostItems.length === 0 && !error && (
                <div className="row">
                  <div className="col-12 text-center py-5">
                    <i className="fas fa-search fa-3x text-muted mb-3"></i>
                    <h4 className="text-muted">No items found</h4>
                    <p className="text-muted">
                      {searchTerm ? 'Try adjusting your search terms' : 'No lost items match your current filters'}
                    </p>
                  </div>
                </div>
              )}

              {/* Lost Items Grid */}
              {!loading && lostItems.length > 0 && (
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5>
                        <i className="fas fa-list me-2"></i>
                        {lostItems.length} item{lostItems.length !== 1 ? 's' : ''} found
                      </h5>
                    </div>
                  </div>
                  {lostItems.map((item) => (
                    <div key={item.$id} className="col-lg-4 col-md-6 mb-4">
                      <LostItemCard 
                        item={item} 
                        onContact={handleContact}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default FoundForm;
