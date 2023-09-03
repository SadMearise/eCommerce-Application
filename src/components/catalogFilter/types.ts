import React from "react";
// eslint-disable-next-line import/no-unresolved
import { ByProjectKeyRequestBuilder } from "@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder";
import { TPriceSliderDefaultValues } from "../../pages/catalog/types";

type TGroup = {
  name: string;
  values: string[];
};

export type TGroups = {
  brands: TGroup;
  colors: TGroup;
  sizes: TGroup;
};

export interface ICatalogFilterProps {
  setPriceSliderValues: React.Dispatch<React.SetStateAction<TPriceSliderDefaultValues>>;
  priceSliderDefaultValues: TPriceSliderDefaultValues;
  setFilterValues: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  apiRoot: ByProjectKeyRequestBuilder;
}
