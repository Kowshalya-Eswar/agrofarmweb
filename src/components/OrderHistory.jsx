import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const OrderHistory = () => {
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated || !currentUser?.userId) {
        // Not authenticated or user ID not available, stop loading
        setIsLoading(false);
        setError('You must be logged in to view your order history.');
        return;
      }

      setIsLoading(true);
      setError('');
      try {
        // Fetch orders for the current user from the backend
        const response = await axios.get(BASE_URL + 'orders', {
          withCredentials: true, // Send cookies (JWT token)
        });

        if (response.data.success) {
          setOrders(response.data.data);
        } else {
          setError(response.data.message || 'Failed to fetch order history.');
        }
      } catch (err) {
        console.error('Error fetching order history:', err);
        setError(err.response?.data?.message || `Network error: ${err.message}. Is backend running?`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, currentUser?.userId]); // Re-fetch if auth status or user ID changes

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-700">Loading your order history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow-md text-center">
          <p className="text-lg font-semibold">{error}</p>
          {!currentUser ? ( 
          <Link to="/login" className="mt-4 inline-block bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
            Login Now
          </Link>):null}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 bg-gray-50 min-h-[calc(100vh-80px)]">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Your Order History</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 mb-6">You haven't placed any orders yet.</p>
          <Link
            to="/products"
            className="inline-block bg-indigo-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-md transform hover:scale-105"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4 border-b pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Order #{order._id}</h2>
                  <p className="text-gray-600 text-sm">Placed on: {new Date(order.createdAt).toLocaleString()}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold
                  ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : ''}
                  ${order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : ''}
                  ${order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${order.status === 'pending' ? 'bg-gray-100 text-gray-800' : ''}
                  ${order.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                `}>
                  {order.status.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Details</h3>
                  <p className="text-gray-700"><strong>Total Amount:</strong> ₹{order.totalAmount.toFixed(2)}</p>
                  <p className="text-gray-700"><strong>Shipping Address:</strong> {order.address}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Items</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.productNameAtOrder} (SKU: {item.sku}) - Qty: {item.qty} @ ₹{item.priceAtOrder.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;