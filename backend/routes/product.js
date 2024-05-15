// product.js routes
const express = require('express');
const router = express.Router();
const db = require('../db/index');
const ProductsModel = require('../models/product');
const ProductModelInstance = new ProductsModel();
// GET products
router.get('/', async (req, res) => {
  try {
    const allProducts = await db.query('SELECT * FROM "Products"');
    if (allProducts.rows?.length) {
      res.json(allProducts.rows);
    } else {
      res.json({ message: ' No products found :( ' });
    }
  } catch(err) {
    res.status(500).json({err: err.message});
  }
});

// POST add product
router.post('/add', async (req, res) => {
  try {
    const {name, price, stock} = req.body;
    const newProduct = await ProductModelInstance.addProduct(name, price, stock);
    res.json(newProduct);
  } catch(err) {
    res.status(500).json({err: err.message});
  }
});

// GET /products/:id - Get single product by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const getProduct = await ProductModelInstance.getProductById(id);
    res.json(getProduct);
  } catch(err) {
    res.status(500).json({err: err.message});
  }
});

// PUT /products/:id - Update product by id
router.put('/:id', async (req, res) => {
  try {
    const { id } =req.params;
    const { name, price, stock} = req.body;
    // Constructs the updateFields object based on the provided fields
    const updateFields = {};
    if (req.body.hasOwnProperty('name')) {
      updateFields.name = name;
    }
    if (req.body.hasOwnProperty('price')) {
      updateFields.price = price;
    }
    if (req.body.hasOwnProperty('stock')) {
      updateFields.stock = stock;
    }
    // Calls the updateProductById function with the product id and updateFields
    const updateProduct = await ProductModelInstance.updateProductById(id, updateFields);

    // Checks if the product was updated successfully
    if (updateProduct) {
      res.json(updateProduct); // Returns the updated product
    } else {
      res.status(404).json({ message: 'Product not found :/' });
    }
    
  } catch(err) {
    res.status(500).json({err: err.message}); //Internal Server error
  }
})

// DELETE product by id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await ProductModelInstance.deleteProductById(id);
    res.json({ message: 'Product deleted successfully' });
  } catch(err) {
    res.status(500).json({ err: err.message })
  }
})
module.exports = router;