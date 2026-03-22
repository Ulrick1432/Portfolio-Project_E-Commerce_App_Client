/**
 * Cart Routes
 * 
 * Manages session-based shopping cart operations. Cart data is stored in the
 * user's session and persists across page refreshes until checkout completion.
 * 
 * Session Structure:
 *   req.session.cart = {
 *     id: string,           // Database cart ID (if created)
 *     cartItems: number[],  // Array of product IDs (duplicates indicate quantity)
 *     paymentStatus: string // Optional: 'completed' after successful payment
 *   }
 * 
 * @module routes/cart
 */

const express = require('express');
const router = express.Router();
const CartModel = require('../models/cart');
const CartModelInstance = new CartModel();
const ProductModel = require('../models/product');
const ProductModelInstance = new ProductModel();

/**
 * Mounts cart routes onto the Express application.
 * All routes are prefixed with '/cart'.
 * 
 * @param {Object} app - The Express application instance
 */
module.exports = (app) => {

  app.use('/cart', router);

  /**
   * POST /cart/create_cart
   * Creates a new cart entry in the database and initializes the session cart.
   * This is typically called when a user adds their first item to cart.
   * 
   * Response:
   *   - 200: { id: number, cartItems: [] }
   *   - 500: Failed to create cart, returns error message
   */
  router.post('/create_cart', async (req, res) => {
    try {
      const newCart = await CartModelInstance.createCart();
      req.session.cart = { id: newCart.id, cartItems: [] };
      res.status(200).json(req.session.cart);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  /**
   * POST /cart/add_to_cart_in_session
   * Adds a product to the session cart. If no cart exists in the session,
   * a new one is initialized with an empty cartItems array.
   * 
   * Request Body:
   *   - { item: number } - Product ID to add
   * 
   * Response:
   *   - 200: { message: 'Item added to cart', cart: {...} }
   */
  router.post('/add_to_cart_in_session', (req, res) => {
    const item = req.body.item;
    
    // Initialize cart in session if it doesn't exist
    if (!req.session.cart) {
      req.session.cart = {
        cartId: "cartId",
        cartItems: []
      };
    }
    
    // Add item ID to cartItems array
    // Note: Same product can appear multiple times to represent quantity
    req.session.cart.cartItems.push(item);
    res.status(200).json({ message: 'Item added to cart', cart: req.session.cart });
  });

  /**
   * POST /cart/payment_completion
   * Records the payment status in the session after Stripe payment completes.
   * Used to track whether checkout was successful.
   * 
   * Request Body:
   *   - { status: string } - Payment status (e.g., 'completed', 'failed')
   * 
   * Response:
   *   - 200: { message: 'payment status added to session.cart' }
   *   - 204: No status provided
   */
  router.post('/payment_completion', (req, res) => {
    const { status } = req.body;
    if (!status) {
      return res.status(204).json({ message: 'payment completion got no status' });
    }
    req.session.cart.paymentStatus = status;
    res.status(200).json({ message: 'payment status added to session.cart' });
  });

  /**
   * GET /cart/get_cart_in_session
   * Retrieves the raw cartItems array from the session.
   * Returns an empty array if no cart exists in session.
   * 
   * Note: This returns only product IDs, not full product objects.
   * Use /cart/get_all_products_in_session_from_db for product details.
   * 
   * Response:
   *   - 200: number[] - Array of product IDs (e.g., [4, 4, 5] = 2x product 4, 1x product 5)
   */
  router.get('/get_cart_in_session', (req, res) => {
    if (!req.session.cart) {
      return res.status(200).json([]);
    }
    res.status(200).json(req.session.cart.cartItems);
  });

  /**
   * GET /cart/get_all_products_in_session_from_db
   * Fetches full product details from the database for all items in the cart.
   * Duplicates are automatically deduplicated to minimize database queries.
   * 
   * How it works:
   *   1. Get all product IDs from session cartItems array
   *   2. Convert string IDs to integers for database query
   *   3. Remove duplicate IDs using Set
   *   4. Query database once for all unique products
   * 
   * Example: Session [4, 4, 4, 5, 5, 5] -> DB query for [4, 5] -> Returns full product objects
   * 
   * Response:
   *   - 200: Product[] - Array of product objects with all details
   *   - 204: { message: 'No products are added to cart' } if cart is empty
   */
  router.get('/get_all_products_in_session_from_db', async (req, res, next) => {
    try {
      if (!req.session.cart?.cartItems?.length) {
        return res.status(204).json({ message: 'No products are added to cart' });
      }
      
      // Convert string IDs to integers and remove duplicates
      const IdArr = req.session.cart.cartItems.map(Number);
      const uniqueIdInArr = [...new Set(IdArr)];
      
      // Query database for unique products
      const products = await ProductModelInstance.getMultipleProductsById(uniqueIdInArr);
      res.status(200).send(products);
    } catch(err) {
      next(err);
    }
  });

  /**
   * DELETE /cart/delete_cart_item_by_id_in_session
   * Removes a product completely from the cart (all instances).
   * Unlike updating quantity, this removes ALL items with the given ID.
   * 
   * Request Body:
   *   - { id: number } - Product ID to remove
   * 
   * Response:
   *   - 200: { message: 'Item deleted', cart: {...} }
   *   - 204: { message: 'Item does not exist in the cart' }
   */
  router.delete('/delete_cart_item_by_id_in_session', (req, res) => {
    const { id } = req.body;
    const idStr = id.toString();
    
    if (!req.session.cart.cartItems.includes(idStr)) {
      return res.status(204).json({ message: 'Item does not exist in the cart' });
    }
    
    // Filter out ALL occurrences of the product ID
    req.session.cart.cartItems = req.session.cart.cartItems.filter(item => item !== idStr);
    res.status(200).json({ message: 'Item deleted', cart: req.session.cart });
  });

  /**
   * PUT /cart/update_cart_item_by_id_in_session
   * Updates the quantity of a specific product in the cart.
   * Supports both increasing and decreasing quantity.
   * 
   * Request Body:
   *   - { id: number, newQuantity: number, oldQuantity: number }
   * 
   * Logic:
   *   - If newQuantity < oldQuantity: Remove (oldQuantity - newQuantity) items
   *   - If newQuantity > oldQuantity: Add (newQuantity - oldQuantity) items
   *   - If newQuantity is 0 or less: Returns error (use delete instead)
   * 
   * Response:
   *   - 200: { message: 'Quantity updated', cart: {...} }
   *   - 400: { message: 'Quantity cannot be 0 or negative...' }
   */
  router.put('/update_cart_item_by_id_in_session', (req, res) => {
    const { id, newQuantity, oldQuantity } = req.body;
    const idStr = id.toString();
    let parsedNewQuantity = parseInt(newQuantity);
    let parsedOldQuantity = parseInt(oldQuantity);

    // Reject invalid quantities - user should use delete instead
    if (parsedOldQuantity <= 0) {
      return res.status(400).json({ message: 'Quantity cannot be 0 or negative. Instead, click on the remove button.' });
    }

    let newArr;
    
    // Decrease quantity: Remove items from cart array
    if (parsedOldQuantity > parsedNewQuantity) {
      newArr = req.session.cart.cartItems.filter((item, index) => {
        if (item === idStr && parsedNewQuantity > 0) {
          parsedNewQuantity--;
          return true;
        }
        return item !== idStr;
      });
    } 
    // Increase quantity: Add more item IDs to cart array
    else {
      newArr = [...req.session.cart.cartItems];
      const diff = parsedNewQuantity - parsedOldQuantity;
      for (let i = 0; i < diff; i++) {
        newArr.push(idStr);
      }
    }

    req.session.cart.cartItems = newArr;
    res.status(200).json({ message: 'Quantity updated', cart: req.session.cart });
  });
};
