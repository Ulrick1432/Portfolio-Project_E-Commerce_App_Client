import { api } from '.';

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
      // Check if response is not empty
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
      console.error(`Server responded with status and message: ${response.status & response.message}`);
    }
  } catch(err) {
    console.error('Error getting all orderitems by order id: ', err);
  }
};

