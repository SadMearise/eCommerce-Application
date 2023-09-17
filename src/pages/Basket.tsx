import { Container } from "@mui/material";
import Header from "../components/header/Header";
import BasketComponent from "../components/basketComponent/BasketComponent";
import Footer from "../components/footer/Footer";

export default function Basket() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <BasketComponent />
      </Container>
      <Footer />
    </>
  );
}
