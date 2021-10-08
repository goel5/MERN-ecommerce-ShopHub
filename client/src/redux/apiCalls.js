import axios from 'axios';
import { getUserOders } from '../getters';
import { publicRequest } from '../requestMethods';
import { updateCart } from './cartRedux';
import { getOrders } from './orderRedux';
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logoutUser,
} from './userRedux';

export const login = async (dispatch, user) => {
  await dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    // console.log('uer id', res.data);
    await dispatch(loginSuccess(res.data));
    setTimeout(async () => {
      const cart = await axios.get(`/api/carts/find/${res.data._id}`, {
        headers: {
          'Content-Type': 'application/json',
          token: `Bearer ${
            JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
              .currentUser.accessToken
          }`,
        },
      });
      console.log(cart.data);
      dispatch(updateCart(cart.data));
      const orders = await getUserOders(res.data._id, res.data.accessToken);
      console.log('orders', orders);
      dispatch(getOrders({ orders }));
    }, 1000);
  } catch (err) {
    dispatch(loginFailure());
  }
};
export const logout = (dispatch) => {
  dispatch(logoutUser());
};
