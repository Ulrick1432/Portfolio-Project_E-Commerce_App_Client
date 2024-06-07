const express = require('express');
const router = express.Router();
//const CartModel = require('../models/cart');
//const CartModelInstance = new CartModel();

  // POST Session-Based cart add

  module.exports = (app) => {

    app.use('/cart', router);

    // POST Session-Based cart add
    router.post('/add_to_cart_in_session', async (req, res) => {
      const item = req.body.item;
      if (!req.session.cart) {
        req.session.cart = [];
      }
      req.session.cart.push(item);
      res.status(200).json({ message: 'Item added to cart' });
    });

    // GET Session-Based cart get all items
    router.get('/get_cart_in_session', (req, res) => {
      if (!req.session.cart) {
        return res.status(200).json([]);
      }
      console.log(req.session.cart)
      res.status(200).json(req.session.cart);
    });
  }