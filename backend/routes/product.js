const express = require('express');
const router = express.Router();
const ProductModel = require('../models/product');
const ProductModelInstance = new ProductModel();

module.exports = (app) => {
  app.use('/product', router);

  // Get all Products Endpoint
  router.get('/get_all', async (req, res, next) => {
    try {
      const response = await ProductModelInstance.getAllProducts();
      res.status(200).send(response);
    } catch(err) {
      next(err);
    }
  });

  // Get product by Id Endpoint
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