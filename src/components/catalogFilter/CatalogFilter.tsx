import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PriceSlider from "../priceSlider/PriceSlider";
import styles from "./CatalogFilter.module.scss";
import { TSetPriceSliderValues } from "./types";
import RadioButtonsGroup from "./radioGroup/RadioButtonsGroup";

export default function CatalogFilter({
  setPriceSliderValues,
  priceSliderDefaultValues,
}: {
  setPriceSliderValues: TSetPriceSliderValues;
  priceSliderDefaultValues: number[];
}) {
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
      <RadioButtonsGroup
        label="Brand"
        fields={["1", "2"]}
      />
      <RadioButtonsGroup
        label="Color"
        fields={["1", "2"]}
      />
      <RadioButtonsGroup
        label="Size"
        fields={["1", "2"]}
      />
    </Paper>
  );
}
