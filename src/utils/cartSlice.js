import { createSlice } from "@reduxjs/toolkit";

// Helper function to load cart state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return { items: [] }; // Return an empty cart if nothing is in localStorage
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Error loading cart state from localStorage:", e);
    return { items: [] }; // Return an empty cart in case of error
  }
};
// Helper function to save cart state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (e) {
    console.error("Error saving cart state to localStorage:", e);
  }
};

// Initialize the cart state from localStorage
const initialState = loadState();

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
        addToCart: (state, action) =>{
            const newItem  = action.payload;
            const existingItem = state.items.find(item => item.product.sku === newItem.sku);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.subTotal = existingItem.product.price * existingItem.quantity;
            } else {
                state.items.push({product: newItem, quantity: 1, subTotal: newItem.price})
            }
            state.totalQuantity++;
            const calculatedTotal = state.items.reduce((total, item) => {
              return total + (item.subTotal || 0);
            }, 0);

            state.totalAmount = calculatedTotal;
            saveState(state);
        },
        removeFromCart: (state, action) => {
            const skuToRemove = action.payload;
            const itemToRemove = state.items.find(item => item.product.sku === skuToRemove);
            if(itemToRemove) {
                state.totalQuantity = itemToRemove.quantity;
                state.totalAmount -= itemToRemove.subtotal;
                state.items = state.items.filter(item => item.product.sku !== skuToRemove);
            }
             saveState(state);
        }, 
        increaseQuantity: (state, action) => {
            const skuToIncrease = action.payload;
            const existingItem = state.items.find(item =>item.product.sku ==  skuToIncrease);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.subtotal = existingItem.product.price * existingItem.quantity;
                state.totalQuantity++;
                state.totalAmount += existingItem.product.price;
            }
             saveState(state);
        },
        decreaseQuantity: (state, action) => {
            const skuToDecrease = action.payload;
            const existingItem = state.items.find(item => item.product.sku === skuToDecrease);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity--;
                existingItem.subtotal = existingItem.product.price * existingItem.quantity;
                state.totalQuantity--;
                state.totalAmount -= existingItem.product.price;
            } else if (existingItem && existingItem.quantity === 1) {
                // If quantity becomes 0, remove the item
                state.totalQuantity--;
                state.totalAmount -= existingItem.product.price;
                state.items = state.items.filter(item => item.product.sku !== skuToDecrease);
            }
             saveState(state);
        },
        // Action to clear the entire cart
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
            saveState(state);
        }
    }
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;