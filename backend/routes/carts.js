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

// POST Carts checkout (adding OrderItem)
router.post('/:id/checkout', async (req, res) => {
  try {
    const { id } = req.params;
    const prices = await CartsModelInstance.GetProductPrice(id);
    const productIds = await CartsModelInstance.GetProductId(id);
    // Eliminates duplicate product IDs to ensure each product is processed only once
    const uniqueProductIds = [...new Set(productIds.map(item => item.id))];

    const { orderId } = req.body;

    const orderItems = [];
    // Loops through unique product IDs to create order items
    for (let i = 0; i < uniqueProductIds.length; i++) {
      const price = prices[i].Price;
      const productId = uniqueProductIds[i];
        const quantity = await CartsModelInstance.GetQuantity(id, productId);
        const orderItem = await CartsModelInstance.CartCheckout(quantity, price, orderId, productId);
        orderItems.push(orderItem);
    }
    res.json(orderItems);
  } catch(err) {
    res.status(500).json({err: err.message});
  }
})

router.get('/:id/testGetPrice', async (req, res) => {
  try {
    const { id } = req.params;
    const price = await CartsModelInstance.GetProductPrice(id);
    res.json(price);
  } catch(err) {
    res.status(500).json({err: err.message});
  }
})

router.get('/:id/testGetQuantity', async (req, res) => {
  try {
    const { id } = req.params;
    const productId = 4;
    const quantity = await CartsModelInstance.GetQuantity(id, productId);
    res.json(quantity);
  } catch(err) {
    res.status(500).json({err: err.message});
  }
})

router.get('/:id/testGetProductId', async (req, res) => {
  try {
    const { id } = req.params;
    const productId = await CartsModelInstance.GetProductId(id);
    const testProduct = productId[0].id
    res.json(productId);
  } catch(err) {
    res.status(500).json({err: err.message});
  }
})

module.exports = router;

