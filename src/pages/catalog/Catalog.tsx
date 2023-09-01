import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { ProductProjection } from "@commercetools/platform-sdk";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import Header from "../../components/header/Header";
import ProductCard from "../../components/catalogProductCard/CatalogProductCard";
import getApiRoot from "../../services/BuildClient";
import styles from "./Catalog.module.scss";
import CatalogSearch from "../../components/catalogSearch/CatalogSearch";
import PAGE_LIMIT from "./constants";
import CatalogFilter from "../../components/catalogFilter/CatalogFilter";
import { TPriceSliderDefaultValues } from "./types";

export default function Catalog() {
  const priceSliderDefaultValues: TPriceSliderDefaultValues = {
    min: 0,
    max: 100,
  };
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [priceSliderValues, setPriceSliderValues] = useState<TPriceSliderDefaultValues>(priceSliderDefaultValues);
  const [countPages, setCountPages] = useState(1);
  const [filterValues, setFilterValues] = useState<Record<string, string[]>>({});

  const ucFirst = (str: string) => {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
  };

  const getAttributePath = (attribute: string, values: string[]) => {
    let path = `variants.attributes.${attribute}:`;

    values.forEach((value: string, index: number) => {
      if (index === values.length - 1) {
        path += `"${value}", `;
        path += `"${ucFirst(value)}"`;
      } else {
        path += `"${value}", `;
        path += `"${ucFirst(value)}", `;
      }
    });

    return path;
  };

  const filterRules: string[] = [];

  const apiRoot = getApiRoot();

  useEffect(() => {
    filterRules.push(
      `variants.price.centAmount:range (${priceSliderValues.min * 100} to ${priceSliderValues.max * 100})`
    );

    Object.keys(filterValues).forEach((key) => {
      if (filterValues[key].length) {
        filterRules.push(getAttributePath(key, filterValues[key]));
      }
    });

    apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          "text.en-US": `${inputValue}`,
          fuzzy: true,
          filter: filterRules,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues, priceSliderValues, currentPage, inputValue]);

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
              setPriceSliderValues={setPriceSliderValues}
              priceSliderDefaultValues={priceSliderDefaultValues}
              setFilterValues={setFilterValues}
            />
          </Grid>

          <Grid
            item
            xs={10}
          >
            <CatalogSearch
              setInputValue={setInputValue}
              setCurrentPage={setCurrentPage}
            />
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
