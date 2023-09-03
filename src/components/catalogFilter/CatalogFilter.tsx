import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import PriceSlider from "../priceSlider/PriceSlider";
import styles from "./CatalogFilter.module.scss";
import RadioButtonsGroup from "./radioGroup/RadioButtonsGroup";
import { ICatalogFilterProps } from "./types";

export default function CatalogFilter({
  setPriceSliderValues,
  priceSliderDefaultValues,
  setFilterValues,
  setCurrentPage,
  apiRoot,
}: ICatalogFilterProps) {
  const [filterInitValues, setFilterInitValues] = useState<Record<string, string[]>>({});
  const [priceSliderState, setPriceSliderState] = useState(false);

  useEffect(() => {
    apiRoot
      .productTypes()
      .get()
      .execute()
      .then((response) => {
        response.body.results?.forEach((result) => {
          if (!result.attributes) {
            return;
          }

          result.attributes?.forEach((attribute) => {
            if (!Object.prototype.hasOwnProperty.call(attribute.type, "values")) {
              return;
            }

            if (!Object.prototype.hasOwnProperty.call(filterInitValues, attribute.name)) {
              setFilterInitValues((prev) => ({
                ...prev,
                [attribute.name]: [],
              }));
            }

            const { type } = attribute;

            if (type?.name !== "enum") {
              return;
            }

            type.values.forEach((value: { key: string; label: string }) => {
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
    <form
      className={styles["filter-content"]}
      id="test"
    >
      <Typography variant="h6">Filter</Typography>
      <PriceSlider
        setPriceSliderValues={setPriceSliderValues}
        priceSliderDefaultValues={priceSliderDefaultValues}
        setCurrentPage={setCurrentPage}
        priceSliderState={priceSliderState}
        setPriceSliderState={setPriceSliderState}
      />
      <div className={styles["radio-buttons-group"]}>
        {Object.keys(filterInitValues).map((key) => (
          <RadioButtonsGroup
            key={key}
            label={key}
            fields={filterInitValues[key]}
            setFilterValues={setFilterValues}
            setCurrentPage={setCurrentPage}
          />
        ))}
      </div>
      <Button
        variant="contained"
        type="reset"
        onClick={(event) => {
          const target = event.target as HTMLInputElement;

          (target.previousSibling as HTMLElement).querySelectorAll("input").forEach((input) => {
            input.checked = false;
          });
          setFilterValues({});
          setPriceSliderState(true);
        }}
      >
        Reset filter
      </Button>
    </form>
  );
}
