import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import React from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import { TFilterValues } from "../../../pages/catalog/types";

export default function RadioButtonsGroup({
  label,
  fields,
  setFilterValues,
}: {
  label: string;
  fields: string[];
  setFilterValues: React.Dispatch<React.SetStateAction<TFilterValues>>;
}) {
  return (
    <FormControl>
      <FormLabel id={`demo-radio-buttons-group-${label}`}>{label}</FormLabel>
      <FormGroup
        onChange={(event) => {
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
            setFilterValues((filterValues) => ({
              ...filterValues,
              [`${label.toLowerCase()}s`]: [
                ...filterValues[`${label.toLowerCase()}s` as keyof typeof filterValues],
                value,
              ],
            }));
          } else {
            setFilterValues((filterValues) => ({
              ...filterValues,
              [`${label.toLowerCase()}s`]: filterValues[`${label.toLowerCase()}s` as keyof typeof filterValues].filter(
                (el: string) => el !== value
              ),
            }));
          }
        }}
      >
        {fields.map((field, id) => (
          <FormControlLabel
            // eslint-disable-next-line react/no-array-index-key
            key={id}
            control={<Checkbox />}
            label={field}
            data-value={field.toLowerCase()}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}
