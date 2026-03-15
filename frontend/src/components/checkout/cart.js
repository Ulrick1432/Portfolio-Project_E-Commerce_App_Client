// src/components/CartPage.js
import React from 'react';
import useGetAllProductsInSessionFromDbWithQuantity from '../../hooks/getProductInSessionFromDB';
import Product from '../product/Product';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartPage = () => {
  const navigate = useNavigate();
  const { loading } = useGetAllProductsInSessionFromDbWithQuantity();
  const allProducts = useSelector(state => state.cartState.value);

  return (
    <div className="CartPage">
      <h2>This is the cart page</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : allProducts && allProducts.length > 0 ? (
        <>
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
                onRemove={() => refetch()}
              />
            ))}
          </ul>
        </>
      ) : (
        <p>No products in the cart.</p>
      )}
      {allProducts && allProducts.length > 0 ? (
        // nedenstående navigate skal ændres til fx /customer_information
        <button onClick={() => navigate('/checkout')}>Checkout</button>
      ) : null}
    </div>
  );
};

export default CartPage;


