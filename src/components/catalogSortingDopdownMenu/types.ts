import React from "react";
import { TSortValues } from "../../pages/catalog/types";

export type TSortingOptions = {
  label: string;
  method: string;
  key: string;
};

export interface ICatalogSortingDopdownMenuProps {
  setSortValues: React.Dispatch<React.SetStateAction<TSortValues>>;
}
