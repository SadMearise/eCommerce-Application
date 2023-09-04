import { Attribute } from "@commercetools/platform-sdk/";

export default function getAttributeLabel(attribute?: Attribute): string {
  if (!attribute) return "";
  return attribute?.value?.label ?? attribute?.value;
}
