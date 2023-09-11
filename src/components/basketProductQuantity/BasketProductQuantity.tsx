import { IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import styles from "./BasketProductQuantity.module.scss";
import { MAX_PRODUCTS_IN_BASKET, MIN_PRODUCTS_IN_BASKET } from "../../utils/constants";

export default function BasketProductQuantity() {
  const [itemQuantity, setItemQuantity] = useState<number>(1);
  const handleIncrementItemQuantity = () => setItemQuantity((prev) => prev + 1);
  const handleDecrementItemQuantity = () => setItemQuantity((prev) => prev - 1);

  return (
    <div className={styles["basket-item-quantity"]}>
      <IconButton
        aria-label="remove"
        onClick={handleDecrementItemQuantity}
        disabled={itemQuantity === MIN_PRODUCTS_IN_BASKET}
      >
        <RemoveIcon />
      </IconButton>
      <TextField
        id="standard-basic"
        value={itemQuantity}
        variant="standard"
        sx={{ width: "50px", "& input": { textAlign: "center" } }}
        onChange={(e) => {
          const newValue = Number(e.target.value);

          if (!Number.isNaN(newValue)) {
            if (newValue < MIN_PRODUCTS_IN_BASKET) {
              setItemQuantity(MIN_PRODUCTS_IN_BASKET);
            } else if (newValue > MAX_PRODUCTS_IN_BASKET) {
              setItemQuantity(MAX_PRODUCTS_IN_BASKET);
            } else {
              setItemQuantity(newValue);
            }
          }
        }}
      />
      <IconButton
        aria-label="add"
        onClick={handleIncrementItemQuantity}
        disabled={itemQuantity === MAX_PRODUCTS_IN_BASKET}
      >
        <AddIcon />
      </IconButton>
    </div>
  );
}
