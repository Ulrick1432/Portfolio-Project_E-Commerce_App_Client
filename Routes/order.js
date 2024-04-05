/*
  Lav CRUD operations for "Set up order endpoint". 
  Orders tabellen tager kolonner "Total_Price", "Total_Items", "Status", "user_id" og "cart_id"
  "Total_Price", "Total_Items" kan godt være Null. / eller skal det vare være "0" i begge som standard? 
  
  *opret ordre
  *Get all orders
  *Get Order
*/

// order.js routes
const express = require('express');
const router = express.Router();
const OrdersModel = require('../models/order');
const OrdersModelInstance = new OrdersModel();

router.post('/', async (req, res) => {
  try {
    const status = "pending";
    const { userId, cartId } = req.body;
    const createOrder = await OrdersModelInstance.createOrder(status, userId, cartId);
    res.json(createOrder);
  } catch(err) {
    res.status(500).json({err: err.message});
  }
});

router.get('/', async (req, res) => {
  try {
    const allOrders = await OrdersModelInstance.getAllOrders();
    res.json(allOrders);
  } catch(err) {
    res.status(500).json({err: err.message});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await OrdersModelInstance.getOrderById(orderId);
    res.json(order);
  } catch(err) {
    res.status(500).json({err: err.message});
  }
});

module.exports = router;