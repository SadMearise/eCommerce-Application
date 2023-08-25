import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductProjection } from "@commercetools/platform-sdk/";
import Header from "../../components/header/Header";
import getApiRoot from "../../services/BuildClient";
import ProductSlider from "../../components/slider/ProductSlider";
import styles from "./Product.module.scss";

function Product() {
  const params = useParams();
  const [product, setProduct] = useState<ProductProjection>();
  const [error, setError] = useState("");
  const locale = "en-US";

  useEffect(() => {
    const keyValue = params.productId ?? "";
    getApiRoot()
      .productProjections()
      .withKey({ key: keyValue })
      .get()
      .execute()
      .then((productResp) => {
        if (productResp.statusCode === 200) {
          setProduct(productResp.body);
          console.log("product", productResp.body);
        } else {
          throw new Error("Server error");
        }
      })
      .catch((e) => {
        setError(`Can't load product ${e}`);
      });
  }, [params.productId]);

  if (error) {
    return (
      <>
        <Header />
        <h2>{error}</h2>
      </>
    );
  }

  function getPrice() {
    const centAmount = product?.masterVariant?.prices ? product?.masterVariant?.prices[0].value.centAmount : 0;
    return (centAmount / 100).toFixed(2);
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <div className={styles.body}>
          <ProductSlider images={product?.masterVariant?.images ?? []} />
          <div className={styles.info}>
            <h1 className={styles.title}>{product?.name[locale]}</h1>
            <p>{getPrice()}</p>
            <p>{product?.description ? product?.description[locale] : "No description"}</p>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Product;
