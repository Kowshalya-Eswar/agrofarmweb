import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../utils/cartSlice';
import { Link } from 'react-router-dom';
const Cart = () => {
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemove = (sku) => {
    dispatch(removeFromCart(sku));
  };

  const handleIncrease = (sku) => {
    dispatch(increaseQuantity(sku));
  };

  const handleDecrease = (sku) => {
    dispatch(decreaseQuantity(sku));
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      dispatch(clearCart());
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 bg-gray-50 min-h-[calc(100vh-80px)]">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Your Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600 mb-6">Your cart is empty.</p>
          <Link
            to="/products"
            className="inline-block bg-indigo-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 shadow-md transform hover:scale-105"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Items in Cart ({totalQuantity})</h2>
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.product.sku} className="flex items-center border-b pb-4 last:border-b-0 last:pb-0">
                  <img
                    src={`https://placehold.co/100x100/F0F8FF/4682B4?text=${encodeURIComponent(item.product.productname)}`}
                    alt={item.product.productname}
                    className="w-24 h-24 object-cover rounded-lg mr-4 shadow-sm"
                  />
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900">{item.product.productname}</h3>
                    <p className="text-gray-600">₹{item.product.price.toFixed(2)} / {item.product.unit}</p>
                    <p className="text-gray-700 font-medium">Subtotal: ₹{(item.subtotal || 0).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-3 ml-4">
                    <button
                      onClick={() => handleDecrease(item.product.sku)}
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors duration-200"
                    >
                      -
                    </button>
                    <span className="font-semibold text-lg">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item.product.sku)}
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors duration-200"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemove(item.product.sku)}
                      className="ml-4 text-red-600 hover:text-red-800 transition-colors duration-200"
                      aria-label={`Remove ${item.product.productname}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleClearCart}
              className="mt-8 px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors duration-200 text-lg font-semibold"
            >
              Clear Cart
            </button>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6 h-fit sticky top-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-lg text-gray-700">
                <span>Total Items:</span>
                <span className="font-semibold">{totalQuantity}</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-gray-900 border-t pt-4 mt-4">
                <span>Order Total:</span>
                <span className="text-indigo-600">₹{totalAmount}</span>
              </div>
            </div>
            <div className="flex mt-4">
              <Link to ='/checkout' className="mt-8 w-full bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-md transform hover:scale-105">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;