import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0
}
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
            state.totalAmount = state.items.reduce((total, item) => total + item.subtotal, 0);
        }
    },
    removeFromCart: (state, action) => {
        const skuToRemove = action.payload;
        const itemToRemove = state.items.find(items.product.sku === skuToRemove);
        if(itemToRemove) {
            state.totalQuantity = itemToRemove.quantity;
            state.totalAmount -= itemToRemove.subtotal;
            state.items = state.items.filter(item => item.product.sku !== skuToRemove);
        }
    }, 
    increaseQuantity: (state, action) => {
        const skuToIncrease = action.payload;
        const existingItem = state.items.find(items.product.sku ==  skuToIncrease);
        if (existingItem) {
            existingItem.quantity++;
            existingItem.subtotal = existingItem.product.price * existingItem.quantity;
            state.totalQuantity++;
            state.totalAmount += existingItem.product.price;
        }
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
    },
    // Action to clear the entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    }
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;