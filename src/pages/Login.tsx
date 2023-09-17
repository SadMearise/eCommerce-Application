import { Container } from "@mui/material";
import Header from "../components/header/Header";
import LoginComponent from "../components/loginComponent/LoginComponent";
import Footer from "../components/footer/Footer";

export default function Login() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <LoginComponent />
      </Container>
      <Footer />
    </>
  );
}
