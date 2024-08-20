const express = require('express');
const router = express.Router();
const CartModel = require('../models/cart');
const CartModelInstance = new CartModel();
const ProductModel = require('../models/product');
const ProductModelInstance = new ProductModel();
  // POST Session-Based cart add

  module.exports = (app) => {

    app.use('/cart', router);

    // POST Create cart
    router.post('/create_cart', async (req, res, next) => {
      try {
        const response = await CartModelInstance.createCart(true);
        res.status(200).send(response);
      } catch(err) {
        next(err);
      }
    });

    // POST Session-Based cart add
    router.post('/add_to_cart_in_session', (req, res) => {
      const item = req.body.item;
      if (!req.session.cart) {
        req.session.cart = {
          cartId: "cartId",
          cartItems: []
        };
      }
      req.session.cart.cartItems.push(item);
      res.status(200).json({ message: 'Item added to cart', cart: req.session.cart });
    });

    // Add payment status
    router.post('/payment_completion', (req, res) => {
      const { status } = req.body;
      if (!status) {
        return res.status(204).json({ message: 'payment completion got no status' });
      }
      req.session.cart.paymentStatus = status;
      res.status(200).json({ message: 'payment status added to session.cart' });
    });

    // GET Session-Based cart get all items
    router.get('/get_cart_in_session', (req, res) => {
      if (!req.session.cart) {
        return res.status(200).json([]);
      }
      res.status(200).json(req.session.cart.cartItems);
    });

    router.get('/get_all_products_in_session_from_db', async (req, res, next) => {
      try {
        if (!req.session.cart) {
          return res.status(204).json({ message: 'No products are added to cart' });
        }
        // If req.session.cart = [ '4', '4', '4', '5', '5', '5' ] the 2 lines down will makes it [ 4, 5 ]
        // so it ensures to only query the database once per unique product id
        const IdArr = req.session.cart.cartItems.map(Number); // Convert string IDs to integers
        const uniqueIdInArr = [...new Set(IdArr)]; //// Remove duplicates
        const products = await ProductModelInstance.getMultipleProductsById(uniqueIdInArr);
        res.status(200).send(products);
      } catch(err) {
        next(err);
      }
    });

  // DELETE product from session-based cart
  router.delete('/delete_cart_item_by_id_in_session', (req, res) => {
    const { id } = req.body;
    const idStr = id.toString();
    if (!req.session.cart.cartItems.includes(idStr)) {
      return res.status(204).json({ message: 'Item does not exist in the cart' });
    }
    req.session.cart.cartItems = req.session.cart.cartItems.filter(item => item !== idStr);
    res.status(200).json({ message: 'Item deleted', cart: req.session.cart });
  });

  // Update product quantity by id from session-based cart
  router.put('/update_cart_item_by_id_in_session', (req, res) => {
    const { id, newQuantity, oldQuantity } = req.body;
    const idStr = id.toString();
    let parsedNewQuantity = parseInt(newQuantity);
    let parsedOldQuantity = parseInt(oldQuantity);

    // Check if old quantity is 0 or negative
    if (parsedOldQuantity <= 0) {
      return res.status(400).json({ message: 'Quantity cannot be 0 or negative. Instead, click on the remove button.' });
    }

    let newArr;
    // Update quantity if the new quantity is less than the old quantity
    if (parsedOldQuantity > parsedNewQuantity) {
      newArr = req.session.cart.cartItems.filter((item, index) => {
        if (item === idStr && parsedNewQuantity > 0) {
          parsedNewQuantity--;
          return true;
        }
        return item !== idStr;
      });
    } else { // Add the ID (parsedNewQuantity - parsedOldQuantity) times to the cart
      newArr = [...req.session.cart.cartItems];
      const diff = parsedNewQuantity - parsedOldQuantity;
      for (let i = 0; i < diff; i++) {
        newArr.push(idStr);
      }
    }

    req.session.cart.cartItems = newArr;
    res.status(200).json({ message: 'Quantity updated', cart: req.session.cart });
  });
}