import React from "react";
import { TPriceSliderDefaultValues } from "../../pages/catalog/types";

export interface IPriceSliderProps {
  setPriceSliderValues: React.Dispatch<React.SetStateAction<TPriceSliderDefaultValues>>;
  priceSliderDefaultValues: TPriceSliderDefaultValues;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  priceSliderState: boolean;
  setPriceSliderState: React.Dispatch<React.SetStateAction<boolean>>;
}
