import { api } from '.';

// Add product to Cart in Session
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
    console.log('This is the response from addToCartInSession: → ', data);
    return data;
  } catch(err) {
    console.log('Error adding item to cart in session: ', err);
  }
};

// Increase product quantity by id

// Decrease product quantity by id

// Delete product from cart in session
export const deleteCartItemInSession = async (id) => {
  try {
    const response = await fetch(`${api}/cart/delete_cart_item_by_id_in_session`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }), // Ensure the id is sent as a JSON object
      credentials: 'include'
    });

    if (response.status === 204) {
      console.log('Item does not exist in the cart.');
      return { message: 'Item does not exist in the cart' };
    }

    const data = await response.json();
    console.log('This is the response from deleteCartItemInSession: → ', data);
    return data;
  } catch (err) {
    console.log('Error deleting item from cart in session: ', err);
  }
};

// Get cart in session
export const getCartInSession = async () => {
  try {
    const response = await fetch(`${api}/cart/get_cart_in_session`, {
      credentials: 'include'
    });
    const data = await response.json();
    console.log('This is the response from getCartInSession: → ', data);
    return data;
  } catch(err) {
    console.log('Error getting items/cart from the session: ', err);
  }
};

// Get all products in session from DB - if there is 2 of the same product it still only returns 1 product per ID
export const getAllProductsInSessionFromDB = async () => {
  try {
    const response = await fetch(`${api}/cart/get_all_products_in_session_from_db`, {
      credentials: 'include'
    });
    const data = await response.json();
    console.log('This is the response from getAllProductsInSessionFromDB: → ', data);
    return data;
  } catch(err) {
    console.log('Error getting all products in session from database: → ', err);
  }
};