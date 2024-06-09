// Used to display the list of products with the use of the "Product" component
// The products listing page will be the place for users to browse through the products available for sale. 
// Each product should display a name, description, and image.
import { useEffect, useState } from "react";
import Product from "./Product";
import { getAllProducts } from "../../api/product";

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);


  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await getAllProducts();
        setAllProducts(response);
      } catch(err) {
        console.error('Error getting response from getAllProducts API: ', err);
      }
    };
    getProducts();
  }, []);


  return (
    <div>
      <h2>List of products</h2>
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
          />
        ))}
      </ul>
    </div>
  );
}

export default ProductList;