import {
  Cart,
  CartAddDiscountCodeAction,
  CartChangeLineItemQuantityAction,
  CartRemoveLineItemAction,
  ClientResponse,
} from "@commercetools/platform-sdk";
import getApiRoot from "./BuildClient";

const apiRoot = getApiRoot();

export function getShoppingCart() {
  return apiRoot.me().carts().get().execute();
}

export function cartChangeItemQuantity(cartId: string, version: number, itemId: string, quantity: number) {
  const cartChangetemQuantityAction: CartChangeLineItemQuantityAction = {
    action: "changeLineItemQuantity",
    lineItemId: itemId,
    quantity,
  };

  return apiRoot
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [cartChangetemQuantityAction],
      },
    })
    .execute();
}

export function cartDeleteItem(cartId: string, version: number, itemId: string) {
  const cartRemoveItemAction: CartRemoveLineItemAction = {
    action: "removeLineItem",
    lineItemId: itemId,
  };

  return apiRoot
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [cartRemoveItemAction],
      },
    })
    .execute();
}

export function getDiscount() {
  return apiRoot.discountCodes().get().execute();
}
export function cartAddDiscount(cartId: string, version: number, code: string): Promise<ClientResponse<Cart>> {
  const cartAddDiscountAction: CartAddDiscountCodeAction = {
    action: "addDiscountCode",
    code,
  };

  return apiRoot
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [cartAddDiscountAction],
      },
    })
    .execute();
}

export function deleteShoppingCart(cartId: string, version: number) {
  return apiRoot.carts().withId({ ID: cartId }).delete({ queryArgs: { version } }).execute();
}
