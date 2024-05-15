// carts.js models
// carts + cartsItems
const db = require('../db/index');

// Carts er kurven.
// CartsItems er det der er i kurven
module.exports = class CartsModel {
  // POST Carts
  async CreateCart(created) {
    try {
      const createNewCart = await db.query('INSERT INTO "Carts" ("Created") VALUES ($1) RETURNING *', [created]);
      const newCart = createNewCart.rows[0];
      return newCart
    } catch (err) {
      throw new Error('Error creating new cart: ' + err.message);
    }
  }
  // GET Carts by id
  async GetCart(id) {
    try {
      const cart = await db.query('SELECT * FROM "Carts" WHERE "id" = $1', [id]);
      if (cart.rows?.length) {
        return cart.rows[0];
      }
      return null;
    } catch(err) {
      throw new Error('Error getting cart: ' + err.message);
    }
  }
  // POST CartsItems
  async AddItem(created, id, productId) {
    try {
      const addNewItem = await db.query('INSERT INTO "CartItems" ("Created", "Cart_id", "Product_id") VALUES ($1, $2, $3)',
      [created, id, productId]);
      const newItem = addNewItem.rows[0];
      return newItem;
    } catch(err) {
      throw new Error('Error Adding new carItems: ' + err.message);
    }
  }
  // GET all CartsItems in cart
  async GetItems(cartId) {
    try {
      const GetAllItems = await db.query('SELECT * FROM "CartItems" WHERE "Cart_id" = $1', [cartId]);
      if (GetAllItems.rows?.length) {
        return GetAllItems.rows;
      }
      return null;
    } catch(err) {
      throw new Error('Error Getting all CartsItems: ' + err.message);
    }
  }

  // GET quantity of cartItems
  async GetQuantity(cartId, productId) {
    try {
      const quantity = await db.query(
        `SELECT COUNT(*) 
        FROM "CartItems" 
        WHERE "Cart_id" = $1
        AND "Product_id" = $2`, [cartId, productId]);
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
  async GetProductPrice(cartId) {
    try {
      const price = await db.query(
        `SELECT "Products"."Price"
        FROM "Products", "CartItems"
        WHERE "Products"."id" = "CartItems"."Product_id"
        AND "Cart_id" = $1`, [cartId]);
      if (price.rows?.length) {
        return price.rows;
      }
      return null;
    } catch(err) {
      throw new Error('Error getting product price: ' + err.message);
    }
  }

  // GET id of product
  async GetProductId(cartId) {
    try {
      const product = await db.query(
        `SELECT "Products"."id"
        FROM "Products", "CartItems"
        WHERE "Products"."id" = "CartItems"."Product_id"
        AND "Cart_id" = $1`, [cartId]);
      if (product.rows?.length) {
        return product.rows;
      }
      return null;
    } catch(err) {
      throw new Error('Error finding products id: ' + err.message);
    }
  }

  // POST Carts checkout (adding OrderItem)
  async CartCheckout(quantity, price, orderId, productId) {
    try {
      const addNewItemToOrder = await db.query(
        `INSERT INTO "OrderItems" 
        ("Quantity", "Price", "order_id", "product_id")
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

