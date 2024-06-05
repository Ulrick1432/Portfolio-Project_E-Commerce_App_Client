// get product by ID

const ProductPage = ({ name, price, stock, description, image }) => {
  
  return (
    <div className="productPage">
      <img src={image} alt={name}/>
      <h3 className="productName"> {name} </h3>
      <p className="productPrice"> {price} </p>
      <p className="productStock"> {stock} </p>
      <p className="productDescription"> {description} </p>
      <button>Add to cart</button>
    </div>
  )
}

export default ProductPage;