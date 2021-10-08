import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    updateCart: (state, action) => {
      state.quantity = action.payload.quantity;
      state.products = action.payload.products;
      state.total = action.payload.total;
    },
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
        state.products.find(
          (product) => product._id === action.payload.productId
        ).quantity++;
      } else {
        state.total -= action.payload.price;
        state.products.find(
          (product) => product._id === action.payload.productId
        ).quantity--;
      }
      // setTimeout(() => {
      //   action.payload.userId &&
      //     setUserCart(
      //       action.payload.userId,
      //       state.products,
      //       action.payload.token
      //     );
      // }, 1000);
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

export const {
  addProduct,
  clearCart,
  updateProduct,
  removeProduct,
  updateCart,
} = cartSlice.actions;
export default cartSlice.reducer;
