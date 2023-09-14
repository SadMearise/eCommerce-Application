import { Cart } from "@commercetools/platform-sdk";
import { CountryCode, StatusCodes } from "../models/types";
import getAnonymousApiRoot from "./AnonymousClient";

export async function getActiveCart(): Promise<false | Cart> {
  const rootApi = getAnonymousApiRoot();

  try {
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
  const rootApi = getAnonymousApiRoot();

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

export async function addProductToCart(cartId: string, cartVersion: number, productId: string) {
  const rootApi = getAnonymousApiRoot();

  await rootApi
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
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
}
