// Used for rendering a particular product.

const Product = ({ name, description, image }) => {
  return (
    <div>
      <h3 className="productName"> {name} </h3>
      <p className="productDescription"> {description} </p>
      <img> attribute src: ???</img>
    </div>
  );
}

export default Product;