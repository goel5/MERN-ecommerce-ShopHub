const router = require('express').Router();
const stripe = require('stripe')(
  'sk_test_51JgpDdSJlKt30dnAkmryAwHImT4EBbzqzTbKkOGxaB9sHdtTzK4bf0Wie3U01W18o1vqU9J3zJrLzxsFbVFcxGVf00ETz2RUsQ'
);

router.post('/payment', (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount * 100,
      currency: 'INR',
      description: 'Software development services',
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
