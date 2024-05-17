import HomePage from "./components/homePage";
import RegistrationPage from "./components/registration/registrationPage";
import CreateAccount from "./components/registration/createAccount";
import { createBrowserRouter, Routes, Route, RouterProvider, createRoutesFromElements } from "react-router-dom";


// sets up the router with JSX Route elements using createBrowserRouter() and createRoutesFromElements().
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path='registration' element={<RegistrationPage/>}></Route>
      <Route path='create_account' element={<CreateAccount/>}></Route>
    </>
  )
);

const App = () => (
  <RouterProvider router={router} />
);

export default App;