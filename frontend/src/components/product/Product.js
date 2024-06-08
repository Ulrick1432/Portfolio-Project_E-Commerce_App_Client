// Used for rendering a particular product.
//import defaultImage from '../../resources/productImages/default-product-image.png'
//Source for default img "resources/productImages/default-product-image.png"
import { useNavigate } from "react-router-dom";

const Product = ({ name, price, stock, description, image, id, quantity }) => {
  const navigate = useNavigate();

  const handleClickProduct = (id) => {
    return navigate(`/product/${id}`);
  }

  return (
    <div className="product" onClick={() => handleClickProduct(id)}>
      <h3 className="productName"> {name} </h3>
      <p className="productPrice"> Price {price} </p>
      {quantity ? (<p>Quantity {quantity}</p>) : null}
      <p className="productStock"> In Stock {stock} </p>
      <h4>Description</h4>
      <p className="productDescription"> {description} </p>
      <img src={image} alt={name}/>
    </div>
  );
}

export default Product;