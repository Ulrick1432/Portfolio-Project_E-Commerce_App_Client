/**
 * Order Routes
 * 
 * Manages order creation and retrieval for authenticated and guest users.
 * Orders are stored in the database and linked to user accounts when available.
 * 
 * @module routes/order
 */

const express = require('express');
const router = express.Router();
const OrderModel = require('../models/order');
const OrderModelInstance = new OrderModel();

/**
 * Mounts order routes onto the Express application.
 * All routes are prefixed with '/orders'.
 * 
 * @param {Object} app - The Express application instance
 */
module.exports = (app) => {
  app.use('/orders', router);

  /**
   * POST /orders/create_order
   * Creates a new order in the database with 'Pending' status.
   * 
   * User Identification:
   *   - Authenticated users: Uses req.user from session
   *   - Guest users: Falls back to userId from request body
   * 
   * Request Body (for guest users):
   *   - { userId: number } - Guest user identifier
   * 
   * Response:
   *   - 200: Created order object
   *   - 500: Order creation failed, returns error
   */
  router.post('/create_order', async (req, res, next) => {
    try {
      let userId;
      
      // Check if user is authenticated via session
      if (req.user) {
        userId = req.user;
      } else {
        // Fallback to userId from request body for guest checkout
        userId = req.body.userId;
      }
      
      const response = await OrderModelInstance.createOrder('Pending', userId);
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

  /**
   * GET /orders/all_orders_by_id
   * Retrieves all orders for a specific user.
   * 
   * User Identification:
   *   - Authenticated users: Uses req.user from session
   *   - Guest users: Falls back to userId from request body
   * 
   * Query Parameters: None required
   * 
   * Response:
   *   - 200: Array of order objects for the user
   *   - 500: Failed to fetch orders, returns error
   */
  router.get('/all_orders_by_id', async (req, res, next) => {
    try {
      let userId;
      
      if (req.user) {
        userId = req.user;
      } else {
        userId = req.body.userId;
      }
      
      console.log('User ID in backend router:', userId);
      const response = await OrderModelInstance.getAllOrdersById(userId);
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

  /**
   * GET /orders/all_orderitems_by_id/:orderId
   * Retrieves all order items (line items) for a specific order.
   * 
   * URL Parameters:
   *   - orderId: The ID of the order to fetch items for
   * 
   * Response:
   *   - 200: Array of order item objects (products in the order)
   *   - 400: Missing orderId parameter
   *   - 500: Failed to fetch order items, returns error
   */
  router.get('/all_orderitems_by_id/:orderId', async (req, res, next) => {
    try {
      const { orderId } = req.params;
      
      if (orderId) {
        const response = await OrderModelInstance.getAllOrderitemsById(orderId);
        res.status(200).send(response);
      } else {
        return res.status(400).send({ message: 'Missing orderId to get order items' });
      }
    } catch(err) {
      next(err);
    }
  });

};
