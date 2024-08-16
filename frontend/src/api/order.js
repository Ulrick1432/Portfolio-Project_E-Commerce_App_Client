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
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    return null;
  } catch(err) {
    console.error('Error getting orders by id: ', err);
  }
}; 
