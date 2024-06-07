// Used for rendering a particular product.
//import defaultImage from '../../resources/productImages/default-product-image.png'
//Source for default img "resources/productImages/default-product-image.png"
import { useNavigate } from "react-router-dom";

const Product = ({ name, price, stock, description, image, id }) => {
  const navigate = useNavigate();

  const handleClickProduct = (e, id) => {
    e.preventDefault();
    return navigate(`/product/${id}`);
  }

  return (
    <div className="product" onClick={() => handleClickProduct(id)}>
      <h3 className="productName"> {name} </h3>
      <p className="productPrice"> {price} </p>
      <p className="productStock"> {stock} </p>
      <p className="productDescription"> {description} </p>
      <img src={image} alt={name}/>
    </div>
  );
}

export default Product;