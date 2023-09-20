import { Cart } from "@commercetools/platform-sdk";

const isProductInCart = (cart: Cart, productId: string): boolean =>
  cart.lineItems.some((item) => item.productId === productId);

export default isProductInCart;
