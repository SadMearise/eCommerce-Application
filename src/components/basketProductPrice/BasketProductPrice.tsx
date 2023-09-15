import styles from "./Basket.productPrice.module.scss";
import CENT from "../../utils/constants";
import { BasketProductPriceProps } from "./types";

export default function BasketProductPrice({ price, productQuantity }: BasketProductPriceProps) {
  const regularPrice = price.value.centAmount;
  const discountedPrice = price.discounted?.value?.centAmount;

  const formattedRegularPrice = regularPrice ? (regularPrice * CENT * productQuantity).toFixed(2) : 0;
  const formattedDiscountedPrice = discountedPrice ? (discountedPrice * CENT * productQuantity).toFixed(2) : 0;

  return (
    <div className={styles["basket-item-price"]}>
      {formattedDiscountedPrice ? (
        <>
          <span className={styles["with-sale-price"]}>{`€${formattedDiscountedPrice}`}</span>
          <span className={styles["without-sale-price"]}>{`€${formattedRegularPrice}`}</span>
        </>
      ) : (
        <span className={styles["original-price"]}>{`€${formattedRegularPrice}`}</span>
      )}
    </div>
  );
}
