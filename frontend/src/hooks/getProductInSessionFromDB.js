// src/hooks/getProductInSessionFromDB.js
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllProductsInSessionFromDB, getCartInSession } from '../api/cart';
import { cartState } from '../utils/cart';

const useGetAllProductsInSessionFromDbWithQuantity = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);

    try {
      const data = await getAllProductsInSessionFromDB();
      if (!data || data.length === 0) {
        setProducts([]);
        dispatch(cartState([]));
        return;
      }

      const getQuantityFromSession = await getCartInSession();

      const countMap = getQuantityFromSession.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
      }, {});

      for (const product of data) {
        const productId = product.id;
        product.quantity = countMap[productId] || 0;
      }

      setProducts(data);
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

  return { loading, refetch: fetchData, products };
};

export default useGetAllProductsInSessionFromDbWithQuantity;

