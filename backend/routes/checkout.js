const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST_KEY);

module.exports = (app) => {

  app.use('/checkout', router)

  router.post('/create_payment_intent', async (req, res) => {
    const { items } = req.body;

    const calculateOrderAmount = (items) => {
      // Replace this constant with a calculation of the order's amount
      // Calculate the order total on the server to prevent
      // people from directly manipulating the amount on the client
      return 1400;
    };

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'dkk',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  })
}