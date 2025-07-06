import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import { debounce } from 'lodash'; // You might need to install lodash: npm install lodash
import { BASE_URL } from '../utils/constants.js';

const Products =() => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10; // Matches backend default limit

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(BASE_URL + '/product', {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          search: searchQuery,
          sortBy: sortBy,
          order: sortOrder,
        },
        withCredentials: true,
      });

      if (response.data.success) {
        setProducts(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setTotalItems(response.data.pagination.totalItems);
      } else {
        setError(response.data.message || 'Failed to fetch products.');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.response?.data?.message || 'Network error fetching products.');
      setProducts([]); // Clear products on error
      setTotalPages(1);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, sortBy, sortOrder]); // Dependencies for useCallback

  // Debounce search input to avoid too many API calls
  const debouncedFetchProducts = useCallback(
    debounce(() => {
      setCurrentPage(1); // Reset to first page on new search
      fetchProducts();
    }, 500), // 500ms debounce time
    [fetchProducts]
  );

  useEffect(() => {
    // Only call debounced fetch when searchQuery changes
    // or when sort parameters change directly (not debounced)
    if (searchQuery) {
        debouncedFetchProducts();
    } else {
        fetchProducts(); // For initial load or direct sort changes
    }
    return () => {
        debouncedFetchProducts.cancel(); // Clean up debounce on unmount
    };
  }, [searchQuery, sortBy, sortOrder, currentPage, fetchProducts, debouncedFetchProducts]);


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    const [field, order] = e.target.value.split(':');
    setSortBy(field);
    setSortOrder(order);
    setCurrentPage(1); // Reset to first page on sort change
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Our Products</h1>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Search products by name or description..."
          className="w-full sm:flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
          value={searchQuery}
          onChange={handleSearchChange}
          disabled={loading}
        />
        <select
          className="w-full sm:w-auto p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white"
          value={`${sortBy}:${sortOrder}`}
          onChange={handleSortChange}
          disabled={loading}
        >
          <option value="createdAt:desc">Sort By: Newest</option>
          <option value="createdAt:asc">Sort By: Oldest</option>
          <option value="price:asc">Sort By: Price (Low to High)</option>
          <option value="price:desc">Sort By: Price (High to Low)</option>
          <option value="productname:asc">Sort By: Name (A-Z)</option>
          <option value="productname:desc">Sort By: Name (Z-A)</option>
          <option value="stock:asc">Sort By: Stock (Low to High)</option>
          <option value="stock:desc">Sort By: Stock (High to Low)</option>
        </select>
      </div>

      {/* Product Display */}
      {loading ? (
        <div className="text-center text-gray-600 text-xl py-20">Loading products...</div>
      ) : error ? (
        <div className="text-center text-red-600 text-xl py-20">Error: {error}</div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 text-xl py-20">No products found matching your criteria.</div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-md"
          >
            Previous
          </button>
          <span className="text-lg font-medium text-gray-800">
            Page {currentPage} of {totalPages} ({totalItems} items)
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-md"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Products
