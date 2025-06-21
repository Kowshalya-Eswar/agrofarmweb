import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      {/* Placeholder Image */}
      <img
        src={`https://placehold.co/400x300/F0F8FF/4682B4?text=${encodeURIComponent(product.productname)}`}
        alt={product.productname}
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300/E0E0E0/808080?text=No+Image'; }}
        className="w-full h-48 object-cover object-center"
      />
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.productname}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-extrabold text-indigo-600">
            ₹{product.price.toFixed(2)}
          </span>
          <span className="text-md text-gray-700">
            {product.unit}
          </span>
        </div>
        <div className="text-gray-500 text-sm mb-4">
          In Stock: <span className="font-semibold text-gray-800">{product.stock}</span>
        </div>
        <div className="flex justify-between items-center">
          <button className="flex-1 mr-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium shadow-md">
            Add to Cart
          </button>
          <button className="flex-1 ml-2 border border-indigo-600 text-indigo-600 py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors duration-200 text-sm font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;