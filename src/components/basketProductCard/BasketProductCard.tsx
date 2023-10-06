import styles from "./BasketProductCard.module.scss";
import CENT, { FIRST_ELEMENT } from "../../utils/constants";
import { BasketProductCardProps } from "./types";

export default function BasketProductCard({ product }: BasketProductCardProps) {
  const {
    name: { en: itemName },
    quantity,
  } = product;
  const { images, prices } = product.variant;

  const price =
    prices && prices[0].discounted ? prices[0].discounted.value.centAmount : prices && prices[0].value.centAmount;
  const formattedPrice = price && (price * CENT).toFixed(2);

  const firstImg = images && images.length > 0 ? images[FIRST_ELEMENT].url : "";
  const firstImgAlt = images && images.length > 0 ? images[FIRST_ELEMENT].label : "";

  return (
    <div className={styles["basket-item-details"]}>
      <img
        className={styles["basket-item-img"]}
        src={firstImg}
        alt={firstImgAlt}
      />
      <div className={styles["basket-item-description"]}>
        <span className={styles["basket-item-name"]}>{itemName}</span>
        {quantity > 1 && <span>{`€${formattedPrice} / item`}</span>}
      </div>
    </div>
  );
}
