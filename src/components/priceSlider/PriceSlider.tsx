import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { TPriceSliderDefaultValues } from "../../pages/catalog/types";
import { IPriceSliderProps } from "./types";

function valuetext(value: number) {
  return `${value}$`;
}

const minDistance = 5;

export default function PriceSlider({
  setPriceSliderValues,
  priceSliderDefaultValues,
  setCurrentPage,
}: IPriceSliderProps) {
  const [value, setValue] = useState<TPriceSliderDefaultValues>(priceSliderDefaultValues);

  useEffect(() => {
    setPriceSliderValues(value);
  }, [value, setPriceSliderValues]);

  const handleChange = (_event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue({ min: Math.min(newValue[0], value.max - minDistance), max: value.max });
    } else {
      setValue({ min: value.min, max: Math.max(newValue[1], value.min + minDistance) });
    }

    setCurrentPage(1);
  };

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Price</FormLabel>
      <Slider
        size="small"
        getAriaLabel={() => "Minimum distance"}
        value={[value.min, value.max]}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        min={priceSliderDefaultValues.min}
        max={priceSliderDefaultValues.max}
        step={minDistance}
      />
    </FormControl>
  );
}
