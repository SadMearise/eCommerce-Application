import { Container, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Cart } from "@commercetools/platform-sdk";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import BasketPromoCodeField from "../../components/basketPromoCodeField/BasketPromoCodeField";
import BasketTotalCost from "../../components/basketTotalCost/BasketTotalCost";
import BasketProductPrice from "../../components/basketProductPrice/BasketProductPrice";
import BasketProductQuantity from "../../components/basketProductQuantity/BasketProductQuantity";
import BasketProductCard from "../../components/basketProductCard/BasketProductCard";
import BasketClearButton from "../../components/basketClearButton/BasketClearButton";
import styles from "./Basket.module.scss";
import { cartDeleteItem, deleteShoppingCart, getCarts, getShoppingCart } from "../../services/cart.service";
import BasketEmptyView from "../../components/basketEmptyVIew/BasketEmptyView";
import LoadingView from "../../components/loadingView/LoadingView";
import { useAppDispatch } from "../../store/hooks";
import { setCount } from "../../store/features/cartCount/cartCountSlice";
import getProductCountFromCart from "../../utils/getProductCountFromCart";

export default function Basket() {
  const [shoppingCart, setShoppingCart] = useState<Cart>();
  const [isLoading, setIsLoading] = useState(true);
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const handleUpdateShoppingCart = async () => {
    try {
      const fetchShoppingCart = await getShoppingCart();
      const [cart] = fetchShoppingCart.body.results;
      setShoppingCart(cart);
      dispatch(setCount(await getProductCountFromCart()));
    } catch (error) {
      throw new Error(`An error occurred while updating the shopping cart: ${error}`);
    }
  };
  const handleDeleteShoppingCartItem = async (cartId: string, version: number, itemId: string) => {
    setIsChanging(true);
    await cartDeleteItem(cartId, version, itemId);
    await handleUpdateShoppingCart();
    setIsChanging(false);
  };

  const handleClearShoppingCart = async () => {
    setIsChanging(true);
    if (shoppingCart) {
      try {
        const shoppingCarts = (await getCarts()).body.results;
        const deleteShoppingCarts = shoppingCarts.map(async (cart) => {
          await deleteShoppingCart(cart.id, cart.version);
        });
        await Promise.all(deleteShoppingCarts);
        await handleUpdateShoppingCart();
        setIsChanging(false);
      } catch (error) {
        throw new Error(`An error occurred while clearing the shopping cart: ${error}`);
      }
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchShoppingCart = await getShoppingCart();
        const [cart] = fetchShoppingCart.body.results;
        setShoppingCart(cart);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        throw new Error(`An error occurred while loading the shopping cart: ${error}`);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return <LoadingView />;
  }

  if ((shoppingCart && shoppingCart?.lineItems.length < 1) || !shoppingCart) {
    return <BasketEmptyView />;
  }
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <div className={styles["basket-wrapper"]}>
          <div className={styles["left-side"]}>
            <div className={styles["basket-items-wrapper"]}>
              <div className={styles["basket-header"]}>
                <BasketClearButton
                  isChanging={isChanging}
                  handleClearShoppingCart={handleClearShoppingCart}
                />
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
                      isChanging={isChanging}
                      setIsChanging={setIsChanging}
                      handleUpdateShoppingCart={handleUpdateShoppingCart}
                    />
                    <div className={styles["price-and-delete-button-wrapper"]}>
                      <BasketProductPrice
                        price={product.price}
                        productQuantity={product.quantity}
                      />
                      <IconButton
                        aria-label="delete"
                        sx={{ height: "max-content" }}
                        onClick={() => handleDeleteShoppingCartItem(shoppingCart.id, shoppingCart.version, product.id)}
                        disabled={isChanging}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
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
                  shoppingCartDiscountCodes={shoppingCart.discountCodes}
                  isChanging={isChanging}
                  setIsChanging={setIsChanging}
                  handleUpdateShoppingCart={handleUpdateShoppingCart}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
