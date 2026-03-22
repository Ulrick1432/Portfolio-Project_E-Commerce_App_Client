/**
 * Custom Hook: getProductInSessionFromDB
 * 
 * Fetches cart products from the database and calculates quantities based on
 * the user's session cart. Updates both local state and Redux store.
 * 
 * Purpose:
 *   - Retrieves full product details for items in the session cart
 *   - Calculates quantity of each product from the cart array
 *   - Provides loading state for UI feedback
 *   - Exposes refetch function for manual refresh
 * 
 * Data Flow:
 *   1. Fetch unique products from database (via getAllProductsInSessionFromDB)
 *   2. Fetch raw cart array from session (via getCartInSession)
 *   3. Count occurrences of each product ID to determine quantities
 *   4. Attach quantity to each product object
 *   5. Update both local state and Redux store
 * 
 * @module hooks/getProductInSessionFromDB
 */

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllProductsInSessionFromDB, getCartInSession } from '../api/cart';
import { cartState } from '../utils/cart';

/**
 * Custom hook for fetching and managing cart products.
 * 
 * @returns {Object} Hook return value
 * @returns {boolean} returns.loading - Whether data is currently being fetched
 * @returns {Function} returns.refetch - Function to manually refresh cart data
 * @returns {Array} returns.products - Array of product objects with quantity attached
 * 
 * @example
 * function CartPage() {
 *   const { loading, refetch, products } = useGetAllProductsInSessionFromDbWithQuantity();
 *   
 *   if (loading) return <p>Loading...</p>;
 *   
 *   return (
 *     <div>
 *       {products.map(product => (
 *         <Product key={product.id} {...product} />
 *       ))}
 *     </div>
 *   );
 * }
 */
const useGetAllProductsInSessionFromDbWithQuantity = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  /**
   * Fetches cart products and calculates quantities.
   * 
   * Process:
   *   1. Fetch unique products from database
   *   2. Fetch raw cart IDs from session
   *   3. Count ID occurrences to get quantities
   *   4. Attach quantity to each product
   *   5. Update local state and Redux
   */
  const fetchData = async () => {
    setLoading(true);

    try {
      // Step 1: Fetch full product details from database
      // Returns unique products (duplicates removed from cart array)
      const data = await getAllProductsInSessionFromDB();

      // Handle empty cart
      if (!data || data.length === 0) {
        setProducts([]);
        dispatch(cartState([]));
        return;
      }

      // Step 2: Fetch raw cart array from session
      // Returns array like [1, 1, 2, 3, 3, 3] (product IDs, duplicates = quantity)
      const getQuantityFromSession = await getCartInSession();

      // Step 3: Build quantity count map
      // { '1': 2, '2': 1, '3': 3 } means: 2x product 1, 1x product 2, 3x product 3
      const countMap = getQuantityFromSession.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
      }, {});

      // Step 4: Attach quantity to each product
      for (const product of data) {
        const productId = product.id;
        product.quantity = countMap[productId] || 0;
      }

      // Step 5: Update both local state and Redux store
      setProducts(data);
      dispatch(cartState(data));

    } catch (err) {
      console.error('Error fetching cart products:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Returns an object with:
   *   - loading: boolean indicating if data is being fetched
   *   - refetch: function to manually trigger a data refresh
   *   - products: array of product objects with quantity
   */
  return { loading, refetch: fetchData, products };
};

export default useGetAllProductsInSessionFromDbWithQuantity;
