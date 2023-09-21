import { IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "./BasketProductQuantity.module.scss";
import { MAX_PRODUCTS_IN_BASKET, MIN_PRODUCTS_IN_BASKET } from "../../utils/constants";
import { addProductToCart, cartChangeItemQuantity, createCart, getShoppingCart } from "../../services/cart.service";
import { BasketProductQuantityProps } from "./types";

export default function BasketProductQuantity({
  product,
  cartId,
  isChanging,
  setIsChanging,
  handleUpdateShoppingCart,
}: BasketProductQuantityProps) {
  const { id, quantity, productId } = product;

  const handleIncrementItemQuantity = async () => {
    setIsChanging(true);

    try {
      const fetchShoppingCart = await getShoppingCart();
      const [cart] = fetchShoppingCart.body.results;
      if (!cart) {
        await createCart();
        const getNewCart = (await getShoppingCart()).body.results[0];
        await addProductToCart(getNewCart.id, getNewCart.version, productId, quantity + 1);
        await handleUpdateShoppingCart();
        return;
      }
      const hasItemInCart = cart.lineItems.some((item) => item.id === id);
      if (!hasItemInCart) {
        await addProductToCart(cartId, cart.version, productId, quantity + 1);
      } else {
        await cartChangeItemQuantity(cartId, cart.version, id, quantity + 1);
      }

      await handleUpdateShoppingCart();
    } catch (error) {
      console.error(`An error occurred:, ${error}`);
    } finally {
      setIsChanging(false);
    }
  };

  const handleDecrementItemQuantity = async () => {
    setIsChanging(true);

    try {
      const fetchShoppingCart = await getShoppingCart();
      const [cart] = fetchShoppingCart.body.results;
      if (!cart) {
        await createCart();
        const getNewCart = (await getShoppingCart()).body.results[0];
        await addProductToCart(getNewCart.id, getNewCart.version, productId, quantity - 1);
        await handleUpdateShoppingCart();
        return;
      }
      const hasItemInCart = cart.lineItems.some((item) => item.id === id);

      if (!hasItemInCart) {
        await addProductToCart(cartId, cart.version, productId, quantity - 1);
      } else {
        await cartChangeItemQuantity(cartId, cart.version, id, quantity - 1);
      }
    } catch (error) {
      console.error(`An error occurred:, ${error}`);
    } finally {
      await handleUpdateShoppingCart();
      setIsChanging(false);
    }
  };

  const handleChangeValue = async (newValue: number) => {
    setIsChanging(true);
    try {
      let quantityToSet;

      if (newValue < MIN_PRODUCTS_IN_BASKET) {
        quantityToSet = MIN_PRODUCTS_IN_BASKET;
      } else if (newValue > MAX_PRODUCTS_IN_BASKET) {
        quantityToSet = MAX_PRODUCTS_IN_BASKET;
      } else {
        quantityToSet = newValue;
      }
      const fetchShoppingCart = await getShoppingCart();
      const [cart] = fetchShoppingCart.body.results;
      if (!cart) {
        await createCart();
        const getNewCart = (await getShoppingCart()).body.results[0];
        await addProductToCart(getNewCart.id, getNewCart.version, productId, quantityToSet);
        await handleUpdateShoppingCart();
        return;
      }
      const hasItemInCart = cart.lineItems.some((item) => item.id === id);
      if (!hasItemInCart) {
        await addProductToCart(cartId, cart.version, productId, quantityToSet);
      } else {
        await cartChangeItemQuantity(cartId, cart.version, id, quantityToSet);
      }
    } catch (error) {
      console.error(`An error occurred: ${error}`);
    } finally {
      await handleUpdateShoppingCart();
      setIsChanging(false);
    }
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
          const newValue = Number(e.target.value);
          if (!Number.isNaN(newValue)) {
            handleChangeValue(newValue);
            handleChangeValue(newValue);
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
