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
    return data;
  } catch(err) {
    console.error('Error adding item to cart in session: ', err);
  }
};

// Update product quantity by id from session-based cart
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

// Delete product from cart in session
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

// Get cart in session
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

// Get all products in session from DB - if there is 2 of the same product it still only returns 1 product per ID
export const getAllProductsInSessionFromDB = async () => {
  try {
    const response = await fetch(`${api}/cart/get_all_products_in_session_from_db`, {
      credentials: 'include'
    });
    if (response.status === 204) {
      return response.message
    }
    const data = await response.json();
    return data;
  } catch(err) {
    console.error('Error getting all products in session from database: → ', err);
  }
};