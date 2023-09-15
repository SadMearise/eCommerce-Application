import styles from "./BasketProductCard.module.scss";
import { FIRST_ELEMENT } from "../../utils/constants";
import { BasketProductCardProps } from "./types";

export default function BasketProductCard({ product }: BasketProductCardProps) {
  const {
    name: { "en-US": itemName },
  } = product;
  const { attributes, images } = product.variant;

  const firstImg = images && images.length > 0 ? images[FIRST_ELEMENT].url : "";
  const firstImgAlt = images && images.length > 0 ? images[FIRST_ELEMENT].label : "";
  const attributeElements =
    attributes &&
    attributes.map((attribute) => (
      <span key={attribute.name}>{`${attribute.name} ${attribute.value.key.toUpperCase()}`}</span>
    ));

  return (
    <div className={styles["basket-item-details"]}>
      <img
        className={styles["basket-item-img"]}
        src={firstImg}
        alt={firstImgAlt}
      />
      <div className={styles["basket-item-description"]}>
        <span className={styles["basket-item-name"]}>{itemName}</span>
        {attributeElements}
      </div>
    </div>
  );
}
