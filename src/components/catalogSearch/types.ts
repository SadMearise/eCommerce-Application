import React from "react";

export type TSetInputValue = (data: string) => void;

export interface ICatalogSearchProps {
  setInputValue: TSetInputValue;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
