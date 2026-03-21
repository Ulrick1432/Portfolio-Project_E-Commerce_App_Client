const db = require('../db/index');

module.exports = class CartsModel {
  /**
   * Creates a new empty shopping cart.
   * @returns {Promise<Object>} The newly created cart object
   * @throws {Error} If database insertion fails
   */
  async createCart() {
    try {
      const createNewCart = await db.query(
        'INSERT INTO "carts" DEFAULT VALUES RETURNING *'
      );

      if (createNewCart.rows.length > 0) {
        return createNewCart.rows[0];
      } else {
        return {};
      }
    } catch (err) {
      throw new Error('Error creating new cart: ' + err.message);
    }
  }

  /**
   * Retrieves a cart by its ID.
   * @param {number} id - The cart ID
   * @returns {Promise<Object|null>} The cart object, or null if not found
   * @throws {Error} If database query fails
   */
  async getCart(id) {
    try {
      const cart = await db.query('SELECT * FROM "carts" WHERE "id" = $1', [id]);
      if (cart.rows?.length) {
        return cart.rows[0];
      }
      return null;
    } catch(err) {
      throw new Error('Error getting cart: ' + err.message);
    }
  }

  /**
   * Adds a product item to a cart.
   * @param {Date} created - Timestamp for when the item was added
   * @param {number} id - The cart ID
   * @param {number} productId - The product ID to add
   * @returns {Promise<Object>} The newly created cart item object
   * @throws {Error} If database insertion fails
   */
  async addItem(created, id, productId) {
    try {
      const addNewItem = await db.query(
        'INSERT INTO "cart_items" ("created", "cart_id", "product_id") VALUES ($1, $2, $3) RETURNING *',
        [created, id, productId]
      );
      const newItem = addNewItem.rows[0];
      return newItem;
    } catch(err) {
      throw new Error('Error adding new cart item: ' + err.message);
    }
  }

  /**
   * Retrieves all items in a specific cart.
   * @param {number} cartId - The cart ID
   * @returns {Promise<Array|null>} Array of cart item objects, or null if none found
   * @throws {Error} If database query fails
   */
  async getItems(cartId) {
    try {
      const getAllItems = await db.query('SELECT * FROM "cart_items" WHERE "cart_id" = $1', [cartId]);
      if (getAllItems.rows?.length) {
        return getAllItems.rows;
      }
      return null;
    } catch(err) {
      throw new Error('Error getting all cart items: ' + err.message);
    }
  }

  /**
   * Gets the quantity of a specific product in a cart.
   * @param {number} cartId - The cart ID
   * @param {number} productId - The product ID
   * @returns {Promise<number|null>} The quantity count, or null if not found
   * @throws {Error} If database query fails
   */
  async getQuantity(cartId, productId) {
    try {
      const quantity = await db.query(
        `SELECT COUNT(*) 
        FROM "cart_items" 
        WHERE "cart_id" = $1
        AND "product_id" = $2`, [cartId, productId]);
      if (quantity) {
        const count = parseInt(quantity.rows[0].count);
        return count;
      }
      return null;
    } catch(err) {
      throw new Error('Error counting quantity: ' + err.message);
    }
  }

  /**
   * Retrieves the prices of all products in a cart.
   * @param {number} cartId - The cart ID
   * @returns {Promise<Array|null>} Array of price objects, or null if none found
   * @throws {Error} If database query fails
   */
  async getProductPrice(cartId) {
    try {
      const price = await db.query(
        `SELECT "products"."price"
        FROM "products", "cart_items"
        WHERE "products"."id" = "cart_items"."product_id"
        AND "cart_id" = $1`, [cartId]);
      if (price.rows?.length) {
        return price.rows;
      }
      return null;
    } catch(err) {
      throw new Error('Error getting product price: ' + err.message);
    }
  }

  /**
   * Retrieves all product IDs in a cart.
   * @param {number} cartId - The cart ID
   * @returns {Promise<Array|null>} Array of product ID objects, or null if none found
   * @throws {Error} If database query fails
   */
  async getProductId(cartId) {
    try {
      const product = await db.query(
        `SELECT "products"."id"
        FROM "products", "cart_items"
        WHERE "products"."id" = "cart_items"."product_id"
        AND "cart_id" = $1`, [cartId]);
      if (product.rows?.length) {
        return product.rows;
      }
      return null;
    } catch(err) {
      throw new Error('Error finding product ids: ' + err.message);
    }
  }

  /**
   * Converts a cart item to an order item during checkout.
   * @param {number} quantity - The quantity of the product
   * @param {number} price - The price of the product
   * @param {number} orderId - The order ID to associate with
   * @param {number} productId - The product ID
   * @returns {Promise<Object>} The newly created order item object
   * @throws {Error} If database insertion fails
   */
  async cartCheckout(quantity, price, orderId, productId) {
    try {
      const addNewItemToOrder = await db.query(
        `INSERT INTO "order_items" 
        ("quantity", "price", "order_id", "product_id")
        VALUES ($1, $2, $3, $4)
        RETURNING *`,
        [quantity, price, orderId, productId]
      );
      const newItemToOrder = addNewItemToOrder.rows[0];
      return newItemToOrder;
    } catch(err) {
      throw new Error('Error adding new item to order: ' + err.message);
    }
  }
}