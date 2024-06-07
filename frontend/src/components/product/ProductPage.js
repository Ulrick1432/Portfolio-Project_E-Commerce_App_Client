// get product by ID
import { useEffect, useState } from "react";
import { getProductById } from "../../api/product";
import { useParams } from "react-router-dom";
import { addToCartInSession } from "../../api/cart";

const ProductPage = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response);
      } catch(err) {
        console.error('Error getting reponse from getProductById API: ', err);
      }
    } 
    getProduct();
  }, []);

  const handleClickAddToCart = async () => {
    const itemId = id;
    try {
      const response = await addToCartInSession(itemId);
      console.log('This is the response from handleClickAddToCart: → ', response);
      
    } catch(err) {
      console.log('Error adding item to cart: → ', err);
    }
  };
  
  return (
    <div className="productPage">
      <img src={product.Image} alt={product.Name}/>
      <h3 className="productName"> {product.Name} </h3>
      <p className="productPrice"> {product.Price} </p>
      <p className="productStock"> {product.Stock} </p>
      <p className="productDescription"> {product.Description} </p>
      <button onClick={handleClickAddToCart}>Add to cart</button>
    </div>
  )
}

export default ProductPage;