import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { TSetPriceSliderValues } from "./types";

function valuetext(value: number) {
  return `${value}$`;
}

const minDistance = 5;

export default function PriceSlider({
  setPriceSliderValues,
  priceSliderDefaultValues,
}: {
  setPriceSliderValues: TSetPriceSliderValues;
  priceSliderDefaultValues: number[];
}) {
  const [value, setValue] = useState<number[]>(priceSliderDefaultValues);

  useEffect(() => {
    setPriceSliderValues(value);
  }, [value, setPriceSliderValues]);

  const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Price</FormLabel>
      <Slider
        size="small"
        getAriaLabel={() => "Minimum distance"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        min={0}
        max={200}
        step={minDistance}
      />
    </FormControl>
  );
}
