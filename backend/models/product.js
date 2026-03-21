const db = require('../db/index');

module.exports = class ProductModel {
  /**
   * Retrieves all products from the database.
   * @returns {Promise<Array>} Array of all product objects
   * @throws {Error} If database query fails
   */
  async getAllProducts() {
    try {
      const getProducts = await db.query('SELECT * FROM "products"');
      if (getProducts.rows?.length) {
        return getProducts.rows;
      }
      return [];
    } catch(err) {
      throw new Error('Error getting all products from the database');
    }
  }

  /**
   * Adds a new product to the database.
   * @param {string} name - The product name
   * @param {number} price - The product price
   * @param {number} stock - The available stock quantity
   * @returns {Promise<Object>} The newly created product object
   * @throws {Error} If database insertion fails
   */
  async addProduct(name, price, stock) {
    try {
      const addNewProduct = await db.query(
        'INSERT INTO "products" ("name", "price", "stock") VALUES ($1, $2, $3) RETURNING *',
        [name, price, stock]
      );
      const newProduct = addNewProduct.rows[0];
      return newProduct;
    } catch(err) {
      throw new Error('Error adding product: ' + err.message);
    }
  }

  /**
   * Retrieves a single product by its ID.
   * @param {number} id - The product ID
   * @returns {Promise<Object|null>} The product object, or null if not found
   * @throws {Error} If database query fails
   */
  async getProductById(id) {
    try {
      const product = await db.query('SELECT * FROM "products" WHERE "id" = $1', [id]);
      if (product.rows?.length) {
        return product.rows[0];
      }
      return null;
    } catch(err) {
      throw new Error('Error finding product: ' + err.message);
    }
  }

  /**
   * Retrieves multiple products by an array of IDs.
   * @param {Array<number>} idArr - Array of product IDs
   * @returns {Promise<Array|null>} Array of product objects, or null if none found
   * @throws {Error} If database query fails
   */
  async getMultipleProductsById(idArr) {
    try {
      const products = await db.query('SELECT * FROM "products" WHERE "id" = ANY($1::int[])', [idArr]);
      if (products.rows?.length) {
        return products.rows;
      }
      return null;
    } catch(err) {
      throw new Error('Error finding products with multiple ids: ' + err.message);
    }
  }

  /**
   * Updates a product by its ID with the provided fields.
   * @param {number} id - The product ID to update
   * @param {Object} updateFields - Object containing fields to update (name, price, stock)
   * @returns {Promise<Object|null>} The updated product object, or null if not found
   * @throws {Error} If database update fails
   */
  async updateProductById(id, updateFields) {
    try {
      const { name, price, stock } = updateFields;
      const queryValues = [id];
      let setClause = '';
      let i = 2;
      if (updateFields.hasOwnProperty('name')) {
        setClause += `"name" = $${i++}, `;
        queryValues.push(name);
      }
      if (updateFields.hasOwnProperty('price')) {
        setClause += `"price" = $${i++}, `;
        queryValues.push(price);
      }
      if (updateFields.hasOwnProperty('stock')) {
        setClause += `"stock" = $${i++}, `;
        queryValues.push(stock);
      }
      setClause = setClause.slice(0, -2);
      const queryText = `UPDATE "products" SET ${setClause} WHERE "id" = $1 RETURNING *`;
      const product = await db.query(queryText, queryValues);
      if (product.rows?.length) {
        return product.rows[0];
      }
      return null;
    } catch(err) {
      throw new Error('Error updating product: ' + err.message);
    }
  }

  /**
   * Deletes a product from the database by its ID.
   * @param {number} id - The product ID to delete
   * @throws {Error} If database deletion fails
   */
  async deleteProductById(id) {
    try {
      const queryText = `DELETE FROM "products" WHERE "id" = $1`;
      await db.query(queryText, [id]);
    } catch(err) {
      throw new Error('Error deleting product: ' + err.message);
    }
  }
}