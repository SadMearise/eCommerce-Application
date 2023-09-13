import { useEffect, useState } from "react";
import { ProductProjection } from "@commercetools/platform-sdk";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getProducts } from "../../services/product.service";
import styles from "./BasketComponent.module.scss";
import BasketProductCard from "../basketProductCard/BasketProductCard";
import BasketProductQuantity from "../basketProductQuantity/BasketProductQuantity";
import BasketProductPrice from "../basketProductPrice/BasketProductPrice";
import BasketTotalCost from "../basketTotalCost/BasketTotalCost";
import BasketPromoCodeField from "../basketPromoCodeField/BasketPromoCodeField";

export default function BasketComponent() {
  const [productInBasket] = useState<ProductProjection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products: ProductProjection[] = (await getProducts()).body.results;
        console.log(products);

        products.forEach((item) => {
          if (productInBasket.length < 3) {
            productInBasket.push(item);
          }
        });

        setIsLoading(false);
      } catch (e) {
        console.log(e);
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <div className={styles["basket-wrapper"]}>
      <div className={styles["left-side"]}>
        <div className={styles["basket-items-wrapper"]}>
          <div className={styles["basket-header"]}>
            <Button>Clear Shopping Cart</Button>
          </div>
          {productInBasket.map((product) => (
            <div
              key={product.id}
              className={styles["basket-item-wrapper"]}
            >
              <BasketProductCard product={product} />
              <BasketProductQuantity />
              <BasketProductPrice product={product} />
              <IconButton
                aria-label="delete"
                sx={{ height: "max-content" }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
      </div>
      <div className={styles["right-side"]}>
        <div className={styles["sticky-container"]}>
          <div className={styles["subtotal-promo-code"]}>
            <BasketTotalCost products={productInBasket} />
            <BasketPromoCodeField />
          </div>
        </div>
      </div>
    </div>
  );
}
