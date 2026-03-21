/**
 * Order API module.
 * Handles order and order item retrieval and creation.
 */
import { api } from './index';

/**
 * Retrieves all orders for the currently authenticated user.
 * @returns {Promise<Array|null>} Array of order objects, or null if empty/error
 */
export const allOrdersById = async () => {
  try {
    const response = await fetch(`${api}/orders/all_orders_by_Id`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    
    if (response.ok) {
      const text = await response.text();
      if (text) {
        const data = JSON.parse(text);
        return data;
      } else {
        console.error('Received empty response from the server.');
        return null;
      }
    } else {
      console.error(`Server responded with status: ${response.status}`);
      return null;
    }
  } catch (err) {
    console.error('Error getting orders by id: ', err);
  }
};

/**
 * Retrieves all order items for a specific order.
 * @param {string|number} orderId - The ID of the order to fetch items for
 * @returns {Promise<Object>} Order items data from the server
 */
export const allOrderitemsById = async (orderId) => {
  try {
    const response = await fetch(`${api}/orders/all_orderitems_by_id/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      console.error(`Server responded with status: ${response.status}`);
    }
  } catch(err) {
    console.error('Error getting all orderitems by order id: ', err);
  }
};

/**
 * Creates a new order for the current user.
 * @returns {Promise<Object>} The created order object
 */
export const createOrder = async () => {
  try {
    const response = await fetch(`${api}/orders/create_order`);
    if (response.ok) {
      const data = response.json();
      return data;
    }
  } catch (err) {
    console.error('Error creating order: ', err);
  }
}

