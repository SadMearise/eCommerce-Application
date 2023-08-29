import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { ProductProjection } from "@commercetools/platform-sdk";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import Header from "../../components/header/Header";
import ProductCard from "../../components/productCard/ProductCard";
import getApiRoot from "../../services/BuildClient";
import styles from "./Catalog.module.scss";
import CatalogSearch from "../../components/catalogSearch/CatalogSearch";
import PAGE_LIMIT from "./constants";
import CatalogFilter from "../../components/catalogFilter/CatalogFilter";

export default function Catalog() {
  const priceSliderDefaultValues = [0, 10];
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [priceSliderValues, setPriceSliderValues] = useState<number[]>(priceSliderDefaultValues);
  const [countPages, setCountPages] = useState(1);

  const apiRoot = getApiRoot();

  const updateSearchInputValue = (value: string): void => {
    setInputValue(value);
  };

  const updatePriceSliderValues = (value: number[]): void => {
    setPriceSliderValues(value);
  };

  useEffect(() => {
    const min = priceSliderValues[0] * 100;
    const max = priceSliderValues[1] * 100;

    apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: `variants.price.centAmount:range (${min} to ${max})`,
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
  }, [priceSliderValues]);

  useEffect(() => {
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
        <Grid
          className={styles["content-container"]}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid
            item
            xs={2}
          >
            <CatalogFilter
              setPriceSliderValues={updatePriceSliderValues}
              priceSliderDefaultValues={priceSliderDefaultValues}
            />
          </Grid>

          <Grid
            item
            xs={10}
          >
            <CatalogSearch setInputValue={updateSearchInputValue} />
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
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
// const filterStr = 'variants.attributes.brand.key:"new-googles"'
// apiRoot
//     .productProjections()
//     .search()
//     .get({
//       queryArgs: {
//         limit: 30,
//         offset: 0,
//         filter: filterStr,
//         markMatchingVariants: true,
//       },
//     })
//     .execute();
