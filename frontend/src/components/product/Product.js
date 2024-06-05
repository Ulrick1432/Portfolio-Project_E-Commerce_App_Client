// Used for rendering a particular product.
//import defaultImage from '../../resources/productImages/default-product-image.png'
//Source for default img "resources/productImages/default-product-image.png"

const Product = ({ name, price, stock, description, image }) => {
  return (
    <div>
      <h3 className="productName"> {name} </h3>
      <p className="productPrice"> {price} </p>
      <p className="productStock"> {stock} </p>
      <p className="productDescription"> {description} </p>

      <img src={image} alt={name}/>
    </div>
  );
}

export default Product;