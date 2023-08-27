import { Alert, AlertTitle, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AttributeDefinition, ProductProjection, ProductType } from "@commercetools/platform-sdk/";
import Header from "../../components/header/Header";
import ProductSlider from "../../components/productSlider/ProductSlider";
import styles from "./Product.module.scss";
import Prices from "./types";
import getPrice from "../../utils/getPrice";
import locale from "../../settings";
import { getProductByKey, getProductTypeById } from "../../services/productService";
import sizeStringToNumber from "../../utils/sizeStringToNumber";

function Product() {
  const params = useParams();
  const [product, setProduct] = useState<ProductProjection>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [productType, setProductType] = useState<ProductType>();

  useEffect(() => {
    const keyValue = params.productId ?? "";
    setIsLoading(true);
    getProductByKey(keyValue)
      .then((prod) => {
        setProduct(prod);

        getProductTypeById(prod.productType.id)
          .then((type) => {
            setProductType(type);
          })
          .catch((e) => {
            setError(`Can't load product. ${e}`);
          });
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
            {(productType?.attributes ?? [])
              .filter((attrType) => !attrType.name.endsWith("size"))
              .map((attrType: AttributeDefinition) => (
                <p key={attrType.name}>
                  <b>{attrType.label[locale]}</b>
                  <b>: </b>
                  {product.masterVariant.attributes?.find((attr) => attr.name === attrType.name)?.value}
                </p>
              ))}
            <p>
              <b>Sizes: </b>
              {product.variants
                .concat([product.masterVariant])
                .sort((a, b) => sizeStringToNumber(a) - sizeStringToNumber(b))
                .map((variant) => (
                  <span key={variant.id}>
                    {variant.attributes?.find((attr) => attr.name.endsWith("size"))?.value}
                    &nbsp;
                  </span>
                ))}
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Product;
