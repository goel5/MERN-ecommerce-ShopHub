import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    updateProduct: (state, action) => {
      console.log('update', action.payload);
      //id, operation
      if (action.payload.operation === 'inc') {
        state.total += action.payload.price;
        state.products.find((product) => product._id === action.payload._id)
          .quantity++;
      } else {
        state.total -= action.payload.price;
        state.products.find((product) => product._id === action.payload._id)
          .quantity--;
      }
    },
    removeProduct: (state, action) => {
      state.quantity -= 1;
      state.total -= action.payload.price * action.payload.quantity;
      console.log('item del', action.payload);
      state.products = state.products.filter(
        (e) => e._id !== action.payload._id
      );
    },
  },
});

export const { addProduct, clearCart, updateProduct, removeProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
