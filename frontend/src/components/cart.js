import { useEffect, useState } from "react";
import { getAllProductsInSessionFromDB } from "../api/cart";
import Product from "./product/Product";

  {/*
    Check om Cart er gemt i session.
    {Ja: data ser således ud [itemID, itemID...] der kan være flere af samme id. 
      Derfor er der behov for en metode til en array som returner antal af samme id og
      returner en array, men id der findes en gang i array'en. 

      // Your initial array
      let numbers = [1, 2, 2, 3, 4, 4, 4, 5];

      // Create an object to count occurrences of each number
      let countMap = numbers.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
      }, {});

      console.log(countMap); // { '1': 1, '2': 2, '3': 1, '4': 3, '5': 1 }

      // Get an array of unique numbers
      let uniqueNumbers = Object.keys(countMap).map(Number);

      console.log(uniqueNumbers); // [1, 2, 3, 4, 5]

    } 

    Check om cart er gemt i i DB. (se models/cart.js)
*/}
const CartPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await getAllProductsInSessionFromDB();
        setAllProducts(response);
      } catch (err) {
        console.error('Error getting response from getAllProductsInSessionFromDB API: ', err);
      } finally {
        setLoading(false); // Set loading to false after the API call completes
      }
    };
    getAllProducts();
  }, []);

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
              name={product.Name} 
              price={product.Price} 
              stock={product.Stock} 
              image={product.Image} 
              id={product.id} 
              description={product.Description}
            />
          ))}
        </ul>
      ) : (
        <p>No products in the cart.</p>
      )}
    </div>
  );
}

export default CartPage;
