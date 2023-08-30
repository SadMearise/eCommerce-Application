import { ProductProjection, ProductType } from "@commercetools/platform-sdk";
import getApiRoot from "./BuildClient";
import { StatusCodes } from "../models/types";

export async function getProductByKey(key: string): Promise<ProductProjection> {
  // eslint-disable-next-line newline-per-chained-call
  const productResp = await getApiRoot().productProjections().withKey({ key }).get().execute();

  if (productResp.statusCode !== StatusCodes.Ok) {
    throw new Error("Server error");
  }
  const product = productResp.body;
  return product;
}

export async function getProductTypeById(id: string): Promise<ProductType> {
  // eslint-disable-next-line newline-per-chained-call
  const productTypeResp = await getApiRoot().productTypes().withId({ ID: id }).get().execute();
  const productType = productTypeResp.body;
  return productType;
}
