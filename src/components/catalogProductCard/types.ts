import { Cart, ProductProjection } from "@commercetools/platform-sdk";

export interface IProductCardProps {
  product: ProductProjection;
  url: string;
  cart: false | Cart;
}
