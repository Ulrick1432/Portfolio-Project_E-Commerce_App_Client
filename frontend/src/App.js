import Root from "./components/root";
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from "react-router-dom";


// sets up the router with JSX Route elements using createBrowserRouter() and createRoutesFromElements().
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />}>
    </Route>
  )
);

const App = () => (
  <RouterProvider router={router} />
);

export default App;