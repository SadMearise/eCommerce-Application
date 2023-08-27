import { ProductProjection, ProductType } from "@commercetools/platform-sdk";
import getApiRoot from "./BuildClient";
import StatusCodes from "../types";

export async function getProductByKey(key: string): Promise<ProductProjection> {
  // eslint-disable-next-line newline-per-chained-call
  // const productType = await getApiRoot()
  //   .productTypes()
  //   .withId({ ID: "1560fed2-3628-4dbc-bfe6-62c1153bd41f" })
  //   .get()
  //   .execute();

  // eslint-disable-next-line newline-per-chained-call
  const productResp = await getApiRoot().productProjections().withKey({ key }).get().execute();

  // console.log("LOG", productType);
  if (productResp.statusCode !== StatusCodes.Ok) {
    throw new Error("Server error");
  }

  const product = productResp.body;
  return product;
}

export async function getProductTypeById(id: string): Promise<ProductType> {
  // eslint-disable-next-line newline-per-chained-call
  const productTypeResp = await getApiRoot().productTypes().withId({ ID: id }).get().execute();

  // eslint-disable-next-line newline-per-chained-call
  // const productResp = await getApiRoot().productProjections().withKey({ key }).get().execute();

  // console.log("LOG", productType);
  // if (productResp.statusCode !== StatusCodes.Ok) {
  //   throw new Error("Server error");
  // }

  const productType = productTypeResp.body;
  return productType;
}
