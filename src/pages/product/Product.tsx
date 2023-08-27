import { Alert, AlertTitle, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductProjection } from "@commercetools/platform-sdk/";
import Header from "../../components/header/Header";
import ProductSlider from "../../components/productSlider/ProductSlider";
import styles from "./Product.module.scss";
import Prices from "./types";
import getPrice from "../../utils/getPrice";
import locale from "../../settings";
import getProductByKey from "../../services/productService";
// import getApiRoot from "../../services/BuildClient";

function Product() {
  const params = useParams();
  const [product, setProduct] = useState<ProductProjection>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const keyValue = params.productId ?? "";
    setIsLoading(true);
    getProductByKey(keyValue)
      .then((prod) => {
        setProduct(prod);
      })
      .catch((e) => {
        setError(`Can't load product. ${e}`);
      });
    setIsLoading(false);
  }, [params.productId]);

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
            <div className={styles.prices}>
              {product?.masterVariant?.prices?.length && product.masterVariant?.prices[0].discounted ? (
                <>
                  <p className={styles["original-price"]}>{getPrice(product, Prices.Original)}</p>
                  <p className={styles["current-price"]}>{getPrice(product, Prices.Current)}</p>
                </>
              ) : (
                <p className={styles["current-price"]}>{getPrice(product, Prices.Original)}</p>
              )}
            </div>
            <p>{product?.description ? product?.description[locale] : "No description"}</p>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Product;
