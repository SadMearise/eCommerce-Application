import { Attribute, ProductVariant } from "@commercetools/platform-sdk/";
import { Attributes, Sizes } from "./types";

function findAttributeByName(attributes: Attribute[], attributeName: string) {
  return attributes.find((attr) => attr.name.endsWith(attributeName))?.value.toUpperCase();
}

function sizeStringToNumber(variant: ProductVariant): number {
  const attrSizeValue = findAttributeByName(variant?.attributes ?? [], Attributes.Size);
  return +Sizes[attrSizeValue] || -1;
}

export default sizeStringToNumber;
