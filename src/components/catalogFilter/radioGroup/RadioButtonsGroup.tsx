import React, { ChangeEvent, useRef } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import { IRadioButtonsGroupProps } from "./types";
import { setUpperCaseFirstSymbol } from "../../../utils/textTransform";
import styles from "./RadioButtonGroup.module.scss";

export default function RadioButtonsGroup({ label, fields, setFilterValues, setCurrentPage }: IRadioButtonsGroupProps) {
  const refs = useRef([...new Array(fields.length)].map(() => React.createRef<HTMLInputElement>()));

  const handleFormGroup = ({ target: { id, value } }: ChangeEvent<HTMLInputElement>) => {
    const inputNode = refs.current[Number(id)].current;

    if (inputNode && inputNode.checked) {
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
    <FormControl className={styles["form-control"]}>
      <FormLabel id={`demo-radio-buttons-group-${label}`}>{setUpperCaseFirstSymbol(label)}</FormLabel>
      <FormGroup onChange={handleFormGroup}>
        {fields.map((field, i) => (
          <label
            className={styles["control-label"]}
            htmlFor={field}
            key={field}
          >
            <input
              ref={refs.current[i]}
              type="checkbox"
              id={String(i)}
              value={field}
            />
            {field}
          </label>
        ))}
      </FormGroup>
    </FormControl>
  );
}
