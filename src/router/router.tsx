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
import RouterPaths from "./routes";

const router = createBrowserRouter([
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
  },
  {
    path: RouterPaths.Registration,
    element: <Registration />,
  },
  {
    path: RouterPaths.Login,
    element: <Login />,
    loader: async () => {
      if (tokenCache.hasValidToken()) {
        return redirect(RouterPaths.Home);
      }
      return null;
    },
  },
]);

export default router;
