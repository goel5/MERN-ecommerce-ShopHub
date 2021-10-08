const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        _id: { type: String },
        quantity: {
          type: Number,
          default: 1,
        },
        size: { type: String },
        color: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cart', CartSchema);
