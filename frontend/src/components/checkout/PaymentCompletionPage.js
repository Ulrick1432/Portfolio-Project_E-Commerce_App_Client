// PaymentCompletionPage.js
import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import Product from "../product/Product";
//import "./PaymentCompletionPage.css";

const PaymentCompletionPage = () => {
  const stripe = useStripe();
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    console.log('This is the query for PaymentCompletionPage: → ', query);
    const redirectStatus = query.get("redirect_status");
    if (redirectStatus !== "succeeded") {
      navigate('/cart')
    }
    const paymentIntentClientSecret = query.get("payment_intent_client_secret");

    if (!stripe || !paymentIntentClientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(paymentIntentClientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          //createOrder(paymentIntent.id);  // Call function to create order
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
    </div>
  );
};

export default PaymentCompletionPage;
