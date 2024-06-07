const express = require('express');
const router = express.Router();
const CartModel = require('../models/cart');
const CartModelInstance = new CartModel();

  // POST Session-Based cart add

  module.exports = (app) => {

    app.use('/cart', router);

    // POST Session-Based cart add
    router.post('/add_to_cart', async (req, res, next) => {
      const item = req.body.item;
      if (!req.session.cart) {
        req.session.cart = [];
      }
      req.session.cart.push(item);
      res.status(200).send('item Added to cart');
    });

    // GET Session-Based cart get all items
    app.get('/', (req, res) => {
      if (!req.session.cart) {
        res.status(204).send('No cart in session not created - add a product to cart');
      };
      res.send(200).send(req.session.cart);
    });
  }
  