import { api } from '.';

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