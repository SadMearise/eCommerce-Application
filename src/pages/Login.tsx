import { Container } from "@mui/material";
import Header from "../components/header/Header";
import LoginComponent from "../components/loginComponent/LoginComponent";

export default function Login() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <LoginComponent />
      </Container>
    </>
  );
}
