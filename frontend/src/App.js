import './app.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from "react-router-dom";
import HomePage from "./components/homePage/HomePage";
import RegistrationPage from "./components/authentication/RegistrationPage";
import LoginPage from "./components/authentication/Login";
import { registrationAction } from "./components/authentication/RegistrationPage";
import { loginAction } from "./components/authentication/Login";
import ProductPage from "./components/product/ProductPage";
import Layout from "./components/Layout";
import CartPage from "./components/checkout/cart";
import CheckoutForm from './components/checkout/CheckoutForm';
import { useEffect, useState } from 'react';
import { createPaymentIntent } from './api/checkout';
import PaymentCompletionPage from './components/checkout/PaymentCompletionPage';
import Orders from './components/orders/Orders';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const App = () => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect( () => {
    const fetchPaymentIntent  = async () => {
      try {
        if (clientSecret === '') {
          const paymentIntent = await createPaymentIntent();
          setClientSecret(paymentIntent);
        }
        return;
      } catch(err) {
        console.error('Failed to fetch payment intent: ', err);
      }
    };
    fetchPaymentIntent();
  }, []);

  // sets up the router with JSX Route elements using createBrowserRouter() and createRoutesFromElements().
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<Layout/>}>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path='/register' element={<RegistrationPage/>} action={registrationAction}></Route>
          <Route path='/login' element={<LoginPage/>} action={loginAction}></Route>
          <Route path='/product/:id' element={<ProductPage/>}></Route>
          <Route path='/cart' element={<CartPage/>}></Route>
          <Route path='/checkout' element={<CheckoutForm/>}></Route>
          <Route path='/payment_completion' element={<PaymentCompletionPage/>}></Route>
          <Route path='/orders' element={<Orders/>}></Route>
        </Route>
      </>
    )
  );

  // Options used for stripe
  const options = {
    // passing the client secret obtained from the server
    clientSecret,
  };

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <Elements stripe={stripePromise} options={options} key={clientSecret}>
      <RouterProvider router={router}  />
    </Elements>
  );
};

export default App;