import { Button, TextField } from "@mui/material";
import { useState } from "react";
import styles from "./BasketPromoCodeField.module.scss";
import { cartAddDiscount, getDiscount } from "../../services/cart.service";
import { BasketPromoCodeFieldProps } from "./types";
import AlertView from "../alertView/AlertView";

export default function BasketPromoCodeField({
  shoppingCartID,
  shoppingCartVersion,
  shoppingCartDiscountCodes,
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
      const discount = (await getDiscount()).body.results;
      const isPromoCodeAlreadyApplied = shoppingCartDiscountCodes.some(
        (cartDiscountItem) =>
          discount.some((item) => item.code === promoCodeField && item.id === cartDiscountItem.discountCode.id)
        // eslint-disable-next-line function-paren-newline
      );
      if (isPromoCodeAlreadyApplied) {
        handleShowAlert("already-applied");
        setIsChanging(false);
        return;
      }

      const hasMatchingPromoCode = discount.some((item) => item.code === promoCodeField);
      if (hasMatchingPromoCode) {
        cartAddDiscount(shoppingCartID, shoppingCartVersion, promoCodeField).then(() => {
          handleShowAlert("success");
          handleUpdateShoppingCart();
        });
        setIsChanging(false);
        return;
      }
      handleShowAlert("info");
      setIsChanging(false);
    } catch (error) {
      throw new Error(`An error occurred while getting the discount codes: ${error}`);
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
