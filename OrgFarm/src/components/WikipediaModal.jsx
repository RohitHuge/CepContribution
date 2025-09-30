import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WikipediaModal = ({ isOpen, onClose, searchQuery }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchWikipedia = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setSearchResults([data]);
      } else {
        // If direct page not found, try search API
        const searchResponse = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(query)}&srlimit=3&origin=*`
        );
        
        if (searchResponse.ok) {
          const searchData = await searchResponse.json();
          if (searchData.query.search.length > 0) {
            // Get summaries for the top search results
            const summaries = await Promise.all(
              searchData.query.search.slice(0, 3).map(async (result) => {
                try {
                  const summaryResponse = await fetch(
                    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(result.title)}`
                  );
                  if (summaryResponse.ok) {
                    return await summaryResponse.json();
                  }
                } catch (err) {
                  console.error('Error fetching summary:', err);
                }
                return null;
              })
            );
            setSearchResults(summaries.filter(Boolean));
          } else {
            setError('No results found for your search.');
          }
        } else {
          setError('Failed to search Wikipedia. Please try again.');
        }
      }
    } catch (err) {
      console.error('Wikipedia search error:', err);
      setError('Failed to connect to Wikipedia. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isOpen && searchQuery) {
      searchWikipedia(searchQuery);
    }
  }, [isOpen, searchQuery]);

  const handleClose = () => {
    setSearchResults([]);
    setError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Wikipedia Search Results</h2>
                <button
                  onClick={handleClose}
                  className="text-white hover:text-green-200 transition-colors text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              <p className="text-green-100 mt-2">
                Results for: <span className="font-semibold">"{searchQuery}"</span>
              </p>
            </div>

            {/* Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {loading && (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                  <span className="ml-3 text-gray-600">Searching Wikipedia...</span>
                </div>
              )}

              {error && (
                <div className="text-center py-8">
                  <div className="text-red-500 text-lg mb-2">⚠️</div>
                  <p className="text-gray-600">{error}</p>
                </div>
              )}

              {!loading && !error && searchResults.length > 0 && (
                <div className="space-y-4">
                  {searchResults.map((result, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <h3 className="text-xl font-bold text-green-800 mb-2">
                        {result.title}
                      </h3>
                      {result.thumbnail && (
                        <img
                          src={result.thumbnail.source}
                          alt={result.title}
                          className="float-right ml-4 mb-2 w-24 h-24 object-cover rounded"
                        />
                      )}
                      <p className="text-gray-700 leading-relaxed">
                        {result.extract}
                      </p>
                      <a
                        href={result.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-green-600 hover:text-green-800 font-semibold transition-colors"
                      >
                        Read more on Wikipedia →
                      </a>
                    </motion.div>
                  ))}
                </div>
              )}

              {!loading && !error && searchResults.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-4">🔍</div>
                  <p className="text-gray-600">No results found. Try a different search term.</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WikipediaModal;
