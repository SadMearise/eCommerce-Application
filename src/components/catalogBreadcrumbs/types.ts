import React from "react";
import { TCategories } from "../../pages/catalog/types";

export interface ICatalogBreadcrumbsProps {
  setCategoriesBreadcrumbs: React.Dispatch<React.SetStateAction<TCategories[]>>;
  breadcrumbs: TCategories[];
  setCurrentId: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
