import {
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
  ProductProjectionPagedSearchResponse,
  ProductType,
  ProductTypePagedQueryResponse,
} from "@commercetools/platform-sdk";
import getApiRoot from "./BuildClient";
import { StatusCodes } from "../models/types";
import { TQueryArgs } from "../pages/catalog/types";

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

export async function getProductTypes(): Promise<ProductTypePagedQueryResponse> {
  const productTypesResp = await getApiRoot().productTypes().get().execute();
  const productTypes = productTypesResp.body;

  return productTypes;
}

export async function getSearchProductProjections(
  queryArgs: TQueryArgs
): Promise<ProductProjectionPagedSearchResponse> {
  // eslint-disable-next-line newline-per-chained-call
  const productsResp = await getApiRoot().productProjections().search().get({ queryArgs }).execute();
  const products = productsResp.body;

  return products;
}

export async function getProducts(): Promise<ClientResponse<ProductProjectionPagedQueryResponse>> {
  const product = await getApiRoot().productProjections().get().execute();
  return product;
}
