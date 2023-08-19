/* eslint-disable react/jsx-boolean-value */
/* eslint-disable import/no-extraneous-dependencies */
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import tokenCache from "../services/TokenCash";
import { logout } from "../store/features/userSlice";
import RouterPaths from "../router/routes";
import AlertView from "../components/alertView/AlertView";
import { RootState } from "../models/types";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSuccess = useSelector((state: RootState) => state.registration.isSuccess);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          navigate(RouterPaths.Login);
        }}
      >
        Login
      </button>
      <button
        type="button"
        onClick={() => {
          tokenCache.set({ token: "", expirationTime: 0 });
          dispatch(logout());
        }}
      >
        Logout
      </button>
      <h1>Home</h1>
      <Button
        component={Link}
        to={RouterPaths.Registration}
      >
        to Registration
      </Button>
      {isSuccess && <AlertView />}
    </>
  );
}
