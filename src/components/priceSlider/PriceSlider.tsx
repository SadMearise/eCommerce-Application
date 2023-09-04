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
  priceSliderState,
  setPriceSliderState,
}: IPriceSliderProps) {
  const [value, setValue] = useState<TPriceSliderDefaultValues>(priceSliderDefaultValues);

  useEffect(() => {
    setPriceSliderValues(value);
  }, [value, setPriceSliderValues]);

  const handleChange = (newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    const { min, max }: { min: number; max: number } = value;

    const newMinMax = {
      min: activeThumb === 0 || activeThumb === 2 ? Math.min(newValue[0], max - minDistance) : min,
      max: activeThumb === 1 || activeThumb === 2 ? Math.max(newValue[1], min + minDistance) : max,
    };

    setValue(newMinMax);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleChange([0, 100], 2);
    setPriceSliderState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceSliderState]);

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Price</FormLabel>
      <Slider
        size="small"
        getAriaLabel={() => "Minimum distance"}
        value={[value.min, value.max]}
        onChange={(_event, newValues, activeThumb) => {
          handleChange(newValues, activeThumb);
        }}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        min={0}
        max={100}
        step={minDistance}
      />
    </FormControl>
  );
}
