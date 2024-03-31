// carts.js models
// carts + cartsItems
const db = require('../db/index');

// Carts er kurven.
module.exports = class CartsModel {
  async CreateCart(created) {
    try {
      const createNewCart = await db.query('INSERT INTO "Carts" ("Created") VALUES ($1) RETURNING *', [created]);
      const newCart = createNewCart.rows[0];
      return newCart
    } catch (err) {
      throw new Error('Error creating new cart: ' + err.message);
    }
  }
}
// POST Carts

// GET Carts by id

// CartsItems er det der er i kurven

// POST CartsItems

// GET ALL CartsItems