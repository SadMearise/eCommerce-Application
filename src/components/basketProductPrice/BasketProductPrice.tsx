import { ProductProjection } from "@commercetools/platform-sdk";
import styles from "./Basket.productPrice.module.scss";
import getPrice from "../../utils/getPrice";
import Prices from "../../pages/product/types";
import { FIRST_ELEMENT } from "../../utils/constants";

export default function BasketProductPrice({ product }: { product: ProductProjection }) {
  const {
    masterVariant: { prices },
  } = product;

  const priceWithSale = (prices && prices[FIRST_ELEMENT].discounted) || "";
  return (
    <div className={styles["basket-item-price"]}>
      {priceWithSale ? (
        <>
          <span className={styles["with-sale-price"]}>{getPrice(product, Prices.Current)}</span>
          <span className={styles["without-sale-price"]}>{getPrice(product, Prices.Original)}</span>
        </>
      ) : (
        <span className={styles["original-price"]}>{getPrice(product, Prices.Original)}</span>
      )}
    </div>
  );
}
