import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductProjection } from "@commercetools/platform-sdk/";
import Header from "../../components/header/Header";
import getApiRoot from "../../services/BuildClient";
import ProductSlider from "../../components/slider/ProductSlider";
import styles from "./Product.module.scss";
import Prices from "./types";

function Product() {
  const params = useParams();
  const [product, setProduct] = useState<ProductProjection>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const locale = "en-US";

  useEffect(() => {
    const keyValue = params.productId ?? "";
    setIsLoading(true);
    getApiRoot()
      .productProjections()
      .withKey({ key: keyValue })
      .get()
      .execute()
      .then((productResp) => {
        if (productResp.statusCode === 200) {
          setProduct(productResp.body);
        } else {
          throw new Error("Server error");
        }
      })
      .catch((e) => {
        setError(`Can't load product ${e}`);
      });
    setIsLoading(false);
  }, [params.productId]);

  if (error) {
    return (
      <>
        <Header />
        <h2>{error}</h2>
      </>
    );
  }

  function getPrice(type: Prices) {
    if (!product?.masterVariant?.prices?.length) {
      return "";
    }

    let price = product.masterVariant.prices[0].value;
    if (type === Prices.Current && product.masterVariant.prices[0].discounted) {
      price = product.masterVariant.prices[0].discounted.value;
    }

    const { centAmount, currencyCode } = price;
    return (centAmount / 100).toLocaleString(locale, { style: "currency", currency: currencyCode });
  }

  if (isLoading) {
    return <h1>loading..</h1>;
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
                  <p className={styles["original-price"]}>{getPrice(Prices.Original)}</p>
                  <p className={styles["current-price"]}>{getPrice(Prices.Current)}</p>
                </>
              ) : (
                <p className={styles["current-price"]}>{getPrice(Prices.Original)}</p>
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
