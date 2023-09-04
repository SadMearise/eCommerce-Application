import { CategoryPagedQueryResponse } from "@commercetools/platform-sdk";
import getApiRoot from "./BuildClient";

export default async function getCategories(queryArgs: {
  queryArgs: { expand: string };
}): Promise<CategoryPagedQueryResponse> {
  const categoriesResp = await getApiRoot().categories().get(queryArgs).execute();
  const categories = categoriesResp.body;

  return categories;
}
