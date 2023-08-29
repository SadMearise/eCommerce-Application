import { AttributeDefinition } from "@commercetools/platform-sdk/";
import locale from "../../settings";
import { Attributes } from "../../utils/types";
import IProductAttributesProps from "./types";

function ProductAttributes({ product, productType }: IProductAttributesProps) {
  return (productType?.attributes ?? [])
    .filter((attrType) => !attrType.name.endsWith(Attributes.Size))
    .map((attrType: AttributeDefinition) => (
      <p key={attrType.name}>
        <b>{attrType.label[locale]}</b>
        <b>: </b>
        {product.masterVariant.attributes?.find((attr) => attr.name === attrType.name)?.value}
      </p>
    ));
}

export default ProductAttributes;
