const db = require('../db/index');

module.exports = class OrderModel {
  /**
   * Creates a new order in the database.
   * @param {string} status - The initial order status (e.g., 'Pending', 'Completed')
   * @param {number} userId - The ID of the user placing the order
   * @param {number} cartId - The ID of the cart associated with this order
   * @returns {Promise<Object>} The newly created order object
   * @throws {Error} If database insertion fails
   */
  async createOrder(status, userId, cartId) {
    try {
      const createNewOrder = await db.query(
        `INSERT INTO "orders" 
        ("status", "user_id", "cart_id") 
        VALUES ($1, $2, $3) 
        RETURNING *`,
        [status, userId, cartId]
      );
      const newOrder = createNewOrder.rows[0];
      return newOrder;
    } catch(err) {
      throw new Error('Error creating new order: ' + err.message);
    }
  }

  /**
   * Retrieves all orders for a specific user.
   * @param {number} userId - The ID of the user
   * @returns {Promise<Array|null>} Array of order objects, or null if none found
   * @throws {Error} If database query fails
   */
  async getAllOrdersById(userId) {
    try {
      const orders = await db.query(`SELECT * FROM "orders" WHERE "user_id" = $1`, [userId]);
      if (orders.rows?.length) {
        return orders.rows;
      }
      return null;
    } catch(err) {
      throw new Error('Error getting all orders: ' + err.message);
    }
  }

  /**
   * Retrieves a single order by its ID.
   * @param {number} orderId - The ID of the order to fetch
   * @returns {Promise<Object|null>} The order object, or null if not found
   * @throws {Error} If database query fails
   */
  async getOrderById(orderId) {
    try {
      const orderById = await db.query(`SELECT * FROM "orders" WHERE "id" = $1`, [orderId]);
      if (orderById.rows?.length) {
        return orderById.rows[0];
      }
      return null;
    } catch(err) {
      throw new Error('Error getting order by id: ' + err.message);
    }
  }

  /**
   * Retrieves all order items for a specific order.
   * @param {number} orderId - The ID of the order
   * @returns {Promise<Array|null>} Array of order item objects, or null if none found
   * @throws {Error} If database query fails
   */
  async getAllOrderitemsById(orderId) {
    try {
      const orderItems = await db.query(`SELECT * FROM "order_items" WHERE "order_id" = $1`, [orderId]);
      if (orderItems.rows?.length) {
        return orderItems.rows;
      }
      return null;
    } catch(err) {
      throw new Error('Error getting all orderitems by order id: ' + err.message);
    }
  }
}