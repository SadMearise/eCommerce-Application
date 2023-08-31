import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React from "react";
import PriceSlider from "../priceSlider/PriceSlider";
import styles from "./CatalogFilter.module.scss";
import { TGroups } from "./types";
import RadioButtonsGroup from "./radioGroup/RadioButtonsGroup";
import { TFilterValues, TPriceSliderDefaultValues } from "../../pages/catalog/types";

export default function CatalogFilter({
  setPriceSliderValues,
  priceSliderDefaultValues,
  setFilterValues,
}: {
  setPriceSliderValues: React.Dispatch<React.SetStateAction<TPriceSliderDefaultValues>>;
  priceSliderDefaultValues: TPriceSliderDefaultValues;
  setFilterValues: React.Dispatch<React.SetStateAction<TFilterValues>>;
}) {
  const groups: TGroups = {
    brands: { name: "Brand", values: ["Kratkoe", "Ayumu", "Sadees"] },
    colors: { name: "Color", values: ["Black", "Gray", "White", "Red", "Blue", "Orange"] },
    sizes: { name: "Size", values: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"] },
  };

  return (
    <Paper
      className={styles["filter-content"]}
      elevation={0}
    >
      <Typography variant="h6">Filter</Typography>
      <PriceSlider
        setPriceSliderValues={setPriceSliderValues}
        priceSliderDefaultValues={priceSliderDefaultValues}
      />
      {Object.keys(groups).map((key, id) => (
        <RadioButtonsGroup
          // eslint-disable-next-line react/no-array-index-key
          key={id}
          label={groups[key as keyof typeof groups].name}
          fields={groups[key as keyof typeof groups].values}
          setFilterValues={setFilterValues}
        />
      ))}
    </Paper>
  );
}
