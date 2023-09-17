import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./BasketEmptyView.module.scss";
import RouterPaths from "../../router/routes";
import Header from "../header/Header";
import Footer from "../footer/Footer";

export default function BasketEmptyView() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <div className={styles["empty-cart-wrapper"]}>
          <h2 className={styles["empty-cart-title"]}>Your Cart Is Currently Empty!</h2>
          <img
            src="shopping-cart.png"
            alt="shopping-cart"
            className={styles["empty-cart-img"]}
          />
          <div className={styles["empty-cart-description"]}>
            <p>Before proceed checkout you must add some products to your shopping cart.</p>
            <p>You will find a lot of interesting products on our &quot;Catalog&quot; page</p>
          </div>
          <Button
            component={Link}
            to={RouterPaths.Catalog}
          >
            Return to Catalog
          </Button>
        </div>
      </Container>
      <Footer />
    </>
  );
}
