import { RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import router from "./router/router";

export default function App() {
  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
}
