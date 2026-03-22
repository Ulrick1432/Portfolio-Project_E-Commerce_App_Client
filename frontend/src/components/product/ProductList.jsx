/**
 * ProductList Component
 * 
 * Displays a grid/list of all available products in the catalog.
 * Fetches all products from the API on mount and renders them using Product components.
 * 
 * Features:
 *   - Fetches all products from API on component mount
 *   - Maps each product to a Product component
 *   - Displays products in an unordered list layout
 * 
 * @module components/ProductList
 */

import { useEffect, useState } from "react";
import Product from "./Product";
import { getAllProducts } from "../../api/product";
import './productList.css';

/**
 * ProductList component - displays catalog of all products.
 * 
 * @returns {JSX.Element} Rendered list of products
 */
const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);

  /**
   * Fetches all products from API when component mounts.
   * Updates state with product array for rendering.
   */
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await getAllProducts();
        setAllProducts(response);
      } catch(err) {
        console.error('Error getting response from getAllProducts API: ', err);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      <h2>List of products</h2>
      <ul className="product-list">
        {allProducts.map(product => (
          <Product 
            key={product.id} 
            name={product.name} 
            price={product.price} 
            stock={product.stock} 
            image={product.image} 
            id={product.id} 
            description={product.description}
          />
        ))}
      </ul>
    </>
  );
};

export default ProductList;
