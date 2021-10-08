import axios from 'axios';

export const getUserOders = async (userId, token) => {
  const orders = await axios.get(`/api/orders/find/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${token}`,
    },
  });
  console.log('getters', orders.data);
  return orders.data;
};
