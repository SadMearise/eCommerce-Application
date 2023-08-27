import { ProductVariant } from "@commercetools/platform-sdk/";
import Sizes from "./types";

function sizeStringToNumber(variant: ProductVariant): number {
  const attrSizeValue = variant.attributes?.find((x) => x.name.endsWith("size"))?.value.toUpperCase();
  switch (attrSizeValue) {
    case Sizes.XS:
      return 0;
    case Sizes.S:
      return 1;
    case Sizes.M:
      return 2;
    case Sizes.L:
      return 3;
    case Sizes.XL:
      return 4;
    case Sizes.XXL:
      return 5;
    case Sizes["3XL"]:
      return 5;
    default:
      return -1;
  }
}

export default sizeStringToNumber;
