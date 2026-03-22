/**
 * Product Routes
 * 
 * Handles product retrieval operations. All endpoints are read-only
 * and do not modify product data in the database.
 * 
 * @module routes/product
 */

const express = require('express');
const router = express.Router();
const ProductModel = require('../models/product');
const ProductModelInstance = new ProductModel();

/**
 * Mounts product routes onto the Express application.
 * All routes are prefixed with '/product'.
 * 
 * @param {Object} app - The Express application instance
 */
module.exports = (app) => {
  app.use('/product', router);

  /**
   * GET /product/get_all
   * Retrieves all products from the database.
   * Used for product listing pages and catalog views.
   * 
   * Response:
   *   - 200: Array of all product objects
   *   - 500: Failed to fetch products, error passed to middleware
   */
  router.get('/get_all', async (req, res, next) => {
    try {
      const response = await ProductModelInstance.getAllProducts();
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

  /**
   * GET /product/:id
   * Retrieves a single product by its ID.
   * Used for product detail pages.
   * 
   * URL Parameters:
   *   - id: The unique identifier of the product
   * 
   * Response:
   *   - 200: Single product object
   *   - 500: Failed to fetch product, error passed to middleware
   */
  router.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await ProductModelInstance.getProductById(id);
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

};
