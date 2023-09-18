import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import { useEffect } from "react";
import AlertView from "../../components/alertView/AlertView";
import Header from "../../components/header/Header";
import isSuccess from "../../store/features/registration/registrationSelector";
import Footer from "../../components/footer/Footer";
import getProductCountFromCart from "../../utils/getProductCountFromCart";
import { setCount } from "../../store/features/cartCount/cartCountSlice";
import { useAppDispatch } from "../../store/hooks";
import styles from "./Home.module.scss";

export default function Home() {
  const dispatch = useAppDispatch();
  const isSuccessSelector = useSelector(isSuccess);

  useEffect(() => {
    const updateCountFromCart = async () => {
      dispatch(setCount(await getProductCountFromCart()));
    };

    updateCountFromCart();
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <div className={styles["promo-code-wrapper"]}>
          <h1>Available promo codes:</h1>
          <p className={styles["promo-code"]}>
            &quot;SAVE50&quot;: enter the promotional code in the cart to receive a 50% discount
          </p>
          <p className={styles["promo-code"]}>
            &quot;SAVE30&quot;: enter the promotional code in the cart to receive a 30% discount
          </p>
        </div>
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
