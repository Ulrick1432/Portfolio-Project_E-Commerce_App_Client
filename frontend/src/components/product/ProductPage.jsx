/**
 * ProductPage Component
 * 
 * Displays detailed information for a single product.
 * Fetches product data based on URL parameter and provides add-to-cart functionality.
 * 
 * Features:
 *   - Fetches product by ID from URL params
 *   - Displays full product details (image, name, price, stock, description)
 *   - Add to cart button that creates cart if needed
 *   - Persists cart items in server-side session
 * 
 * @module components/ProductPage
 */

import { useEffect, useState } from "react";
import { getProductById } from "../../api/product";
import { useParams } from "react-router-dom";
import { addToCartInSession, createCart, getCartInSession } from "../../api/cart";
import './productPage.css';

/**
 * ProductPage component - displays full product details with add-to-cart.
 * 
 * @returns {JSX.Element} Rendered product detail page
 */
const ProductPage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  /**
   * Fetches product data from API when component mounts or product ID changes.
   */
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response);
      } catch(err) {
        console.error('Error getting product by ID: ', err);
      }
    };
    getProduct();
  }, [id]);

  /**
   * Handles adding the current product to the shopping cart.
   * Creates a new cart if one doesn't exist, then adds the item.
   * 
   * @param {Event} e - Click event from add-to-cart button
   */
  const handleClickAddToCart = async (e) => {
    e.preventDefault();
    try {
      const itemId = id;
      let getCart = await getCartInSession();

      // Create new cart if session cart doesn't exist or is empty
      if (!getCart?.length) {
        const newCart = await createCart();
        getCart = newCart.cartItems || [];
      }

      const response = await addToCartInSession(itemId);
      console.log('Updated cart:', response);

    } catch(err) {
      console.error('Error adding item to cart: → ', err);
    }
  };

  return (
    <div className="productPage">
      <img src={product.image} alt={product.name}/>
      <h3 className="productName"> {product.name} </h3>
      <p className="productPrice"> Price: {product.price} </p>
      <p className="productStock"> In Stock: {product.stock} </p>
      <p className="productDescription"> {product.description} </p>
      <button className="addToCart" onClick={handleClickAddToCart}>Add to cart</button>
    </div>
  );
};

export default ProductPage;
