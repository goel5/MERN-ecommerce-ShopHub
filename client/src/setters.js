import axios from 'axios';

export const setUserCart = async (userId, products, token) => {
  let setProducts = [];
  for await (const product of products) {
    setProducts.push({
      _id: product._id,
      quantity: product.quantity,
      size: product.size,
      color: product.color,
    });
  }
  const data = {
    userId,
    products: setProducts,
  };
  await axios.put(`/api/carts/${userId}`, data, {
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${token}`,
    },
  });
};
export const addToCart = async (userId, data, token) => {
  await axios.put(`/api/carts/add/${userId}`, data, {
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${token}`,
    },
  });
};
export const createOrder = async (userId, cart, token) => {
  let setProducts = [];
  for await (const product of cart.products) {
    setProducts.push({
      _id: product._id,
      quantity: product.quantity,
      size: product.size,
      color: product.color,
      title: product.title,
      desc: product.desc,
      img: product.img,
      price: product.price,
    });
  }
  const data = {
    userId,
    products: setProducts,
    amount: cart.total,
  };
  console.log('order.data', token);
  const order = await axios.post(`/api/orders/${userId}`, data, {
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${token}`,
    },
  });
  console.log('order.data', order.data);
  return order.data;
};
export const emptyCart = async (userId, token) => {
  const data = {
    userId,
    products: [],
    amount: 0,
  };
  await axios.put(`/api/carts/${userId}`, data, {
    headers: {
      'Content-Type': 'application/json',
      token: `Bearer ${token}`,
    },
  });
};
