/**
 * HomePage Component
 * 
 * Main landing page of the e-commerce application.
 * Serves as the product browsing hub where users can see all available products.
 * 
 * Features:
 *   - Displays the ProductList component with all products
 *   - Wraps content in styled container
 * 
 * @module components/HomePage
 */

import ProductList from "../product/ProductList";
import './homePage.css';

/**
 * HomePage Component
 * Renders the main page with product catalog.
 * 
 * @returns {JSX.Element} Rendered homepage with product list
 */
const HomePage = () => {
  return (
    <div className="homePage">
      <ProductList/>
    </div>
  );
};

export default HomePage;
