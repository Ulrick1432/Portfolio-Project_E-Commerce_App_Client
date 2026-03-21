/**
 * Product API module.
 * Handles fetching product data from the server.
 */
import { api } from './index';

/**
 * Retrieves all products from the database.
 * @returns {Promise<Array>} Array of all product objects
 */
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${api}/product/get_all`);
    const data = await response.json();
    return data;
  } catch(err) {
    console.log('Error getting all products: ', err);
  }
};

/**
 * Retrieves a single product by its ID.
 * @param {string|number} id - The product ID to fetch
 * @returns {Promise<Object>} The product object
 */
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${api}/product/${id}`);
    const data = await response.json();
    return data;
  } catch(err) {
    console.log('Error getting product by id: ', err);
  }
};