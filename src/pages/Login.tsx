import { useSelector } from "react-redux";
import { selectUser } from "../store/features/userSlice";
import Logout from "../components/logout/Logout";
import LoginComponent from "../components/loginComponent/LoginComponent";

function Login() {
  const user = useSelector(selectUser);
  return (
    <>
      <h1>Login</h1>
      <div>{user ? <Logout /> : <LoginComponent />}</div>
    </>
  );
}

export default Login;
