// carts.js routes
// carts + cartsItems
const express = require('express');
const router = express.Router();
const CartsModel = require('../models/carts');
const CartsModelInstance = new CartsModel();

// Carts er kurven.

// POST Carts
router.post('/', async (req, res) => {
  try {
    const { created } = req.body;
    const newCart = await CartsModelInstance.CreateCart(created);
    res.json(newCart);
  } catch (err) {
    res.status(500).json({err: err.message});
  }
});

// GET Carts by id
router.get('/:id', async (req, res) =>{
  try {
    const { id } = req.params;
    const cart = await CartsModelInstance.GetCart(id);
    res.json(cart);
  } catch(err) {
    res.status(500).json({err: err.message});
  }
});

// CartsItems er det der er i kurven

// POST CartsItems
router.post('/:id/cartsItems', async (req, res) => {
  try {
    const { created, productId} = req.body;
    const { id } = req.params;
    const newItem = await CartsModelInstance.AddItem(created, id, productId);
    res.json(newItem);
  } catch(err) {
    res.status(500).json({err: err.message});
  }
})

// GET ALL CartsItems
router.get('/:id/cartsItems', async (req, res) => {
  try {
    const { id } = req.params;
    const cartItems = await CartsModelInstance.GetItems(id);
    res.json(cartItems);
  } catch(err) {
    res.status(500).json({err: err.message});
  }
})

module.exports = router;

