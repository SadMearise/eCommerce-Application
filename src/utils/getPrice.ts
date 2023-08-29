import { Price, ProductProjection, TypedMoney } from "@commercetools/platform-sdk/";
import Prices from "../pages/product/types";
import locale from "../settings";
import cent from "./constants";

function formatPrice(price: TypedMoney): string {
  const { centAmount, currencyCode } = price;
  return (centAmount * cent).toLocaleString(locale, { style: "currency", currency: currencyCode });
}

function getCurrentPrice(price: Price, type: Prices): TypedMoney {
  return type === Prices.Current && price.discounted ? price.discounted.value : price.value;
}

function getPrice(product: ProductProjection, type: Prices): string {
  if (!product?.masterVariant?.prices?.length) {
    return "";
  }
  return formatPrice(getCurrentPrice(product.masterVariant.prices[0], type));
}

export default getPrice;
