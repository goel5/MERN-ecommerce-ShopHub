import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    quantity: 0,
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders = state.orders.concat(action.payload.order.products);
      state.quantity++;
    },
    getOrders: (state, action) => {
      state.orders = state.orders.concat(action.payload.orders);
      state.quantity += action.payload.orders.length;
      //login and placing order
    },
    clearOrders: (state) => {
      state.orders = [];
      state.quantity = 0;
    },
  },
});

export const { addOrder, getOrders, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
