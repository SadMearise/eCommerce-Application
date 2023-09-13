import { Button, TextField } from "@mui/material";
import styles from "./BasketPromoCodeField.module.scss";

export default function BasketPromoCodeField() {
  return (
    <div className={styles["promo-code-wrapper"]}>
      <TextField
        id="outlined-helperText"
        label="Enter your promo code"
        helperText="Добавить промокод для тестирования"
        fullWidth
      />
      <Button variant="contained">Apply promo code</Button>
    </div>
  );
}
