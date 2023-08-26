import { ProductProjection } from "@commercetools/platform-sdk";
import getApiRoot from "./BuildClient";
import StatusCodes from "../types";

async function getProductByKey(key: string): Promise<ProductProjection> {
  // eslint-disable-next-line newline-per-chained-call
  const productResp = await getApiRoot().productProjections().withKey({ key }).get().execute();

  if (productResp.statusCode !== StatusCodes.Ok) {
    throw new Error("Server error");
  }

  const product = productResp.body;
  return product;
}

export default getProductByKey;
