import React from "react";
// eslint-disable-next-line import/no-unresolved
import { ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder";
import { TCategories } from "../../pages/catalog/types";

export interface ICatalogBreadcrumbsProps {
  setCategoriesBreadcrumbs: React.Dispatch<React.SetStateAction<TCategories[]>>;
  categories: TCategories[];
  setCategories: React.Dispatch<React.SetStateAction<TCategories[]>>;
  currentId: string;
  setCurrentId: React.Dispatch<React.SetStateAction<string>>;
  apiRoot: ByProjectKeyRequestBuilder;
}
