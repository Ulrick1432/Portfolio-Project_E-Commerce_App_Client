import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from "react-router-dom";
import HomePage from "./components/HomePage";
import RegistrationPage from "./components/authentication/RegistrationPage";
import LoginPage from "./components/authentication/Login";
import { registrationAction } from "./components/authentication/RegistrationPage";
import { loginAction } from "./components/authentication/Login";
import ProductPage from "./components/product/ProductPage";
import Layout from "./components/Layout";
import CartPage from "./components/cart";

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

const App = () => {

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
        </Route>
      </>
    )
  );

  // Options used for stripe
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}', // Replace with your actual client secret or pass it as a prop
  };

  return (
    <Elements stripe={stripePromise} options={options} >
      <RouterProvider router={router}  />
    </Elements>
  )
};

export default App;