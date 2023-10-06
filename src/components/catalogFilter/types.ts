import React from "react";
import { TPriceSliderDefaultValues } from "../../pages/catalog/types";
import { TCatalogFilterValues } from "../../models/types";

export interface ICatalogFilterProps {
  setPriceSliderValues: React.Dispatch<React.SetStateAction<TPriceSliderDefaultValues>>;
  priceSliderDefaultValues: TPriceSliderDefaultValues;
  setFilterValues: React.Dispatch<React.SetStateAction<TCatalogFilterValues>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export type TAttributeValue = {
  key: string;
  label: string | Record<string, string>;
};
