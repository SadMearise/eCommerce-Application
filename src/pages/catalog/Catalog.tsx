import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import { Cart, ProductProjection } from "@commercetools/platform-sdk";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Header from "../../components/header/Header";
import ProductCard from "../../components/catalogProductCard/CatalogProductCard";
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
import { getSearchProductProjections } from "../../services/product.service";
import { TCatalogFilterValues } from "../../models/types";
import Footer from "../../components/footer/Footer";
import { getCarts } from "../../services/cart.service";

export default function Catalog() {
  const location = useLocation();
  const priceSliderDefaultValues: TPriceSliderDefaultValues = {
    min: 0,
    max: 10000,
  };

  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [priceSliderValues, setPriceSliderValues] = useState<TPriceSliderDefaultValues>(priceSliderDefaultValues);
  const [countPages, setCountPages] = useState(1);
  const [filterValues, setFilterValues] = useState<TCatalogFilterValues>({});
  const [sortValues, setSortValues] = useState<TSortValues>({ key: "", method: "" });
  const [categoriesBreadcrumbs, setCategoriesBreadcrumbs] = useState<TCategories[]>([]);
  const [categories, setCategories] = useState<TCategories[]>([]);
  const [currentId, setCurrentId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<false | Cart>(false);

  const updateCart = async () => {
    const getCart = (await getCarts()).body.results;
    const currentCart = getCart[0];
    setCart(currentCart);
  };

  const updateProducts = async () => {
    const filterRules: string[] = [];
    let sortRules: string = "";

    if (sortValues.key && sortValues.method) {
      sortRules = getSortingPath(sortValues.key, sortValues.method);
    }

    if (categoriesBreadcrumbs.length) {
      filterRules.push(`categories.id: subtree("${categoriesBreadcrumbs[categoriesBreadcrumbs.length - 1].id}")`);
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
      "text.en": `${searchInputValue}`,
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

    const searchedProduct = await getSearchProductProjections(queryArgs);

    setIsLoading(false);
    if (searchedProduct.total) {
      setCountPages(Math.ceil(searchedProduct.total / PAGE_LIMIT));
    }
    setProducts(searchedProduct.results);
  };

  useEffect(() => {
    updateCart();
  }, [currentPage]);

  useEffect(() => {
    if (location.pathname === RouterPaths.Catalog) {
      setCategoriesBreadcrumbs([]);
    }
  }, [location]);

  useEffect(() => {
    setIsLoading(false);
    updateProducts();
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValues, priceSliderValues, currentPage, searchInputValue, sortValues, categoriesBreadcrumbs]);

  const catalogCards = () => {
    if (products.length || isLoading) {
      return (
        <>
          <Box className={styles["catalog-container"]}>
            {products.map((product) => (
              <ProductCard
                product={product}
                key={product.id}
                url={`/product/${product.key}`}
                cart={cart}
                setIsLoading={setIsLoading}
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
      );
    }

    return <div>Sorry! We have run out of products with the specified filters :&#40;</div>;
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <Container maxWidth="lg">
        <CatalogCategories
          setCategoriesBreadcrumbs={setCategoriesBreadcrumbs}
          categories={categories}
          setCategories={setCategories}
          currentId={currentId}
          setCurrentId={setCurrentId}
          setCurrentPage={setCurrentPage}
        />
        <CatalogBreadcrumbs
          breadcrumbs={categoriesBreadcrumbs}
          setCategoriesBreadcrumbs={setCategoriesBreadcrumbs}
          setCurrentId={setCurrentId}
          setCurrentPage={setCurrentPage}
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
              priceSliderDefaultValues={priceSliderValues}
              setFilterValues={setFilterValues}
              setCurrentPage={setCurrentPage}
            />
          </Grid>

          <Grid
            item
            xs={9}
            className={styles["content-right"]}
          >
            <CatalogSearch
              setSearchInputValue={setSearchInputValue}
              setCurrentPage={setCurrentPage}
            />
            <CatalogSortingDopdownMenu setSortValues={setSortValues} />
            {catalogCards()}
          </Grid>
        </Grid>
        {isLoading && (
          <div className={styles["progress-wrapper"]}>
            <CircularProgress className={styles["circular-progress"]} />
          </div>
        )}
      </Container>
      <Footer />
    </div>
  );
}
