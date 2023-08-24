import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductProjection } from "@commercetools/platform-sdk/";
import Header from "../components/header/Header";
import getApiRoot from "../services/BuildClient";
import ProductSlider from "../components/slider/ProductSlider";

export default function Product() {
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

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <>
          <h1>{product?.name[locale]}</h1>
          <p>{product?.description ? product?.description[locale] : "No description"}</p>
          <img
            src={product?.masterVariant?.images ? product?.masterVariant?.images[0].url : ""}
            alt=""
          />
          <ProductSlider />
        </>
      </Container>
    </>
  );
}
