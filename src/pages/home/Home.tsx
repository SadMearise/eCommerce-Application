import { useSelector } from "react-redux";
import { Button, Card, CardActions, CardContent, CardMedia, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DiscountCode } from "@commercetools/platform-sdk";
import AlertView from "../../components/alertView/AlertView";
import Header from "../../components/header/Header";
import isSuccess from "../../store/features/registration/registrationSelector";
import Footer from "../../components/footer/Footer";
import getProductCountFromCart from "../../utils/getProductCountFromCart";
import { setCount } from "../../store/features/cartCount/cartCountSlice";
import { useAppDispatch } from "../../store/hooks";
import styles from "./Home.module.scss";
import RouterPaths from "../../router/routes";
import { getDiscount } from "../../services/cart.service";
import locale from "../../settings";

const images = ["./gift-svgrepo-com.svg", "./coupon-svgrepo-com.svg"];

export default function Home() {
  const [promoCodes, setPromoCodes] = useState<DiscountCode[]>([]);
  const dispatch = useAppDispatch();
  const isSuccessSelector = useSelector(isSuccess);

  useEffect(() => {
    const getPromoCodes = async () => {
      setPromoCodes((await getDiscount()).body.results);
    };

    getPromoCodes();
  }, []);

  useEffect(() => {
    const updateCountFromCart = async () => {
      dispatch(setCount(await getProductCountFromCart()));
    };

    updateCountFromCart();
  }, [dispatch]);

  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        className={styles.container}
      >
        <div className={styles["promo-code-wrapper"]}>
          <h1 className={styles.title}>Available promo codes:</h1>
          <div className={styles["card-wrapper"]}>
            {promoCodes.map((promoCode, index) => (
              <Card
                sx={{ maxWidth: 345 }}
                key={promoCode.id}
              >
                <CardMedia
                  sx={{ height: 140, backgroundSize: "100% 100%" }}
                  image={images[index]}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    {promoCode.name && promoCode.name[locale]}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {promoCode.description && promoCode.description[locale]}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    fullWidth
                    component={Link}
                    to={RouterPaths.Basket}
                  >
                    go to Shopping Cart
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
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
