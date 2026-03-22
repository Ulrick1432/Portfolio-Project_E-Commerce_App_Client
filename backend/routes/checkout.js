/**
 * Checkout Routes
 * 
 * Handles payment processing via Stripe Payment Intents API.
 * Creates secure payment sessions for processing card transactions.
 * 
 * @module routes/checkout
 */

const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST_KEY);

/**
 * Mounts checkout routes onto the Express application.
 * All routes are prefixed with '/checkout'.
 * 
 * @param {Object} app - The Express application instance
 */
module.exports = (app) => {

  app.use('/checkout', router);

  /**
   * POST /checkout/create_payment_intent
   * Creates a Stripe Payment Intent for processing the order payment.
   * 
   * Security Note:
   *   The order amount is calculated on the server to prevent clients from
   *   manipulating prices. In production, this should fetch real product prices
   *   from the database based on the items in the request.
   * 
   * Request Body:
   *   - { items: Array } - Array of cart items (for future price calculation)
   * 
   * Response:
   *   - 200: { clientSecret: string } - Stripe client secret for frontend SDK
   * 
   * @todo Replace hardcoded amount (1400) with actual order total calculation
   */
  router.post('/create_payment_intent', async (req, res) => {
    const { items } = req.body;

    /**
     * Calculates the order total amount in smallest currency unit (cents).
     * 
     * Currently hardcoded to 1400 (14.00 DKK).
     * 
     * @param {Array} items - Array of cart items
     * @returns {number} - Order total in smallest currency unit
     * 
     * @todo Implement actual price calculation:
     *   - Fetch product prices from database
     *   - Multiply by quantity for each item
     *   - Sum all totals
     *   - Convert to currency-specific smallest unit (e.g., øre for DKK)
     */
    const calculateOrderAmount = (items) => {
      return 1400;
    };

    try {
      // Create Payment Intent with order amount and currency
      // DKK is used as the currency for Danish market
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: 'dkk',
      });

      // Return client secret to frontend
      // Frontend uses this to complete the payment flow with Stripe.js
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.error('Stripe Payment Intent error:', error);
      res.status(500).json({ error: error.message });
    }
  });
};
