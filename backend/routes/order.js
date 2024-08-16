const express = require('express');
const router = express.Router();
const OrderModel = require('../models/order');
const OrderModelInstance = new OrderModel();

module.exports = (app) => {
  app.use('/orders', router);

  // GET all orders by id from logged in user.
  router.get('/all_orders_by_Id', async (req, res, next) => {
    try {
      let userId
      if (req.user) {
        userId = req.user;
      } else {
        userId = req.body.userId;
      }
      
      console.log('This is the userId in the backend router: ', userId)
      const response = await OrderModelInstance.getOrderById(userId);
      res.status(200).send(response);
    } catch(err) {
      next(err)
    }
  });

  
}