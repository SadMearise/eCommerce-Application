import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import PriceSlider from "../priceSlider/PriceSlider";
import styles from "./CatalogFilter.module.scss";
import RadioButtonsGroup from "./radioGroup/RadioButtonsGroup";
import { TPriceSliderDefaultValues } from "../../pages/catalog/types";
import getApiRoot from "../../services/BuildClient";

export default function CatalogFilter({
  setPriceSliderValues,
  priceSliderDefaultValues,
  setFilterValues,
}: {
  setPriceSliderValues: React.Dispatch<React.SetStateAction<TPriceSliderDefaultValues>>;
  priceSliderDefaultValues: TPriceSliderDefaultValues;
  setFilterValues: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
}) {
  const [filterInitValues, setFilterInitValues] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const apiRoot = getApiRoot();

    apiRoot
      .productTypes()
      .get()
      .execute()
      .then((response) => {
        response.body.results.forEach((result) => {
          if (!result.attributes) {
            return;
          }

          result.attributes.forEach((attribute) => {
            if (!Object.prototype.hasOwnProperty.call(attribute.type, "values")) {
              return;
            }

            if (!Object.prototype.hasOwnProperty.call(filterInitValues, attribute.name)) {
              setFilterInitValues((prev) => ({
                ...prev,
                [attribute.name]: [],
              }));
            }
            // @ts-expect-error: Unreachable code error
            attribute.type.values.forEach((value: { key: string; label: string }) => {
              setFilterInitValues((prev) => {
                if (prev[attribute.name].includes(value.label)) {
                  return prev;
                }

                return {
                  ...prev,
                  [attribute.name]: [...prev[attribute.name as keyof typeof prev], value.label],
                };
              });
            });
          });
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      {Object.keys(filterInitValues).map((key, id) => (
        <RadioButtonsGroup
          // eslint-disable-next-line react/no-array-index-key
          key={id}
          label={key}
          fields={filterInitValues[key]}
          setFilterValues={setFilterValues}
        />
      ))}
    </Paper>
  );
}
