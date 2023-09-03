import React from "react";
import { TCategories } from "../../pages/catalog/types";

export interface ICatalogBreadcrumbsProps {
  setCategoriesBreadcrumbs: React.Dispatch<React.SetStateAction<TCategories[]>>;
  categories: TCategories[];
  setCategories: React.Dispatch<React.SetStateAction<TCategories[]>>;
  currentId: string;
  setCurrentId: React.Dispatch<React.SetStateAction<string>>;
}
