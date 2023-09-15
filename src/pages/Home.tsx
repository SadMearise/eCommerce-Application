import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import AlertView from "../components/alertView/AlertView";
import Header from "../components/header/Header";
import isSuccess from "../store/features/registration/registrationSelector";
import Footer from "../components/footer/Footer";
import getProductCountFromCart from "../utils/getProductCountFromCart";
import { setCount } from "../store/features/cartCount/cartCountSlice";
import { useAppDispatch } from "../store/hooks";

export default function Home() {
  const dispatch = useAppDispatch();
  const isSuccessSelector = useSelector(isSuccess);

  const updateCountFromCart = async () => {
    dispatch(setCount(await getProductCountFromCart()));
  };

  updateCountFromCart();

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <h1>Home</h1>
      </Container>
      {isSuccessSelector && (
        <AlertView
          alertTitle="Success"
          severity="success"
          variant="outlined"
          textContent="Registration successful! You're now logged in!"
        />
      )}
      <Footer />
    </>
  );
}
