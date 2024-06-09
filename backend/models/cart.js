// carts + cartsItems
const db = require('../db/index');

// Carts er kurven.
// CartsItems er det der er i kurven
module.exports = class CartsModel {

  // POST Carts
  async createCart(created) {
    try {
      const createNewCart = await db.query('INSERT INTO "carts" ("created") VALUES ($1) RETURNING *', [created]);
      const newCart = createNewCart.rows[0];
      return newCart
    } catch (err) {
      throw new Error('Error creating new cart: ' + err.message);
    }
  }
  // GET Carts by id
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
  // POST CartsItems
  async addItem(created, id, productId) {
    try {
      const addNewItem = await db.query('INSERT INTO "cart_items" ("created", "cart_id", "product_id") VALUES ($1, $2, $3)',
      [created, id, productId]);
      const newItem = addNewItem.rows[0];
      return newItem;
    } catch(err) {
      throw new Error('Error Adding new carItems: ' + err.message);
    }
  }
  // GET all CartsItems in cart
  async getItems(cartId) {
    try {
      const GetAllItems = await db.query('SELECT * FROM "cart_items" WHERE "cart_id" = $1', [cartId]);
      if (GetAllItems.rows?.length) {
        return GetAllItems.rows;
      }
      return null;
    } catch(err) {
      throw new Error('Error Getting all CartsItems: ' + err.message);
    }
  }

  // GET quantity of cartItems
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
      throw new Error('Error counting Quantity: ' + err.message);
    }
  }

  // GET price of cartItems
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

  // GET id of product
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
      throw new Error('Error finding products id: ' + err.message);
    }
  }

  // POST Carts checkout (adding OrderItem)
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