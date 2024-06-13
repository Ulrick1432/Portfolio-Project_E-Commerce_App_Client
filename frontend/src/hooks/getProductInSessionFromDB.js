// src/hooks/getProductInSessionFromDB.js
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllProductsInSessionFromDB, getCartInSession } from '../api/cart'; // Adjust the import path as necessary
import { cartState } from '../utils/cart';

const useGetAllProductsInSessionFromDbWithQuantity = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProductsInSessionFromDB();
        let data = await response;
  
        if (!data) {
          return console.log('No products are added to cart');
        }
        console.log('This is the response in the useEffect getAllProducts: → ', data);
  
        //If no data allProduct state is updated and triggers a re-render.
        if (!data) {
          return setAllProducts([]);
        };
  
        let getQuantityFromSession = await getCartInSession();
        console.log('This is the getQuantityFromSession → ', getQuantityFromSession);
  
        // Create a countMap to store quantities
        let countMap = getQuantityFromSession.reduce((acc, num) => {
          acc[num] = (acc[num] || 0) + 1;
          return acc;
        }, {});
  
        // Add quantity to each product
        for (let product of data) {
          let productId = product.id;
          let quantity = countMap[productId] || 0; // Get quantity from countMap
          product.quantity = quantity;
        }

        dispatch(cartState(data));
      } catch (err) {
        console.error('Error getting response from getAllProductsInSessionFromDB API: ', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading };
};

export default useGetAllProductsInSessionFromDbWithQuantity;

