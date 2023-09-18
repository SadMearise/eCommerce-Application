import { IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./BasketProductQuantity.module.scss";
import { MAX_PRODUCTS_IN_BASKET, MIN_PRODUCTS_IN_BASKET } from "../../utils/constants";
import { cartChangeItemQuantity } from "../../services/cart.service";
import { BasketProductQuantityProps } from "./types";

export default function BasketProductQuantity({
  product,
  shoppingCartVersion,
  cartId,
  isChanging,
  setIsChanging,
  handleUpdateShoppingCart,
}: BasketProductQuantityProps) {
  const { id, quantity } = product;

  const handleIncrementItemQuantity = () => {
    setIsChanging(true);
    cartChangeItemQuantity(cartId, shoppingCartVersion, id, quantity + 1)
      .then(() => handleUpdateShoppingCart())
      .then(() => setIsChanging(false));
  };

  const handleDecrementItemQuantity = () => {
    setIsChanging(true);
    cartChangeItemQuantity(cartId, shoppingCartVersion, id, quantity - 1)
      .then(() => handleUpdateShoppingCart())
      .then(() => setIsChanging(false));
  };
  return (
    <div className={styles["basket-item-quantity"]}>
      <IconButton
        aria-label="remove"
        onClick={handleDecrementItemQuantity}
        disabled={quantity === MIN_PRODUCTS_IN_BASKET || isChanging}
      >
        <RemoveIcon />
      </IconButton>
      <TextField
        id="standard-basic"
        value={quantity}
        variant="standard"
        sx={{ width: "50px", "& input": { textAlign: "center" } }}
        disabled={isChanging}
        onChange={(e) => {
          setIsChanging(true);
          const newValue = Number(e.target.value);
          if (!Number.isNaN(newValue)) {
            if (newValue < MIN_PRODUCTS_IN_BASKET) {
              cartChangeItemQuantity(cartId, shoppingCartVersion, id, MIN_PRODUCTS_IN_BASKET)
                .then(() => handleUpdateShoppingCart())
                .then(() => setIsChanging(false));
            } else if (newValue > MAX_PRODUCTS_IN_BASKET) {
              cartChangeItemQuantity(cartId, shoppingCartVersion, id, MAX_PRODUCTS_IN_BASKET)
                .then(() => handleUpdateShoppingCart())
                .then(() => setIsChanging(false));
            } else {
              cartChangeItemQuantity(cartId, shoppingCartVersion, id, newValue)
                .then(() => handleUpdateShoppingCart())
                .then(() => setIsChanging(false));
            }
          }
        }}
      />
      <IconButton
        aria-label="add"
        onClick={handleIncrementItemQuantity}
        disabled={quantity === MAX_PRODUCTS_IN_BASKET || isChanging}
      >
        <AddIcon />
      </IconButton>
    </div>
  );
}
