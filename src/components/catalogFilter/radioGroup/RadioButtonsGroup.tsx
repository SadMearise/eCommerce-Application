import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import { IRadioButtonsGroupProps } from "./types";

export default function RadioButtonsGroup({ label, fields, setFilterValues, setCurrentPage }: IRadioButtonsGroupProps) {
  const handleFormGroup = (event: React.FormEvent<HTMLDivElement>) => {
    const target = event.target as HTMLInputElement;

    if (!(target instanceof HTMLElement)) {
      return;
    }
    const changedElement = target.closest("[data-value]");

    if (!changedElement || !(changedElement instanceof HTMLElement)) {
      return;
    }
    const { value } = changedElement.dataset;

    if (target.checked) {
      // @ts-expect-error: Unreachable code error
      setFilterValues((filterValues) => {
        if (!Object.prototype.hasOwnProperty.call(filterValues, label)) {
          return {
            ...filterValues,
            [label]: [value],
          };
        }

        return {
          ...filterValues,
          [label]: [...filterValues[label], value],
        };
      });
    } else {
      setFilterValues((filterValues) => ({
        ...filterValues,
        [label]: filterValues[label].filter((el: string) => el !== value),
      }));
    }

    setCurrentPage(1);
  };

  return (
    <FormControl>
      <FormLabel id={`demo-radio-buttons-group-${label}`}>{label}</FormLabel>
      <FormGroup onChange={(event) => handleFormGroup(event)}>
        {fields.map((field, id) => (
          <FormControlLabel
            // eslint-disable-next-line react/no-array-index-key
            key={id}
            control={<Checkbox />}
            label={field}
            data-value={field}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
