import { ProductProjection } from "@commercetools/platform-sdk/";
import Prices from "../pages/product/types";
import locale from "../settings";

function getPrice(product: ProductProjection, type: Prices) {
  if (!product?.masterVariant?.prices?.length) {
    return "";
  }

  let price = product.masterVariant.prices[0].value;
  if (type === Prices.Current && product.masterVariant.prices[0].discounted) {
    price = product.masterVariant.prices[0].discounted.value;
  }

  const { centAmount, currencyCode } = price;
  return (centAmount / 100).toLocaleString(locale, { style: "currency", currency: currencyCode });
}

export default getPrice;
