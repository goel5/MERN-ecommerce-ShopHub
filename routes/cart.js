const Cart = require('../models/Cart');
const Product = require('../models/Product');

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');

const router = require('express').Router();

//Create
router.post('/', verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    const updatedCart = await Cart.findByIdAndUpdate(
      cart._id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Add to cart
router.put('/add/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.params.id });
    cart.products.push(req.body);
    const updatedCart = await Cart.findByIdAndUpdate(
      cart._id,
      { $set: cart },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    await Cart.findByIdAndDelete(cart._id);
    res.status(200).json('Cart has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET User Cart
router.get('/find/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    let userCart = {
      quantity: 0,
      products: [],
      total: 0,
    };
    const cart = await Cart.findOne({ userId: req.params.id });
    for await (const item of cart.products) {
      let product = await Product.findById(item._id);
      userCart.products.push({
        ...product._doc,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      });
      userCart.total += item.quantity * product.price;
      userCart.quantity++;
    }
    // console.log('userCart', userCart);
    res.status(200).json(userCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
