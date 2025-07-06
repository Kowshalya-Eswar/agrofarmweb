import { decreaseQuantity as removeFromCartAction } from './cartSlice';
import axios from 'axios';
import { BASE_URL } from './constants';
import getOrCreateCartId from './cardUtils';

const cartId = getOrCreateCartId();
/**
 * Common function to sync cart action with Redis stock
 * @param {Object} product - The product object (must have _id)
 * @param {Function} reduxAction - Redux action to dispatch
 */
export const syncCartWithStock = (product, reduxAction) => async (dispatch) => {
  try {
    
    await axios.post(`${BASE_URL}/cart/add`, {
      productId: product._id,
      quantity: 1,
      cartId
    })

    dispatch(reduxAction(product));
    return 'success';
  } catch (err) {
    return("Failed to add to cart: " + (err?.response?.data?.message || err.message));
  }
};


export const removeFromCartWithStock = (product) => async (dispatch) => {
  try {
    await axios.post(`${BASE_URL}/cart/remove`, {
      productId: product._id,
      quantity: 1,
      cartId
    });

    dispatch(removeFromCartAction(product));
  } catch (err) {
    console.error('Failed to remove from cart (stock)', err);
  }
};
