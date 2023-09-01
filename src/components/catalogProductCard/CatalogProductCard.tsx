import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import styles from "./CatalogProductCard.module.scss";
import { IProductCardProps } from "./types";

export default function ProductCard({ product, url }: IProductCardProps) {
  if (product) {
    const productDescription = product.description ? product.description["en-US"] : "";
    const productName = product.name ? product.name["en-US"] : "";
    const productImages = product.masterVariant.images ? product.masterVariant.images : [];
    const productUrl = productImages.length ? productImages[0].url : "no-image.png";
    const productPrices = product.masterVariant.prices ? product.masterVariant.prices : [];
    const prices = productPrices.length ? productPrices[0] : null;

    return (
      <div className={styles["card-wrapper"]}>
        <Card
          sx={{ maxWidth: 345 }}
          className={styles.card}
        >
          <CardMedia
            component="img"
            height="194"
            image={productUrl}
            alt="Paella dish"
          />
          <CardContent className={styles.content}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
            />
            {productName}
            <Typography
              variant="body2"
              className={styles.description}
            >
              {productDescription}
            </Typography>
            {prices &&
              (Object.prototype.hasOwnProperty.call(prices, "discounted") && prices.discounted ? (
                <Box className={styles["price-wrapper"]}>
                  <Typography className={[styles.price, styles["price-line-through"]].join(" ")}>
                    {prices.value.centAmount}
                  </Typography>
                  <Typography className={[styles.price, styles["price-discount"]].join(" ")}>
                    {prices.discounted.value.centAmount}
                  </Typography>
                </Box>
              ) : (
                <Box className={styles["price-wrapper"]}>
                  <Typography className={styles.price}>{prices.value.centAmount}</Typography>
                </Box>
              ))}
          </CardContent>
          <Link
            to={url}
            className={styles.link}
          />
        </Card>
      </div>
    );
  }

  return <div>Content not found</div>;
}
