// get product by ID
import { useEffect, useState } from "react";
import { getProductById } from "../../api/product";
import { useParams } from "react-router-dom";
import { addToCartInSession, createCart, getCartInSession } from "../../api/cart";

const ProductPage = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  console.log(id);

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

  const handleClickAddToCart = async (e) => {
    e.preventDefault();
    const itemId = id;
    try {
      const getCart = await getCartInSession();
      console.log('getCart.length = ', getCart.length)
      console.log('getcart = ', getCart)
      if (!getCart.length) {
        console.log('!getCart.length = true ')
        const create = await createCart();
        console.log(create);
      }
      const response = await addToCartInSession(itemId);
      console.log('This is the response from handleClickAddToCart: → ', response);
      
    } catch(err) {
      console.log('Error adding item to cart: → ', err);
    }
  };
  
  return (
    <div className="productPage">
      <img src={product.image} alt={product.name}/>
      <h3 className="productName"> {product.name} </h3>
      <p className="productPrice"> {product.price} </p>
      <p className="productStock"> {product.stock} </p>
      <p className="productDescription"> {product.description} </p>
      <button onClick={handleClickAddToCart}>Add to cart</button>
    </div>
  )
}

export default ProductPage;