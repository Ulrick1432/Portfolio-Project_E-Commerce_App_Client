// Used for rendering a particular product.
//import defaultImage from '../../resources/productImages/default-product-image.png'
//Source for default img "resources/productImages/default-product-image.png"
import { useNavigate } from "react-router-dom";
import { deleteCartItemInSession, updateQuantityToCartInSession } from "../../api/cart";

const Product = ({ name, price, stock, description, image, id, quantity, deletable, onRemove  }) => {
  const navigate = useNavigate();

  const handleClickProduct = (id) => {
    return navigate(`/product/${id}`);
  }
  const handleQuantityChange = async (e) => {
    const oldQuantity = quantity;
    let newQuantity = e.target.value;
    console.log('This is the newQuantity: → ',newQuantity);
    const response = await updateQuantityToCartInSession(id, newQuantity, oldQuantity);
    console.log('This is the response in handleQuantityChange from updateQuantityToCartInSession: → ', response);
    onRemove();
  };


  const handleClickRemoveProduct = async () => {
    console.log(id)
    const response = await deleteCartItemInSession(id);
    onRemove();
    console.log(response)
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