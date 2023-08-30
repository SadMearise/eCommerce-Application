import getPrice from "../../utils/getPrice";
import Prices from "../../pages/product/types";
import styles from "./ProductPrices.module.scss";
import IProductPricesProps from "./types";

function ProductPrices({ product }: IProductPricesProps) {
  return (
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
  );
}

export default ProductPrices;
