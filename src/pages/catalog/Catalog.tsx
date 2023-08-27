import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { ProductProjection } from "@commercetools/platform-sdk";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Header from "../../components/header/Header";
import ProductCard from "../../components/productCard/ProductCard";
import getApiRoot from "../../services/BuildClient";
import styles from "./Catalog.module.scss";
import CatalogSearch from "../../components/catalogSearch/CatalogSearch";
import PAGE_LIMIT from "./constants";

export default function Catalog() {
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [countPages, setCountPages] = useState(1);

  const updateData = (value: string): void => {
    setInputValue(value);
  };

  useEffect(() => {
    const apiRoot = getApiRoot();

    apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          "text.en-US": `${inputValue}`,
          fuzzy: true,
          limit: PAGE_LIMIT,
          offset: (currentPage - 1) * PAGE_LIMIT,
        },
      })
      .execute()
      .then((response) => {
        if (response.body.total) {
          setCountPages(Math.ceil(response.body.total / PAGE_LIMIT));
        }
        setProducts(response.body.results);
      });
  }, [currentPage, inputValue]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <CatalogSearch setInputValue={updateData} />
        {products.length ? (
          <>
            <Box className={styles["catalog-container"]}>
              {products.map((product) => (
                <ProductCard
                  product={product}
                  key={product.id}
                />
              ))}
            </Box>
            {countPages > 1 && (
              <Pagination
                className={styles.pagination}
                count={countPages}
                page={currentPage}
                color="primary"
                onChange={(_, num) => {
                  setCurrentPage(num);
                }}
              />
            )}
          </>
        ) : (
          <div>Content not found</div>
        )}
      </Container>
    </>
  );
}
