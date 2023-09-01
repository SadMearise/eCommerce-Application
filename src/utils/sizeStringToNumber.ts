import { Attribute, ProductVariant } from "@commercetools/platform-sdk/";
import { Attributes, Sizes } from "./types";
import getAttributeLabel from "./getAttributeLabel";

function findAttributeByName(attributes: Attribute[], attributeName: string) {
  return attributes.find((attr) => attr.name.endsWith(attributeName));
}

function sizeStringToNumber(variant: ProductVariant): number {
  const sizeAttr = findAttributeByName(variant?.attributes ?? [], Attributes.Size);
  const attrSizeValue = getAttributeLabel(sizeAttr);
  return +Sizes[attrSizeValue as unknown as Sizes] || -1;
}

export default sizeStringToNumber;
