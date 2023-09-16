import { Cart, CartRemoveLineItemAction } from "@commercetools/platform-sdk";
import { CountryCode, StatusCodes } from "../models/types";
import getAnonymousApiRoot from "./AnonymousClient";
import tokenCache from "./TokenCash";

const rootApi = getAnonymousApiRoot();

export async function getActiveCart(): Promise<false | Cart> {
  try {
    if (!tokenCache.hasValidToken()) {
      return false;
    }

    const activeCartResp = await rootApi.me().activeCart().get().execute();

    const cart = activeCartResp.body;

    return cart;
  } catch (err) {
    if (typeof err === "object" && err && "statusCode" in err && typeof err.statusCode === "number") {
      if (err.statusCode === StatusCodes.Code404) {
        return false;
      }
    }
  }

  return false;
}

export async function createCart() {
  const cartResp = await rootApi
    .me()
    .carts()
    .post({
      body: {
        currency: "EUR",
        country: CountryCode.Georgia,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
    .execute();

  const cart = cartResp.body;

  return cart;
}

export async function addProductToCart(cartId: string, version: number, productId: string) {
  const updatedCartResp = await rootApi
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [
          {
            action: "addLineItem",
            productId,
            quantity: 1,
          },
        ],
      },
    })
    .execute();

  const updatedCart = updatedCartResp.body;

  return updatedCart;
}

export async function cartDeleteItem(cartId: string, version: number, productId: string) {
  const CartRemoveItemAction: CartRemoveLineItemAction = {
    action: "removeLineItem",
    lineItemId: productId,
    quantity: 1,
  };

  const updatedCartResp = await rootApi
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: [CartRemoveItemAction],
      },
    })
    .execute();

  const updatedCart = updatedCartResp.body;

  return updatedCart;
}
