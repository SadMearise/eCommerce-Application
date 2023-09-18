import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import styles from "./CatalogProductCard.module.scss";
import { IProductCardProps } from "./types";
import { formatPrice } from "../../utils/getPrice";
import locale from "../../settings";
import { Attributes } from "../../utils/types";
import sizeStringToNumber from "../../utils/sizeStringToNumber";
import getAttributeLabel from "../../utils/getAttributeLabel";
import { addProductToCart, createCart, getCarts } from "../../services/cart.service";
import { setCount } from "../../store/features/cartCount/cartCountSlice";
import { useAppDispatch } from "../../store/hooks";
import AlertView from "../alertView/AlertView";
import updateActiveTimeoutWithDelay from "../../utils/updateActiveTimeoutWithDelay";
import getProductCountFromCart from "../../utils/getProductCountFromCart";

export default function ProductCard({ product, url, cart, setIsLoading }: IProductCardProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isActiveTimeout, setIsActiveTimeout] = useState(false);
  const [actionError, setActionError] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cart) {
      const isProductInCart = cart.lineItems.some((item) => item.productId === product.id);
      setIsDisabled(isProductInCart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (product) {
    const productDescription = product.description ? product.description[locale] : "";
    const productName = product.name ? product.name[locale] : "";
    const productImages = product.masterVariant.images ? product.masterVariant.images : [];
    const productUrl = productImages.length ? productImages[0].url : "no-image.png";
    const productPrices = product.masterVariant.prices ? product.masterVariant.prices : [];
    const prices = productPrices.length ? productPrices[0] : null;

    const handleAddToCart = async () => {
      try {
        setIsLoading(true);
        setIsDisabled(true);
        const myCarts = (await getCarts()).body.results;
        let activeCart = myCarts[0];

        if (!activeCart) {
          activeCart = await createCart();
        }
        await addProductToCart(activeCart.id, activeCart.version, product.id);
        dispatch(setCount(await getProductCountFromCart()));
        setIsLoading(false);
      } catch (e) {
        setActionError("Can't add product to cart");
        setIsDisabled(false);
        setIsLoading(false);

        updateActiveTimeoutWithDelay(isActiveTimeout, setActionError, setIsActiveTimeout, 2000);
      }
    };

    return (
      <div className={styles["card-wrapper"]}>
        <Card
          sx={{ maxWidth: 345 }}
          className={styles.card}
        >
          <CardMedia
            className={styles.image}
            component="img"
            image={productUrl}
            alt={productName}
          />
          <CardContent className={styles.content}>
            <Typography
              className={styles["product-name"]}
              gutterBottom
              variant="h6"
              component="div"
            >
              {productName}
            </Typography>
            <Typography
              variant="body2"
              className={styles.description}
            >
              {productDescription}
            </Typography>
            <p className={styles.attributes}>
              <b>Brand:</b>
              {product.masterVariant.attributes?.map(
                (attribute) =>
                  attribute.name === "brand" && (
                    <span key={`${Math.random()}${attribute.value.label}`}>{attribute.value.label}</span>
                  )
              )}
            </p>
            <p className={styles.attributes}>
              <b>Color:</b>
              {product.masterVariant.attributes?.map(
                (attribute) =>
                  attribute.name === "color" && (
                    <span key={`${Math.random()}${attribute.value.label}`}>{attribute.value.label}</span>
                  )
              )}
            </p>
            <p className={styles.attributes}>
              <b>Sizes: </b>
              {product.variants
                .concat([product.masterVariant])
                .sort((a, b) => sizeStringToNumber(a) - sizeStringToNumber(b))
                .map((variant) => (
                  <span key={variant.id}>
                    {getAttributeLabel(variant.attributes?.find((attr) => attr.name.endsWith(Attributes.Size)))}
                    &nbsp;
                  </span>
                ))}
            </p>

            {prices &&
              (Object.prototype.hasOwnProperty.call(prices, "discounted") && prices.discounted ? (
                <Box className={styles["price-wrapper"]}>
                  <Typography className={[styles.price, styles["price-line-through"]].join(" ")}>
                    {formatPrice(prices.value)}
                  </Typography>
                  <Typography className={[styles.price, styles["price-discount"]].join(" ")}>
                    {formatPrice(prices.discounted.value)}
                  </Typography>
                </Box>
              ) : (
                <Box className={styles["price-wrapper"]}>
                  <Typography className={styles.price}>{formatPrice(prices.value)}</Typography>
                </Box>
              ))}
            <Button
              className={styles["button-add-to-cart"]}
              variant="outlined"
              disabled={isDisabled}
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
            <Link
              to={url}
              className={styles.link}
            />
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
          </CardContent>
        </Card>
      </div>
    );
  }

  return <div>Content not found</div>;
}
