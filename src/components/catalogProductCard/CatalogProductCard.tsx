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
import { addProductToCart, createCart, getActiveCart } from "../../services/cart.service";

export default function ProductCard({ product, url, cart }: IProductCardProps) {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (cart) {
      for (let i = 0; i < cart.lineItems.length; i += 1) {
        if (cart.lineItems[i].productId === product.id) {
          setIsDisabled(true);
          break;
        }
      }
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

    const handleButtonClick = async () => {
      setIsDisabled(true);
      let activeCart = await getActiveCart();

      if (!activeCart) {
        activeCart = await createCart();
      }

      await addProductToCart(activeCart.id, activeCart.version, product.id);
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
              onClick={handleButtonClick}
            >
              Add to cart
            </Button>
            <Link
              to={url}
              className={styles.link}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return <div>Content not found</div>;
}
