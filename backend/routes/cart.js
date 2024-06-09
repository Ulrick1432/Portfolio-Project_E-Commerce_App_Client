const express = require('express');
const router = express.Router();
//const CartModel = require('../models/cart');
//const CartModelInstance = new CartModel();
const ProductModel = require('../models/product');
const ProductModelInstance = new ProductModel();
  // POST Session-Based cart add

  module.exports = (app) => {

    app.use('/cart', router);

    // POST Session-Based cart add
    router.post('/add_to_cart_in_session', (req, res) => {
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

    router.get('/get_all_products_in_session_from_db', async (req, res, next) => {
      try {
        // If req.session.cart = [ '4', '4', '4', '5', '5', '5' ] the 2 lines down will makes it [ 4, 5 ]
        // so it ensures to only query the database once per unique product id
        const IdArr = req.session.cart.map(Number); // Convert string IDs to integers
        const uniqueIdInArr = [...new Set(IdArr)]; //// Remove duplicates

        console.log('This is the IdArr in router.get(/get_all_products_in_session_from_db : → ', uniqueIdInArr);
        const products = await ProductModelInstance.getMultipleProductsById(uniqueIdInArr);
        res.status(200).send(products);
      } catch(err) {
        next(err);
      }
    });

  // DELETE product from session-based cart
  router.delete('/delete_cart_item_by_id_in_session', (req, res) => {
    const { id } = req.body;
    console.log('This is the req.body.id: → ', id);
    const idStr = id.toString();
    console.log('This is the idStr: → ', idStr);
    if (!req.session.cart.includes(idStr)) {
      return res.status(200).json({ message: 'Item does not exist in the cart' });
    }
    req.session.cart = req.session.cart.filter(item => item !== idStr);
    console.log(req.session.cart);
    res.status(200).json({ message: 'Item deleted', cart: req.session.cart });
  });

  }