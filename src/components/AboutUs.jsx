import React from 'react';

const AboutUs = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-lg mt-8 font-inter">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">About Us - Welcome to cocoFields!</h1>

      <p className="mb-6 text-lg text-gray-700 leading-relaxed">
        At <a href="/" className="text-indigo-600 hover:underline font-semibold">cocoFields</a>, we are passionate about bringing the pure goodness of coconuts directly from our farms to your home. We believe in transparency, sustainability, and providing you with the highest quality coconut products, harvested with care and respect for nature.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Our Mission Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">
            Our mission is simple: to connect you with authentic, farm-fresh coconut products. We meticulously oversee every step, from cultivation on our fields to processing, ensuring that every product retains its natural purity, rich flavor, and nutritional benefits. We aim to support local farming communities and promote sustainable agricultural practices that benefit both people and the planet.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Farm-to-Table Freshness:</strong> Directly sourced from our own and partnered farms.</li>
            <li><strong>Quality Assurance:</strong> Rigorous checks to ensure purity and taste.</li>
            <li><strong>Sustainable Practices:</strong> Committed to eco-friendly farming and ethical sourcing.</li>
          </ul>
        </div>

        {/* Our Products Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Products</h2>
          <p className="mb-4 text-gray-700 leading-relaxed">
            We specialize in a diverse range of coconut products, all derived from coconuts directly harvested from our lush farms. From refreshing coconut water and virgin coconut oil to versatile coconut flour and delicious coconut milk, each item is crafted to bring the natural goodness of the coconut to your kitchen and lifestyle. Explore our collection and discover the difference of truly farm-fresh ingredients.
          </p>
          <img
            // IMPORTANT: Replace this URL with the actual URL of your image hosted online.
            src="/images/products.webp"
            alt="Assortment of cocoFields coconut products including oil, water, and flour."
            className="w-full h-auto rounded-lg shadow-md object-cover mt-4"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x250/cccccc/333333?text=Image+Not+Available"; }}
          />
          <p className="text-xs text-gray-500 mt-2 text-center">
          </p>
        </div>
      </div>

      {/* Knowledge Hub Section */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-inner mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Knowledge Hub: Coconut Information & Articles</h2>
        <p className="mb-4 text-gray-700 leading-relaxed">
          Beyond selling products, <a href="/" className="text-indigo-600 hover:underline font-semibold">cocoFields</a> is dedicated to being your go-to resource for all things coconut. We are constantly working to publish insightful articles, guides, and tips about the benefits, uses, and sustainable cultivation of coconuts. Our aim is to empower you with knowledge, helping you make informed choices and appreciate the incredible versatility of this tropical fruit. Stay tuned for our upcoming articles!
        </p>
        <p className="text-gray-700 italic">
          "From farm to your table, pure goodness in every drop."
        </p>
      </div>

      {/* Call to Action/Closing */}
      <div className="text-center mt-8">
        <p className="text-lg text-gray-700 mb-4">
          We invite you to explore our products and learn more about the amazing world of coconuts.
        </p>
        <a
          href="/contactus"
          className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
