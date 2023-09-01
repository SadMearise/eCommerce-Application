import React from "react";

export interface IRadioButtonsGroupProps {
  label: string;
  fields: string[];
  setFilterValues: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
