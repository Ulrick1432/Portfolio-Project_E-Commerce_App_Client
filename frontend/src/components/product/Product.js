// Used for rendering a particular product.
//import defaultImage from '../../resources/productImages/default-product-image.png'
//Source for default img "resources/productImages/default-product-image.png"
import { useNavigate } from "react-router-dom";
import { deleteCartItemInSession, updateQuantityToCartInSession } from "../../api/cart";
import './product.css';

const Product = ({ name, price, stock, description, image, id, quantity, deletable, onRemove  }) => {
  const navigate = useNavigate();

  const handleClickProduct = (id) => {
    return navigate(`/product/${id}`);
  }
  const handleQuantityChange = async (e) => {
    const oldQuantity = quantity;
    let newQuantity = e.target.value;
    await updateQuantityToCartInSession(id, newQuantity, oldQuantity);
    onRemove();
  };


  const handleClickRemoveProduct = async () => {
    await deleteCartItemInSession(id);
    onRemove();
  };

  return (
    <div className="product">
      <h3 className="productName"> {name} </h3>
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
      <img src={image} alt={name} onClick={() => handleClickProduct(id)}/>
    </div>
  );
}

export default Product;