import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import tokenCache from "../services/TokenCash";
import { logout } from "../store/features/userSlice";
import RouterPaths from "../router/routes";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    </>
  );
}
