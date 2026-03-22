/**
 * Product Component
 * 
 * Renders a single product card with details and interactive features.
 * Can display as a browse item or as a cart item with quantity controls.
 * 
 * Features:
 *   - Product name, price, stock, and description display
 *   - Product image with click-to-view handler
 *   - Optional quantity input for cart management
 *   - Optional delete/remove functionality for cart items
 *   - Clickable name to navigate to product detail page
 * 
 * @module components/Product
 */

import { useNavigate } from "react-router-dom";
import { deleteCartItemInSession, updateQuantityToCartInSession } from "../../api/cart";
import './product.css';

/**
 * Product component - displays product information and cart actions.
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Product name
 * @param {number} props.price - Product price
 * @param {number} props.stock - Available stock quantity
 * @param {string} props.description - Product description
 * @param {string} props.image - URL to product image
 * @param {number} props.id - Unique product identifier
 * @param {number} [props.quantity] - Current quantity in cart (if applicable)
 * @param {boolean} [props.deletable] - Whether delete button should be shown
 * @param {Function} [props.onRemove] - Callback after quantity change or delete
 * @returns {JSX.Element} Rendered product card
 */
const Product = ({ name, price, stock, description, image, id, quantity, deletable, onRemove }) => {
  const navigate = useNavigate();

  /**
   * Navigates to the product detail page for the clicked product.
   * @param {number} productId - Product ID to navigate to
   */
  const handleClickProduct = (productId) => {
    return navigate(`/product/${productId}`);
  };

  /**
   * Handles quantity input change and updates cart via API.
   * Calls onRemove callback after successful update to refresh parent.
   * @param {Event} e - Change event from quantity input
   */
  const handleQuantityChange = async (e) => {
    const oldQuantity = quantity;
    let newQuantity = e.target.value;
    await updateQuantityToCartInSession(id, newQuantity, oldQuantity);
    onRemove();
  };

  /**
   * Removes product from cart via API call.
   * Calls onRemove callback after successful deletion to refresh parent.
   */
  const handleClickRemoveProduct = async () => {
    await deleteCartItemInSession(id);
    onRemove();
  };

  return (
    <div className="product">
      <h3 className="productName" onClick={() => handleClickProduct(id)} > {name} </h3>
      <p className="productPrice"> Price {price} </p>
      {quantity ? (
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input type="number" name="quantity" min={0} defaultValue={quantity} onChange={handleQuantityChange} />
        </div>
      ) : null}
      {deletable ? (<button onClick={handleClickRemoveProduct}>Remove product</button>) : null}
      <p className="productStock"> In Stock {stock} </p>
      <h4>Description</h4>
      <p className="productDescription"> {description} </p>
      {image ? <img src={image} alt={name} onClick={() => handleClickProduct(id)}/> : null}
    </div>
  );
};

export default Product;
