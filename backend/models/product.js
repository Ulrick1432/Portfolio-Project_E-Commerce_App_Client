const db = require('../db/index');

module.exports = class ProductModel {

  async getAllProducts() {
    try {
      const getProducts = await db.query('SELECT * FROM "Products"');
      if (getProducts.rows?.length) {
        return getProducts.rows;
      }
      return [];
    } catch(err) {
      throw new Error('Error getting all products from the database');
    }
  }

  async addProduct(name, price, stock) {
    try {
      const addNewProduct = await db.query('INSERT INTO "Products" ("Name", "Price", "Stock") VALUES ($1, $2, $3) RETURNING *',
      [name, price, stock]);
      const newProduct = addNewProduct.rows[0];
      return newProduct;
    } catch(err) {
      throw new Error('Error adding product: ' + err.message);
    }
  }

  async getProductById(id) {
    try {
      const product = await db.query('SELECT * FROM "Products" WHERE "id" = $1', [id]);
      if (product.rows?.length) {
        return product.rows[0];
      }
      return null;
    } catch(err) {
      throw new Error('Error finding products id: ' + err.message);
    }
  }

  async getMultipleProductsById(IdArr) {
    try {
      const products = await db.query('SELECT * FROM "Products" WHERE "id" = ANY($1::int[])', IdArr);
      if (products.rows?.length) {
        return products.rows;
      }
      return null;
    } catch(err) {
      throw new Error('Error finding products with multiple product ids: ', err);
    }
  }

  async updateProductById(id, updateFields) {
    try {
      const { name, price, stock } = updateFields;
      const queryValues = [id];
      let setClause = '';
      let i = 2;
      // Constructs the SET clause dynamically based on provided fields
      if (updateFields.hasOwnProperty('name')) {
        setClause += `"Name" = $${i++}, `;
        queryValues.push(name);
      }
      if (updateFields.hasOwnProperty('price')) {
        setClause += `"Price" = $${i++}, `;
        queryValues.push(price);
      }
      if (updateFields.hasOwnProperty('stock')) {
        setClause += `"Stock" = $${i++}, `;
        queryValues.push(stock);
      }

      // Remove the trailing comma and space from the SET clause
      setClause = setClause.slice(0, -2);

      // Construct and execute the SQL query
      const queryText = `UPDATE "Products" SET ${setClause} WHERE "id" = $1 RETURNING *`;
      const product = await db.query(queryText, queryValues);
      if(product.rows?.length) {
        return product.rows[0];
      }
      return null;
    } catch(err) {
      throw new Error(`Error updating product: ` + err.message);
    }
  }

  async deleteProductById(id) {
    try {
      const queryText = `DELETE FROM "Products" WHERE "id" = $1`;
      await db.query(queryText, [id]);
    } catch(err) {
      throw new Error('Error deleting product: ' + err.message);
    }
  }
}