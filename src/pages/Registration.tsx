import { Container } from "@mui/material";
import RegistrationForm from "../components/registrationForm/RegistrationForm";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function Registration() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <RegistrationForm />
      </Container>
      <Footer />
    </>
  );
}
