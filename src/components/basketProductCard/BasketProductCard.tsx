import { ProductProjection } from "@commercetools/platform-sdk";
import styles from "./BasketProductCard.module.scss";
import { FIRST_ELEMENT } from "../../utils/constants";

export default function BasketProductCard({ product }: { product: ProductProjection }) {
  const {
    masterVariant: { attributes, images },
  } = product || { masterVariant: { images: [] } };

  const firstImg = images && images.length > 0 ? images[FIRST_ELEMENT].url : "";
  const firstImgAlt = images && images.length > 0 ? images[FIRST_ELEMENT].label : "";

  const productName = product.name["en-US"];

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
        <span className={styles["basket-item-name"]}>{productName}</span>
        {attributeElements}
      </div>
    </div>
  );
}
