import { ProductProjection } from "@commercetools/platform-sdk";
import styles from "./BasketTotalCost.module.scss";
import CENT, { FIRST_ELEMENT } from "../../utils/constants";

export default function BasketTotalCost({ products }: { products: ProductProjection[] }) {
  console.log("products", products);
  const regularPrices: number[] = [];
  const discountedPrices: number[] = [];

  products.forEach((product) => {
    const {
      masterVariant: { prices },
    } = product;

    const regularPrice = prices && prices[FIRST_ELEMENT].value.centAmount;
    const discountedPrice =
      prices && prices[FIRST_ELEMENT].discounted && prices[FIRST_ELEMENT].discounted.value.centAmount;

    const regularPriceInCents = regularPrice ? regularPrice * CENT : 0;
    const discountedPriceInCents = discountedPrice ? discountedPrice * CENT : 0;

    if (regularPriceInCents) {
      regularPrices.push(Number(regularPriceInCents.toFixed(2)));
    }

    if (discountedPriceInCents) {
      discountedPrices.push(Number(discountedPriceInCents.toFixed(2)));
    }
  });

  const totalRegularPrice = regularPrices.reduce((acc, price) => acc + price, 0);
  const totalDiscountedPrice = discountedPrices.reduce((acc, price) => acc + price, 0);
  const totalSale = totalRegularPrice - totalDiscountedPrice;

  return (
    <div className={styles["total-cost"]}>
      <h2>Your Bracket:</h2>
      <div className={styles["regular-price-wrapper"]}>
        <span>{`Subtotal (${products.length > 1 ? `${products.length} items` : "0"}): `}</span>
        <span className={styles["regular-price"]}>{`€${totalDiscountedPrice}`}</span>
      </div>
      <div className={styles["discounted-price-wrapper"]}>
        <span>Total Discount:</span>
        <span className={styles["discounted-price"]}>{`- €${totalSale.toFixed(2)}`}</span>
      </div>
    </div>
  );
}
