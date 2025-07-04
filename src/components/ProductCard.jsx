
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { syncCartWithStock } from '../utils/cartActions';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addToCart } from '../utils/cartSlice';
import {DOMAIN_URL, BASE_URL} from '../utils/constants';
import axios from 'axios';
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [stock, setStock] = useState(0);
  useEffect(() => {
  const fetchStock = async () => {
    try {
      const stockCount = await axios.get(`${BASE_URL}/stock/${product._id}`);
      if (stockCount.data.stock !== undefined) {
        setStock(stockCount.data.stock);
      }
    } catch (err) {
      console.error("Failed to fetch stock", err);
    }
  };

  if (product?._id) {
    fetchStock();
  }
}, [product?._id]);  // Only run when product._id is available

  const handleAddToCart = () => {
    dispatch(syncCartWithStock(product, addToCart));
    navigate('/cart');
  }
  let imageUrl = product.images.find(image => image.isMain).imageUrl;
  if (imageUrl) {
    imageUrl = DOMAIN_URL + imageUrl;
  } else {
    imageUrl = `https://placehold.co/400x300/F0F8FF/4682B4?text=${encodeURIComponent(product.productname)}`;
  }
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      {/* Placeholder Image */}
      <img
        src={imageUrl}
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
          {stock > 0 ? (
            <span>
              In Stock: <span className="font-semibold text-gray-800">{stock}</span>
            </span>
          ) : (
            <span>Out of Stock</span>
          )}
         
        </div>
        <div className="flex justify-between items-center">
           {stock > 0 ? (
            <span>
              <button onClick= {handleAddToCart} className="flex-1 mr-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm font-medium shadow-md">
                Add to Cart
              </button>
              </span> ) :
          (<span></span>) }
         {/* Link to Product Details Page */}
          {/* This is the button you referred to. It correctly links to the /product/:sku route. */}
          <Link
            to={`/product/${product.sku}`} // Link to the new product details route
            className="flex-1 ml-2 border border-indigo-600 text-indigo-600 py-2 px-4 rounded-lg hover:bg-indigo-50 transition-colors duration-200 text-sm font-medium text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;