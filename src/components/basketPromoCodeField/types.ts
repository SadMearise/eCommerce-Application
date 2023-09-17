import { DiscountCodeInfo } from "@commercetools/platform-sdk";

export interface BasketPromoCodeFieldProps {
  shoppingCartID: string;
  shoppingCartVersion: number;
  shoppingCartDiscountCodes: DiscountCodeInfo[];
  handleUpdateShoppingCart: () => void;
}
