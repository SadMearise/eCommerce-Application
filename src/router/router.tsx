import { createBrowserRouter, redirect } from "react-router-dom";
import Page404 from "../pages/404";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Home from "../pages/Home";
import About from "../pages/About";
import Basket from "../pages/Basket";
import Catalog from "../pages/Catalog";
import Product from "../pages/Product";
import Profile from "../pages/Profile";
import tokenCache from "../services/TokenCash";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Page404 />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/basket",
    element: <Basket />,
  },
  {
    path: "/catalog",
    element: <Catalog />,
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
    loader: async () => {
      if (tokenCache.hasValidToken()) {
        return redirect("/");
      }
      return null;
    },
  },
]);

export default router;
