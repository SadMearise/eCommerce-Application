import { useNavigate } from "react-router-dom";
import Logout from "../components/logout/Logout";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Logout />
      <button
        type="button"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </button>
      <h1>Home</h1>
    </>
  );
}
