import { Alert, AlertTitle, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductProjection } from "@commercetools/platform-sdk/";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/header/Header";
import ProductSlider from "../../components/productSlider/ProductSlider";
import styles from "./Product.module.scss";
import locale from "../../settings";
import { getProductByKey } from "../../services/product.service";
import ProductSizes from "../../components/productSizes/ProductSizes";
import ProductPrices from "../../components/productPrices/ProductPrices";
import Footer from "../../components/footer/Footer";
import { addProductToCart, cartDeleteItem, createCart, getCarts } from "../../services/cart.service";
import { setCount } from "../../store/features/cartCount/cartCountSlice";
import AlertView from "../../components/alertView/AlertView";
import { useAppDispatch } from "../../store/hooks";
import updateActiveTimeoutWithDelay from "../../utils/updateActiveTimeoutWithDelay";
import getProductCountFromCart from "../../utils/getProductCountFromCart";
import isProductInCart from "../../utils/isProductInCart";

function Product() {
  const params = useParams();
  const [product, setProduct] = useState<ProductProjection>();
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAddBtnDisabled, setIsAddBtnDisabled] = useState(false);
  const [isRemoveBtnDisabled, setIsRemoveBtnDisabled] = useState(true);
  const [isBtnLoading, setBtnLoading] = useState(false);
  const [isChangingSuccessful, setIsChangingSuccessful] = useState(false);
  const [isActiveTimeout, setIsActiveTimeout] = useState(false);
  const dispatch = useAppDispatch();

  const handleSuccessAlert = () => {
    setIsChangingSuccessful(true);

    setTimeout(() => setIsChangingSuccessful(false), 2000);
  };

  const handleRemoveFromCart = async () => {
    try {
      setIsRemoveBtnDisabled(true);
      const activeCart = (await getCarts()).body.results;
      const currentCart = activeCart[0];

      let productId = "";
      if (activeCart && product) {
        for (let i = 0; i < currentCart.lineItems.length; i += 1) {
          if (currentCart.lineItems[i].productId === product.id) {
            productId = currentCart.lineItems[i].id;
            break;
          }
        }

        const isProductInCartRes = isProductInCart(currentCart, product.id);

        if (isProductInCartRes) {
          await cartDeleteItem(currentCart.id, currentCart.version, productId);
        }
        dispatch(setCount(await getProductCountFromCart()));
        handleSuccessAlert();
        setIsAddBtnDisabled(false);
      }
    } catch (e) {
      setIsRemoveBtnDisabled(false);
      setActionError(`Can't remove product from cart. ${e}`);

      updateActiveTimeoutWithDelay(isActiveTimeout, setActionError, setIsActiveTimeout, 2000);
    }
  };

  const handleAddToCart = async () => {
    setIsAddBtnDisabled(true);
    setBtnLoading(true);
    const getCart = (await getCarts()).body.results;
    let activeCart = getCart[0];

    if (getCart.length < 1) {
      activeCart = await createCart();
    }

    if (product) {
      const isProductInCartRes = isProductInCart(activeCart, product.id);

      if (!isProductInCartRes) {
        await addProductToCart(activeCart.id, activeCart.version, product.id);
      } else {
        setActionError("Already exists in the cart.");
        updateActiveTimeoutWithDelay(isActiveTimeout, setActionError, setIsActiveTimeout, 2000);
      }

      dispatch(setCount(await getProductCountFromCart()));
    }
    setBtnLoading(false);
    setIsAddBtnDisabled(true);
    setIsRemoveBtnDisabled(false);
  };

  useEffect(() => {
    const loadProductAndType = async () => {
      try {
        const keyValue = params.productId ?? "";
        setIsLoading(true);

        const prod = await getProductByKey(keyValue);
        setProduct(prod);
      } catch (e) {
        setError(`Can't load product. ${e}`);
      }
    };

    loadProductAndType();
  }, [params.productId]);

  useEffect(() => {
    const checkCart = async () => {
      if (!product) {
        return;
      }

      const cart = (await getCarts()).body.results;
      const currentCart = cart[0];

      if (currentCart) {
        const isProductInCartRes = isProductInCart(currentCart, product.id);
        setIsAddBtnDisabled(isProductInCartRes);
        setIsRemoveBtnDisabled(!isProductInCartRes);
      }

      setIsLoading(false);
    };

    checkCart();
  }, [product]);

  if (error) {
    return (
      <>
        <Header />
        <Container maxWidth="lg">
          <Alert
            severity="error"
            className={styles["error-message"]}
          >
            <AlertTitle>Oops!</AlertTitle>
            {error}
          </Alert>
        </Container>
        <Footer />
      </>
    );
  }

  if (isLoading || !product) {
    return (
      <>
        <Header />
        <Container maxWidth="lg">
          <div className={styles.progress}>
            <CircularProgress />
          </div>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <div className={styles.body}>
          <ProductSlider images={product?.masterVariant?.images ?? []} />
          <div className={styles.info}>
            <h1 className={styles.title}>{product?.name[locale]}</h1>
            <ProductPrices product={product} />
            <p>{product?.description ? product?.description[locale] : "No description"}</p>
            <ProductSizes product={product} />
            <Button
              className={styles.btn}
              disabled={isAddBtnDisabled}
              variant="outlined"
              onClick={handleAddToCart}
            >
              {isBtnLoading ? <CircularProgress className={styles["circular-progress"]} /> : "Add to cart"}
            </Button>
            {!isRemoveBtnDisabled && (
              <IconButton
                aria-label="delete"
                onClick={handleRemoveFromCart}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        </div>
        {isChangingSuccessful && (
          <div className={styles.alert}>
            <AlertView
              alertTitle="Success"
              severity="success"
              variant="filled"
              textContent="Changes were successful"
            />
          </div>
        )}
        {actionError && (
          <div className={styles.alert}>
            <AlertView
              alertTitle="Error"
              severity="error"
              variant="filled"
              textContent={actionError}
            />
          </div>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default Product;
