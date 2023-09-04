import { ProductProjection, ProductType } from "@commercetools/platform-sdk/";

interface IProductAttributesProps {
  product: ProductProjection;
  productType: ProductType | undefined;
}

export default IProductAttributesProps;
