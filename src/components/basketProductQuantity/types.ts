import { LineItem } from "@commercetools/platform-sdk";

export interface BasketProductQuantityProps {
  product: LineItem;
  shoppingCartVersion: number;
  cartId: string;
  handleUpdateShoppingCart: () => void;
}
