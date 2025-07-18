import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, DOMAIN_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addToCart } from '../utils/cartSlice';
import { syncCartWithStock } from '../utils/cartActions';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams(); // Get the product_id from the URL parameters
  const [product, setProduct] = useState(null);
  const [stock, setStock] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(syncCartWithStock(product, addToCart));
    navigate('/cart');
  }
  const handleBuyNow = () => {
    dispatch(syncCartWithStock(product, addToCart));
    navigate('/checkout');
  }
  const fetchStockFromRedis = async (product_id) => {
    try {
      const stockCount = await axios.get(`${BASE_URL}/stock/${product_id}`);
      if (stockCount.data.stock !== undefined) {
        setStock(stockCount.data.stock)
      }
    }
  catch (err) {
    console.error("failed to fetch stock",err);
  }
}
  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch product details using the product_id from the URL
        const response = await axios.get(BASE_URL +`/product/${id}`, {
          withCredentials: true // Assuming product details API requires authentication
        });
        if (response.data.success) {
          const product_data = response.data.data;

          setProduct(product_data);
          
          let image_url = product_data.images?.find(image => image.isMain)?.imageUrl || null
          if (image_url) {
            setImageUrl(DOMAIN_URL + image_url);
          } else {
            setImageUrl(`https://placehold.co/400x300/F0F8FF/4682B4?text=${encodeURIComponent(product_data.productname)}`);
          }
          
         await fetchStockFromRedis(product_data._id);
        } else {
          setError(response.data.message || 'Failed to fetch product details.');
          setProduct(null);
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError(err.response?.data?.message || 'Network error fetching product details.');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    } else {
      setLoading(false);
      setError('Product id is missing from the URL.');
    }
  }, [id]); // Re-fetch if id changes in the URL

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-600 text-xl">Loading product details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-600 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-600 text-xl">Product not found.</div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-6 py-8 bg-gray-50 min-h-[calc(100vh-80px)]">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row gap-8">
        {/* Product Image Section */}
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src={imageUrl}
            alt={product.productname}
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/E0E0E0/808080?text=No+Image'; }}
            className="rounded-lg shadow-md max-h-96 object-contain"
          />
        </div>

        {/* Product Details Section */}
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-3">{product.productname}</h1>
            <p className="text-gray-700 text-lg mb-4">{product.description}</p>
            <div className="flex items-baseline mb-4">
              <span className="text-5xl font-extrabold text-indigo-600 mr-2">
                ₹{product.price.toFixed(2)}
              </span>
              <span className="text-xl text-gray-600">
                / {product.unit}
              </span>
            </div>
            <div className="text-gray-600 text-lg mb-6">
             {stock > 0 ? (<span>
              In Stock: <span className="font-semibold text-gray-800">{stock}</span>
             </span>) : (
              <span>Out of Stock</span>
             )}
              
            </div>
          </div>

          {/* Action Buttons */}
           {stock > 0 ? ( <span>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button onClick = {handleAddToCart} className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-md transform hover:scale-105">
                  Add to Cart
                </button>
                <button onClick = {handleBuyNow} className="flex-1 border border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition-colors duration-200">
                  Buy Now
                </button>
              </div>
              </span> ) : (<></>)}
          <div className="mt-4 text-sm text-gray-500">
            Product Id: <span className="font-mono text-gray-700">{product._id}</span>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center">
        <Link to="/products" className="text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200">
          &larr; Back to Products
        </Link>
      </div>
    </div>
  );
}

export default ProductDetails
