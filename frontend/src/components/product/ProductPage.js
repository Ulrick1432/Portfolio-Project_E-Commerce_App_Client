// get product by ID
import { useEffect, useState } from "react";
import { getProductById } from "../../api/product";
import { useParams } from "react-router-dom";
import { addToCartInSession, createCart, getCartInSession } from "../../api/cart";
import './productPage.css';
const ProductPage = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response);
      } catch(err) {
        console.error('Error getting product by ID: ', err);
      }
    }
    getProduct();
  }, [id]);

const handleClickAddToCart = async (e) => {
  e.preventDefault();
  try {
    const itemId = id;
    let getCart = await getCartInSession();

    if (!getCart?.length) {
      const newCart = await createCart();
      getCart = newCart.cartItems || [];
    }

    const response = await addToCartInSession(itemId);
    console.log('Updated cart:', response);

  } catch(err) {
    console.error('Error adding item to cart: → ', err);
  }
};
  
  return (
    <div className="productPage">
      <img src={product.image} alt={product.name}/>
      <h3 className="productName"> {product.name} </h3>
      <p className="productPrice"> Price: {product.price} </p>
      <p className="productStock"> In Stock: {product.stock} </p>
      <p className="productDescription"> {product.description} </p>
      <button className="addToCart" onClick={handleClickAddToCart}>Add to cart</button>
    </div>
  )
}

export default ProductPage;