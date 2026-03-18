// src/hooks/getProductInSessionFromDB.js
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllProductsInSessionFromDB, getCartInSession } from '../api/cart'; // Adjust the import path as necessary
import { cartState } from '../utils/cart';

const useGetAllProductsInSessionFromDbWithQuantity = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await getAllProductsInSessionFromDB();
      let data = await response;

      if (!response || response.length === 0) {
        dispatch(cartState([]));
        return;
      }

      let getQuantityFromSession = await getCartInSession();

      let countMap = getQuantityFromSession.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
      }, {});

      for (let product of data) {
        let productId = product.id;
        product.quantity = countMap[productId] || 0;
      }

      dispatch(cartState(data));

    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, refetch: fetchData };
};

export default useGetAllProductsInSessionFromDbWithQuantity;

