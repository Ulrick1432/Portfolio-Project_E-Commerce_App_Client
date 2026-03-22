/**
 * PaymentCompletionPage Component
 * 
 * Displays the result of a Stripe payment transaction.
 * Retrieves payment intent status from URL query parameters and shows confirmation.
 * 
 * Features:
 *   - Parses Stripe redirect URL parameters
 *   - Verifies payment status via Stripe API
 *   - Displays success/failure message to user
 *   - Shows products from the completed order
 *   - Redirects failed payments back to cart
 * 
 * @module components/PaymentCompletionPage
 */

import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Product from "../product/Product";

/**
 * PaymentCompletionPage component - handles post-payment flow.
 * Displays payment result and order summary after Stripe redirect.
 * 
 * @returns {JSX.Element} Rendered payment completion page
 */
const PaymentCompletionPage = () => {
  const stripe = useStripe();
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  // Gets cart products from Redux store to display in order summary
  const allProducts = useSelector((state) => state.cartState.value);

  /**
   * Checks payment status when component mounts or URL changes.
   * Parses Stripe redirect parameters and retrieves payment intent.
   * Redirects failed payments back to cart.
   */
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const redirectStatus = query.get("redirect_status");
    
    // Redirect to cart if payment did not succeed
    if (redirectStatus !== "succeeded") {
      navigate('/cart');
    }
    
    const paymentIntentClientSecret = query.get("payment_intent_client_secret");

    if (!stripe || !paymentIntentClientSecret) {
      return;
    }

    // Retrieve payment intent from Stripe and set appropriate message
    stripe.retrievePaymentIntent(paymentIntentClientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          // TODO: Call createOrder(paymentIntent.id) to create order in database
          // TODO: Clear/delete cart after successful payment
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe, location.search]);

  return (
    <div className="PaymentCompletionPage-container">
      <h1>Payment Completion</h1>
      <p>{message}</p>
      <p>Show products from new order</p>
      <div>
        <ul>
          {allProducts && allProducts.map((product) => (
            <Product
              key={product.id}
              name={product.name}
              price={product.price}
              stock={product.stock}
              description={product.description}
              quantity={product.quantity}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PaymentCompletionPage;
