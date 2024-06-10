import { useEffect, useState } from "react";
import { getAllProductsInSessionFromDB, getCartInSession } from "../api/cart";
import Product from "./product/Product";

const CartPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading

  
  const handleProducts = async () => {
    try {
      const response = await getAllProductsInSessionFromDB();
      let data = await response;
      console.log('This is the response in the useEffect getAllProducts: → ', data);

      //If no data allProduct state is updated and triggers a re-render.
      if (!data) {
        return setAllProducts([]);
      };

      let getQuantityFromSession = await getCartInSession();
      console.log('This is the getQuantityFromSession → ', getQuantityFromSession);

      // Create a countMap to store quantities
      let countMap = getQuantityFromSession.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
      }, {});

      // Add quantity to each product
      for (let product of data) {
        let productId = product.id;
        let quantity = countMap[productId] || 0; // Get quantity from countMap
        product.quantity = quantity;
      }

      console.log('This is the countmap: → ', countMap);
      console.log('This is data after getting quantity: → ', data);

      setAllProducts(data);
    } catch (err) {
      console.error('Error getting response from getAllProductsInSessionFromDB API: ', err);
    } finally {
      setLoading(false); // Set loading to false after the API call completes
    }
  };

  useEffect(() => {
    const getAllProducts = async () => {
      handleProducts();
    }
      getAllProducts();
  }, [setAllProducts]);

  return (
    <div className="CartPage">
      <h2>This is the cart page</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : allProducts && allProducts.length > 0 ? (
        <ul>
          {allProducts.map(product => (
            <Product 
              key={product.id} 
              name={product.name} 
              price={product.price} 
              stock={product.stock} 
              image={product.image} 
              id={product.id} 
              description={product.description}
              quantity={product.quantity}
              deletable={true}
              onRemove={() => handleProducts()}
            />
          ))}
        </ul>
      ) : (
        <p>No products in the cart.</p>
      )}
      {allProducts && allProducts.length > 0 ? (<button>Checkout</button>): null}
    </div>
  );
}

export default CartPage;
