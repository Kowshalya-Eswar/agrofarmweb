import React, { useEffect, useState } from 'react';
// Ensure ProductCard.jsx is correctly located at src/components/ProductCard.jsx
// The path '../components/ProductCard.jsx' is correct if HomePage.jsx is in src/pages/
import ProductCard from '../components/ProductCard.jsx';
import axios from 'axios';
import { BASE_URL } from '../utils/constants.js';
const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productError, setProductError] = useState(null);

  // Fetch a few featured products for the home page
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoadingProducts(true);
      setProductError(null);
      try {
        // Fetch products with a limit for featured display
        const response = await axios.get(BASE_URL + '/product?limit=4&sortBy=createdAt&order=desc', {
          withCredentials: true // If products API requires auth, otherwise remove
        });
        if (response.data.success) {
          setFeaturedProducts(response.data.data);
        } else {
          setProductError(response.data.message || 'Failed to fetch featured products.');
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setProductError(error.response?.data?.message || 'Network error fetching featured products.');
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchFeaturedProducts();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-emerald-800 text-white py-24 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 animate-fadeInDown">
            Fresh & Organic Goodness Delivered
          </h1>
          <p className="text-lg md:text-xl mb-10 opacity-90 animate-fadeInUp">
            Your trusted source for farm-fresh produce and healthy living.
          </p>
          <a
            href="/products"
            className="inline-block bg-white text-green-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 animate-fadeInUp"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white shadow-inner">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Featured Products</h2>
          {loadingProducts ? (
            <div className="text-center text-gray-600 text-xl">Loading featured products...</div>
          ) : productError ? (
            <div className="text-center text-red-600 text-xl">Error: {productError}</div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.sku} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 text-xl">No featured products found.</div>
          )}
          <div className="text-center mt-12">
            <a
              href="/products"
              className="inline-block text-lg font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
            >
              View All Products &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* About Us/Mission Section */}
      <section className="py-16 bg-gradient-to-bl from-blue-50 to-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              At AgriFarm Store, we are passionate about connecting you directly with the freshest, highest-quality organic produce from local farms. We believe in sustainable practices, fair trade, and providing transparent access to healthy food for everyone.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-4">
              Every purchase supports local farmers and helps build a healthier, more sustainable community.
            </p>
          </div>
          <div className="relative">
             <img
                src="https://placehold.co/600x400/ADFF2F/228B22?text=Fresh+Harvest"
                alt="Fresh Harvest"
                className="rounded-xl shadow-xl w-full h-auto object-cover transform transition-transform duration-300 hover:scale-102"
              />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
