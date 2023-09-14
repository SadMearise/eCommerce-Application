import { Container } from "@mui/material";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function Basket() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <h1>Basket</h1>
      </Container>
      <Footer />
    </>
  );
}
