// Used for rendering a particular product.
//import defaultImage from '../../resources/productImages/default-product-image.png'
//Source for default img "resources/productImages/default-product-image.png"
import { useNavigate } from "react-router-dom";
import { deleteCartItemInSession } from "../../api/cart";

const Product = ({ name, price, stock, description, image, id, quantity, deletable, onRemove  }) => {
  const navigate = useNavigate();

  const handleClickProduct = (id) => {
    return navigate(`/product/${id}`);
  }
  const handleClickIncreaseQuantity = () => {
    return quantity + 1;
  };

  const handleClickDecreaseQuantity = () => {
    return quantity + 1;
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
          <input type="number" name="quantity" defaultValue={quantity}/>
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