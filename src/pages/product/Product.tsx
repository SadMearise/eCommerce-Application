import { Alert, AlertTitle, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductProjection, ProductType } from "@commercetools/platform-sdk/";
import Button from "@mui/material/Button";
import Header from "../../components/header/Header";
import ProductSlider from "../../components/productSlider/ProductSlider";
import styles from "./Product.module.scss";
import locale from "../../settings";
import { getProductByKey, getProductTypeById } from "../../services/product.service";
import ProductAttributes from "../../components/productAttributes/ProductAttributes";
import ProductSizes from "../../components/productSizes/ProductSizes";
import ProductPrices from "../../components/productPrices/ProductPrices";
import { getActiveCart } from "../../services/cart.service";

function Product() {
  const params = useParams();
  const [product, setProduct] = useState<ProductProjection>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [productType, setProductType] = useState<ProductType>();
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const loadProductAndType = async () => {
      try {
        const keyValue = params.productId ?? "";
        setIsLoading(true);

        const prod = await getProductByKey(keyValue);
        setProduct(prod);

        const type = await getProductTypeById(prod.productType.id);
        setProductType(type);
      } catch (e) {
        setError(`Can't load product. ${e}`);
      }
    };

    loadProductAndType();
  }, [params.productId]);

  useEffect(() => {
    const checkCart = async () => {
      const cart = await getActiveCart();

      if (cart && product) {
        for (let i = 0; i < cart.lineItems.length; i += 1) {
          if (cart.lineItems[i].productId === product.id) {
            setIsDisabled(true);
            break;
          }
        }
        setIsLoading(false);
      }
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
            <ProductPrices product={product} />
            <p>{product?.description ? product?.description[locale] : "No description"}</p>
            <ProductAttributes
              product={product}
              productType={productType}
            />
            <ProductSizes product={product} />
            <Button
              disabled={isDisabled}
              variant="outlined"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Product;
