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
  handleUpdateShoppingCart,
}: BasketPromoCodeFieldProps) {
  const [promoCodeField, setPromoCodeField] = useState<string>("");
  const [isSuccessfulPromo, setIsSuccessfulPromo] = useState<boolean>(false);
  const [isInfoAlert, setIsInfoAlert] = useState<boolean>(false);
  const [isPromoAlreadyApplyAlert, setIsPromoAlreadyApplyAlert] = useState<boolean>(false);

  const handleSuccessPromo = (): void => {
    setIsSuccessfulPromo(true);

    setTimeout(() => setIsSuccessfulPromo(false), 2000);
  };

  const handlePromoAlreadyApplyAlert = (): void => {
    setIsPromoAlreadyApplyAlert(true);

    setTimeout(() => setIsPromoAlreadyApplyAlert(false), 2000);
  };

  const handleInfoAlert = (): void => {
    setIsInfoAlert(true);

    setTimeout(() => setIsInfoAlert(false), 2000);
  };

  const handleAddPromoCode = async (): Promise<void> => {
    const discount = (await getDiscount()).body.results;
    const isAnyDiscountMatching = discount.some((discountItem) =>
      // eslint-disable-next-line prettier/prettier
      shoppingCartDiscountCodes.some((cartDiscountItem) => discountItem.id === cartDiscountItem.discountCode.id));

    const hasMatchingPromoCode = discount.some((item) => item.code === promoCodeField);
    if (isAnyDiscountMatching && hasMatchingPromoCode) {
      handlePromoAlreadyApplyAlert();
      return;
    }

    if (hasMatchingPromoCode) {
      cartAddDiscount(shoppingCartID, shoppingCartVersion, promoCodeField).then(() => {
        handleSuccessPromo();
        handleUpdateShoppingCart();
      });
      return;
    }
    handleInfoAlert();
  };

  return (
    <div className={styles["promo-code-wrapper"]}>
      <TextField
        id="outlined-helperText"
        label="Enter your promo code"
        helperText="Your promo code is SAVE50"
        onChange={(e) => setPromoCodeField(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        disabled={!promoCodeField}
        onClick={handleAddPromoCode}
      >
        Apply promo code
      </Button>
      {isInfoAlert && (
        <AlertView
          alertTitle="Info"
          severity="info"
          variant="filled"
          textContent="Promo code does not exist"
        />
      )}
      {isPromoAlreadyApplyAlert && (
        <AlertView
          alertTitle="Info"
          severity="info"
          variant="filled"
          textContent="Promo code already apply"
        />
      )}
      {isSuccessfulPromo && (
        <AlertView
          alertTitle="Success"
          severity="success"
          variant="filled"
          textContent="Promo code successfully applied"
        />
      )}
    </div>
  );
}
