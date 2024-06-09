const db = require('../db/index');

module.exports = class OrderModel {
  // Creates new order
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
      return newOrder
    } catch(err) {
      throw new Error('Error creating new order: ' + err.message);
    }
  }

  // Get all Orders
  async getAllOrders() {
    try {
      const allOrders = await db.query(`SELECT * FROM "orders"`);
      const orders = allOrders.rows;
      return orders;
    } catch(err) {
      throw new Error('Error getting all orders: ' + err.message);
    }
  }

  // Get order by id
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
}