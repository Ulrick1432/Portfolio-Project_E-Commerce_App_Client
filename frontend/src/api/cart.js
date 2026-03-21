/**
 * Shopping cart API module.
 * Handles session-based cart operations including add, update, delete, and retrieve items.
 */
import { api } from './index';

/**
 * Creates a new shopping cart on the server.
 * @returns {Promise<Object>} The created cart object with id and cartItems array
 */
export const createCart = async () => {
  try {
    const response = await fetch(`${api}/cart/create_cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ created: new Date() }),
      credentials: 'include'
    });
    const data = await response.json();
    return data;
  } catch(err) {
    console.error('Error creating new cart: ', err);
  }
};

/**
 * Adds a product item to the session-based cart.
 * @param {string|number} item - The product ID to add to the cart
 * @returns {Promise<Object>} Response containing the updated cart
 */
export const addToCartInSession = async (item) => {
  try {
    const response = await fetch(`${api}/cart/add_to_cart_in_session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item }),
      credentials: 'include'
    });
    const data = await response.json();
    return data;
  } catch(err) {
    console.error('Error adding item to cart in session: ', err);
  }
};

/**
 * Updates the quantity of a product in the session-based cart.
 * @param {string|number} id - The product ID to update
 * @param {number} newQuantity - The new desired quantity
 * @param {number} oldQuantity - The current quantity in the cart
 * @returns {Promise<Object>} Response containing updated cart or warning message
 */
export const updateQuantityToCartInSession = async (id, newQuantity, oldQuantity) => {
  try {
    const response = await fetch(`${api}/cart/update_cart_item_by_id_in_session`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, newQuantity, oldQuantity }),
      credentials: 'include'
    })
    if (response.status === 204) {
      return { message: 'quantity cannot be changed to 0. instead click on a remove button' };
    }
    const data = await response.json();
    return data;
  } catch(err) {
    console.error('Error updating quantity in req.session.cart: ', err);
  }
};

/**
 * Deletes a product from the session-based cart.
 * @param {string|number} id - The product ID to remove from the cart
 * @returns {Promise<Object>} Response containing updated cart or not found message
 */
export const deleteCartItemInSession = async (id) => {
  try {
    const response = await fetch(`${api}/cart/delete_cart_item_by_id_in_session`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
      credentials: 'include'
    });

    if (response.status === 204) {
      return { message: 'Item does not exist in the cart' };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error deleting item from cart in session: ', err);
  }
};

/**
 * Retrieves all product IDs stored in the session cart.
 * @returns {Promise<Array>} Array of product IDs in the cart
 */
export const getCartInSession = async () => {
  try {
    const response = await fetch(`${api}/cart/get_cart_in_session`, {
      credentials: 'include'
    });
    const data = await response.json();
    return data;
  } catch(err) {
    console.error('Error getting items/cart from the session: ', err);
  }
};

/**
 * Retrieves full product details from the database for all items in the session cart.
 * Returns unique products (deduplicates repeated items).
 * @returns {Promise<Array>} Array of product objects with full details
 */
export const getAllProductsInSessionFromDB = async () => {
  try {
    const response = await fetch(`${api}/cart/get_all_products_in_session_from_db`, {
      credentials: 'include'
    });

    if (response.status === 204) {
      return [];
    }

    const data = await response.json();
    return data;
  } catch(err) {
    console.error('Error getting all products in session from database: → ', err);
    return [];
  }
};

/**
 * Stores the payment completion status in the session.
 * @param {string} status - The payment status (e.g., 'completed', 'pending')
 * @returns {Promise<Object>} Response confirming the status was stored
 */
export const addPaymentStatusToSession = async (status) => {
  try {
    const response = await fetch(`${api}/cart/payment_completion`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
      credentials: 'include'
    });
    const data = await response.json();
    console.log('This is the response from addPaymentStatusToSession: → ', data);
    return data;
  } catch(err) {
    console.error('Error adding payment status to the session', err);
  }
};