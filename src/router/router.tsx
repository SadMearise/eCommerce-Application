import { createBrowserRouter, redirect } from "react-router-dom";
import Page404 from "../pages/404/404";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Basket from "../pages/basket/Basket";
import Catalog from "../pages/catalog/Catalog";
import Product from "../pages/product/Product";
import Profile from "../pages/Profile";
import RouterPaths from "./routes";
import isLogin from "../utils/isLogin";

const router = createBrowserRouter(
  [
    {
      path: RouterPaths.Page404,
      element: <Page404 />,
    },
    {
      path: RouterPaths.Home,
      element: <Home />,
    },
    {
      path: RouterPaths.About,
      element: <About />,
    },
    {
      path: RouterPaths.Basket,
      element: <Basket />,
    },
    {
      path: RouterPaths.Catalog,
      element: <Catalog />,
    },
    {
      path: RouterPaths.Product,
      element: <Product />,
    },
    {
      path: RouterPaths.Profile,
      element: <Profile />,
      loader: async () => {
        if (!isLogin()) {
          return redirect(RouterPaths.Login);
        }
        return null;
      },
    },
    {
      path: RouterPaths.Registration,
      element: <Registration />,
    },
    {
      path: RouterPaths.Login,
      element: <Login />,
      loader: async () => {
        if (isLogin()) {
          return redirect(RouterPaths.Home);
        }
        return null;
      },
    },
  ],
  { basename: import.meta.env.DEV ? "/" : "/eCommerce-Application/" }
);

export default router;
