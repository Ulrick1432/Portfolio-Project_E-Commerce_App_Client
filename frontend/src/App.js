import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from "react-router-dom";
import HomePage from "./components/homePage";
import RegistrationPage from "./components/registration/registrationPage";
import LoginPage from "./components/registration/login";
import { registrationAction } from "./components/registration/registrationPage";

// sets up the router with JSX Route elements using createBrowserRouter() and createRoutesFromElements().
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path='register' element={<RegistrationPage/>} action={registrationAction}></Route>
      <Route path='login' element={<LoginPage/>}></Route>
    </>
  )
);

const App = () => (
  <RouterProvider router={router} />
);

export default App;