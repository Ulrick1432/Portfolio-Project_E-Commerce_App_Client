import React from "react";
import Header from "./Header";
import ProductList from "./product/ProductList ";

const HomePage = () => {

  return (
    <div className="HomePage">
      <Header/>
      <ProductList/>
    </div>
  );
}

export default HomePage;
