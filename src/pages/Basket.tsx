import { Container } from "@mui/material";
import Header from "../components/header/Header";
import BasketComponent from "../components/basketComponent/BasketComponent";

export default function Basket() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <BasketComponent />
      </Container>
    </>
  );
}
