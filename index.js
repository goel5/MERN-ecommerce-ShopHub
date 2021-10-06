const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });
const path = require('path');
const http = require('http');
const fs = require('fs');
const https = require('https');
// const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');
const cors = require('cors');
// dotenv.config();

//Database Configure
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB connection successfull'))
  .catch((err) => console.log(err));
app.use(cors());
app.use(express.json());

//Api EndPoint
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Api running');
  });
}

//Run App
app.listen(process.env.PORT || 5000, () => {
  console.log(`Backend server is running at port ${process.env.PORT}`);
});
