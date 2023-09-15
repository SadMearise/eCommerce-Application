import { Button, TextField } from "@mui/material";
import { useState } from "react";
import styles from "./BasketPromoCodeField.module.scss";
import { cartAddDiscount, getDiscount } from "../../services/cart.service";
import { BasketPromoCodeFieldProps } from "./types";

export default function BasketPromoCodeField({
  shoppingCartID,
  shoppingCartVersion,
  handleUpdateShoppingCart,
}: BasketPromoCodeFieldProps) {
  const [promoCodeField, setPromoCodeField] = useState("");
  const handleAddPromoCode = async () => {
    const discount = (await getDiscount()).body.results;
    if (discount.some((item) => item.code === promoCodeField)) {
      cartAddDiscount(shoppingCartID, shoppingCartVersion, promoCodeField).then(() => handleUpdateShoppingCart());
    }
  };
  return (
    <div className={styles["promo-code-wrapper"]}>
      <TextField
        id="outlined-helperText"
        label="Enter your promo code"
        helperText="Your promo code is SAVE50"
        onChange={(e) => setPromoCodeField(e.target.value)}
        color="warning"
        fullWidth
      />
      <Button
        variant="contained"
        onClick={handleAddPromoCode}
      >
        Apply promo code
      </Button>
    </div>
  );
}
