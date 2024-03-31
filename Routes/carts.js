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

// CartsItems er det der er i kurven

// POST CartsItems

// GET ALL CartsItems

module.exports = router;

