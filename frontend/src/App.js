import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from "react-router-dom";
import HomePage from "./components/HomePage";
import RegistrationPage from "./components/authentication/RegistrationPage";
import LoginPage from "./components/authentication/Login";
import { registrationAction } from "./components/authentication/RegistrationPage";
import { loginAction } from "./components/authentication/Login";

const App = () => {

  // sets up the router with JSX Route elements using createBrowserRouter() and createRoutesFromElements().
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path='/register' element={<RegistrationPage/>} action={registrationAction}></Route>
      <Route path='/login' element={<LoginPage/>} action={loginAction}></Route>
    </>
  )
);

  return (
  <RouterProvider router={router}  />
  )
};

export default App;