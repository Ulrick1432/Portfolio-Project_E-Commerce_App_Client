// Used for rendering a particular product.

const Product = ({ name, price, stock, description, image }) => {
  return (
    <div>
      <h3 className="productName"> {name} </h3>
      <p className="productPrice"> {price} </p>
      <p className="productStock"> {stock} </p>
      <p className="productDescription"> {description} </p>
      <img src={image}></img>
    </div>
  );
}

export default Product;