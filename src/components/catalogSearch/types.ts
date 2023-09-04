import React from "react";

export type TSetInputValue = (data: string) => void;

export interface ICatalogSearchProps {
  setSearchInputValue: TSetInputValue;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
