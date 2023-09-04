import React from "react";
import { TCatalogFilterValues } from "../../../models/types";

export interface IRadioButtonsGroupProps {
  label: string;
  fields: string[];
  setFilterValues: React.Dispatch<React.SetStateAction<TCatalogFilterValues>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
