import { CentPrecisionMoney, DiscountCodeInfo, LineItem } from "@commercetools/platform-sdk";
import styles from "./BasketTotalCost.module.scss";
import CENT from "../../utils/constants";

export default function BasketTotalCost({
  totalPrice,
  basketItems,
  discountCodes,
}: {
  totalPrice: CentPrecisionMoney;
  basketItems: LineItem[];
  discountCodes: DiscountCodeInfo[];
}) {
  const { centAmount } = totalPrice;
  const formattedTotalPrice = (centAmount * CENT).toFixed(2);
  const productsQuantity = basketItems.reduce((accum, item) => accum + item.quantity, 0);

  const totalPriceWithoutPromo = basketItems.reduce((accum, item) => {
    let itemPrice;

    if (item.price.discounted?.value.centAmount) {
      itemPrice = item.price.discounted.value.centAmount * item.quantity;
    } else {
      itemPrice = item.price.value.centAmount * item.quantity;
    }

    return accum + itemPrice;
  }, 0);
  const formattedTotalPriceWithoutPromo = (totalPriceWithoutPromo * CENT).toFixed(2);

  return (
    <div className={styles["total-cost"]}>
      <h2>Your Bracket:</h2>
      <div className={styles["regular-price-wrapper"]}>
        <span>{`Subtotal (${productsQuantity > 1 ? `${productsQuantity} items` : "1 item"}): `}</span>
        <span className={styles["regular-price"]}>{`€${formattedTotalPriceWithoutPromo}`}</span>
      </div>
      <div className={styles["promo-code-wrapper"]}>
        <span>Price with Promo Code:</span>
        <span className={discountCodes.length >= 1 ? styles["promo-code-price"] : ""}>
          {discountCodes.length >= 1 ? `€${formattedTotalPrice}` : "-"}
        </span>
      </div>
    </div>
  );
}
