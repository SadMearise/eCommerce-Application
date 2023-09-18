import { useSelector } from "react-redux";
import { Button, Card, CardActions, CardContent, CardMedia, Container, Typography } from "@mui/material";
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
          <div className={styles["card-wrapper"]}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140, backgroundSize: "100% 100%" }}
                image="gift-svgrepo-com.svg"
                title="green iguana"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  SAVE50
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Enter the promotional code in the cart to receive a 50% discount
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  fullWidth
                >
                  go to Shopping Cart
                </Button>
              </CardActions>
            </Card>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140, backgroundSize: "100% 100%" }}
                image="coupon-svgrepo-com.svg"
                title="green iguana"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  SAVE30
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Enter the promotional code in the cart to receive a 30% discount
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  fullWidth
                >
                  go to Shopping Cart
                </Button>
              </CardActions>
            </Card>
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
