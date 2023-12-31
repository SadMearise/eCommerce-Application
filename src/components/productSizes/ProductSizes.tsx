import getAttributeLabel from "../../utils/getAttributeLabel";
import sizeStringToNumber from "../../utils/sizeStringToNumber";
import { Attributes } from "../../utils/types";
import IProductSizesProps from "./types";

function ProductSizes({ product }: IProductSizesProps) {
  return (
    <p>
      <b>Sizes: </b>
      {product.variants
        .concat([product.masterVariant])
        .sort((a, b) => sizeStringToNumber(a) - sizeStringToNumber(b))
        .map((variant) => (
          <span key={variant.id}>
            {getAttributeLabel(variant.attributes?.find((attr) => attr.name.endsWith(Attributes.Size)))}
            &nbsp;
          </span>
        ))}
    </p>
  );
}

export default ProductSizes;
