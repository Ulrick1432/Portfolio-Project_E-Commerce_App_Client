// This file should be used for fetching products

import { api } from '.';

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${api}/product/get_all`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch(err) {
    console.log('Error getting all products: ', err);
  }
};