import { useEffect, useState } from "react";
import { Cart } from "@commercetools/platform-sdk";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./BasketComponent.module.scss";
import BasketProductCard from "../basketProductCard/BasketProductCard";
import BasketProductQuantity from "../basketProductQuantity/BasketProductQuantity";
import BasketProductPrice from "../basketProductPrice/BasketProductPrice";
import BasketTotalCost from "../basketTotalCost/BasketTotalCost";
import BasketPromoCodeField from "../basketPromoCodeField/BasketPromoCodeField";
import { cartDeleteItem, deleteShoppingCart, getShoppingCart } from "../../services/cart.service";
import BasketEmptyView from "../basketEmptyVIew/BasketEmptyView";
import BasketClearButton from "../basketClearButton/BasketClearButton";

export default function BasketComponent() {
  const [shoppingCart, setShoppingCart] = useState<Cart>();
  const [isLoading, setIsLoading] = useState(true);

  const handleUpdateShoppingCart = async () => {
    const fetchShoppingCart = await getShoppingCart();
    const [cart] = fetchShoppingCart.body.results;
    setShoppingCart(cart);
  };

  const handleDeleteShoppingCartItem = (cartId: string, version: number, itemId: string) => {
    cartDeleteItem(cartId, version, itemId).then(() => handleUpdateShoppingCart());
  };

  const handleClearShoppingCart = async () => {
    if (shoppingCart) {
      await deleteShoppingCart(shoppingCart.id, shoppingCart.version);
      handleUpdateShoppingCart();
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchShoppingCart = await getShoppingCart();
        const [cart] = fetchShoppingCart.body.results;
        setShoppingCart(cart);
        console.log(cart);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        throw new Error(`${e}`);
      }
    };

    loadProducts();
  }, []);
  if (isLoading) {
    return <h1>loading</h1>;
  }

  if ((shoppingCart && shoppingCart?.lineItems.length < 1) || !shoppingCart) {
    return <BasketEmptyView />;
  }

  return (
    <div className={styles["basket-wrapper"]}>
      <div className={styles["left-side"]}>
        <div className={styles["basket-items-wrapper"]}>
          <div className={styles["basket-header"]}>
            <BasketClearButton handleClearShoppingCart={handleClearShoppingCart} />
          </div>
          {shoppingCart &&
            shoppingCart.lineItems.map((product) => (
              <div
                key={product.id}
                className={styles["basket-item-wrapper"]}
              >
                <BasketProductCard product={product} />
                <BasketProductQuantity
                  product={product}
                  shoppingCartVersion={shoppingCart.version}
                  cartId={shoppingCart?.id}
                  handleUpdateShoppingCart={handleUpdateShoppingCart}
                />
                <BasketProductPrice
                  price={product.price}
                  productQuantity={product.quantity}
                />
                <IconButton
                  aria-label="delete"
                  sx={{ height: "max-content" }}
                  onClick={() => handleDeleteShoppingCartItem(shoppingCart.id, shoppingCart.version, product.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
        </div>
      </div>
      <div className={styles["right-side"]}>
        <div className={styles["sticky-container"]}>
          <div className={styles["subtotal-promo-code"]}>
            {shoppingCart && (
              <BasketTotalCost
                discountCodes={shoppingCart.discountCodes}
                basketItems={shoppingCart.lineItems}
                totalPrice={shoppingCart.totalPrice}
              />
            )}
            <BasketPromoCodeField
              shoppingCartID={shoppingCart.id}
              shoppingCartVersion={shoppingCart.version}
              handleUpdateShoppingCart={handleUpdateShoppingCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
