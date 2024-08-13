const express = require('express');
const router = express.Router();
const OrderModel = require('../models/order');
const OrderModelInstance = new OrderModel();

module.exports = (app) => {
  app.use('/orders', router);

  // GET all orders by id from logged in user.
  router.get('/all_orders_by_Id', async (res, req, next) => {
    try {
      const userId = req.user;
      const orders = await OrderModelInstance.getOrderById(userId);
    } catch(err) {
      next(err)
    }
  });

  
}