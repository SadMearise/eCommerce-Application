import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { ProductProjection } from "@commercetools/platform-sdk";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import ProductCard from "../../components/catalogProductCard/CatalogProductCard";
import getApiRoot from "../../services/BuildClient";
import styles from "./Catalog.module.scss";
import CatalogSearch from "../../components/catalogSearch/CatalogSearch";
import PAGE_LIMIT from "./constants";
import CatalogFilter from "../../components/catalogFilter/CatalogFilter";
import { TCategories, TPriceSliderDefaultValues, TQueryArgs, TSortValues } from "./types";
import CatalogSortingDopdownMenu from "../../components/catalogSortingDopdownMenu/CatalogSortingDopdownMenu";
import CatalogCategories from "../../components/catalogCategories/CatalogCategories";
import CatalogBreadcrumbs from "../../components/catalogBreadcrumbs/CatalogBreadcrumbs";
import RouterPaths from "../../router/routes";
import { getAttributePath, getSortingPath } from "../../utils/getPaths";

export default function Catalog() {
  const location = useLocation();
  const apiRoot = getApiRoot();

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
  const [sortValues, setSortValues] = useState<TSortValues>({ key: "", method: "" });
  const [categoriesBreadcrumbs, setCategoriesBreadcrumbs] = useState<TCategories[]>([]);
  const [categories, setCategories] = useState<TCategories[]>([]);
  const [currentId, setCurrentId] = useState("");

  const filterRules: string[] = [];
  let sortRules: string = "";

  if (sortValues.key && sortValues.method) {
    sortRules = getSortingPath(sortValues.key, sortValues.method);
  }

  if (categoriesBreadcrumbs.length) {
    filterRules.push(`categories.id:"${categoriesBreadcrumbs[categoriesBreadcrumbs.length - 1].id}"`);
  }

  filterRules.push(
    `variants.price.centAmount:range (${priceSliderValues.min * 100} to ${priceSliderValues.max * 100})`
  );

  Object.keys(filterValues).forEach((key) => {
    if (filterValues[key].length) {
      filterRules.push(getAttributePath(key, filterValues[key]));
    }
  });

  let queryArgs: TQueryArgs = {
    "text.en-US": `${inputValue}`,
    fuzzy: true,
    filter: filterRules,
    limit: PAGE_LIMIT,
    offset: (currentPage - 1) * PAGE_LIMIT,
  };

  if (sortRules.length) {
    queryArgs = {
      ...queryArgs,
      sort: sortRules,
    };
  }

  useEffect(() => {
    if (location.pathname === RouterPaths.Catalog) {
      setCategoriesBreadcrumbs([]);
      setCurrentId("");
    }
  }, [location]);

  useEffect(() => {
    apiRoot
      .productProjections()
      .search()
      .get({ queryArgs })
      .execute()
      .then((response) => {
        if (response.body.total) {
          setCountPages(Math.ceil(response.body.total / PAGE_LIMIT));
        }
        setProducts(response.body.results);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues, priceSliderValues, currentPage, inputValue, sortValues, categoriesBreadcrumbs]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <CatalogCategories
          setCategoriesBreadcrumbs={setCategoriesBreadcrumbs}
          categories={categories}
          setCategories={setCategories}
          currentId={currentId}
          setCurrentId={setCurrentId}
          apiRoot={apiRoot}
        />
        <CatalogBreadcrumbs
          breadcrumbs={categoriesBreadcrumbs}
          setCategoriesBreadcrumbs={setCategoriesBreadcrumbs}
          setCurrentId={setCurrentId}
        />
        <Grid
          className={styles["content-container"]}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid
            item
            xs={3}
            className={styles["content-left"]}
          >
            <CatalogFilter
              setPriceSliderValues={setPriceSliderValues}
              priceSliderDefaultValues={priceSliderDefaultValues}
              setFilterValues={setFilterValues}
              setCurrentPage={setCurrentPage}
              apiRoot={apiRoot}
            />
          </Grid>

          <Grid
            item
            xs={9}
            className={styles["content-right"]}
          >
            <CatalogSearch
              setInputValue={setInputValue}
              setCurrentPage={setCurrentPage}
            />
            <CatalogSortingDopdownMenu setSortValues={setSortValues} />
            {products.length ? (
              <>
                <Box className={styles["catalog-container"]}>
                  {products.map((product) => (
                    <ProductCard
                      product={product}
                      key={product.id}
                      url={`/product/${product.key}`}
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
