import { Button, TextField } from "@mui/material";
import { useState } from "react";
import styles from "./BasketPromoCodeField.module.scss";
import { cartAddDiscount, getDiscount, getShoppingCart } from "../../services/cart.service";
import { BasketPromoCodeFieldProps } from "./types";
import AlertView from "../alertView/AlertView";

export default function BasketPromoCodeField({
  shoppingCartID,
  isChanging,
  setIsChanging,
  handleUpdateShoppingCart,
}: BasketPromoCodeFieldProps) {
  const [promoCodeField, setPromoCodeField] = useState<string>("");
  const [alertType, setAlertType] = useState("");

  const handleShowAlert = (type: "info" | "success" | "already-applied"): void => {
    setAlertType(type);

    setTimeout(() => setAlertType(""), 2000);
  };
  const handleAddPromoCode = async (): Promise<void> => {
    try {
      setIsChanging(true);
      const fetchShoppingCart = await getShoppingCart();
      const [cart] = fetchShoppingCart.body.results;
      if (!cart) {
        handleUpdateShoppingCart();
        return;
      }

      const discount = (await getDiscount()).body.results;

      const isPromoCodeAlreadyApplied = cart.discountCodes.some(
        (cartDiscountItem) =>
          discount.some((item) => item.code === promoCodeField && item.id === cartDiscountItem.discountCode.id)
        // eslint-disable-next-line function-paren-newline
      );
      if (isPromoCodeAlreadyApplied) {
        handleShowAlert("already-applied");
        handleUpdateShoppingCart();
        return;
      }

      const hasMatchingPromoCode = discount.some((item) => item.code === promoCodeField);
      if (hasMatchingPromoCode) {
        cartAddDiscount(shoppingCartID, cart.version, promoCodeField).then(() => {
          handleShowAlert("success");
          handleUpdateShoppingCart();
        });
        return;
      }
      handleShowAlert("info");
    } catch (error) {
      console.error(`An error occurred while getting the discount codes: ${error}`);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className={styles["promo-code-wrapper"]}>
      <TextField
        id="outlined-helperText"
        label="Enter your promo code"
        onChange={(e) => setPromoCodeField(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        disabled={!promoCodeField || isChanging}
        onClick={handleAddPromoCode}
      >
        Apply promo code
      </Button>
      {alertType === "info" && (
        <AlertView
          alertTitle="Info"
          severity="info"
          variant="filled"
          textContent="Promo code does not exist"
        />
      )}
      {alertType === "success" && (
        <AlertView
          alertTitle="Success"
          severity="success"
          variant="filled"
          textContent="Promo code successfully applied"
        />
      )}
      {alertType === "already-applied" && (
        <AlertView
          alertTitle="Info"
          severity="info"
          variant="filled"
          textContent="Promo code already apply"
        />
      )}
    </div>
  );
}
