import { Button, Checkbox, FormControlLabel, FormGroup, MenuItem, TextField } from "@mui/material";
import { BaseAddress } from "@commercetools/platform-sdk";
import { useFormik } from "formik";
import { useState } from "react";
import countriesSet from "../../../../countries";
import styles from "./AddAddress.module.scss";
import { addressValidationSchema } from "../../../../utils/registerValidationSchema";
import { AddAddressProps } from "../../types";

export default function AddAddress({
  id,
  version,
  handleAddAddress,
  handleCheckboxChange,
  checkboxesState,
}: AddAddressProps) {
  const [isCountrySelected, setIsCountrySelected] = useState(false);
  const formik = useFormik<BaseAddress>({
    initialValues: {
      country: "",
      city: "",
      streetName: "",
      streetNumber: "",
      postalCode: "",
    },
    validationSchema: addressValidationSchema,
    onSubmit: async (values) => {
      handleAddAddress(id, version, values, checkboxesState);
    },
  });
  const areAllCheckboxesFalse = Object.values(checkboxesState).every((value) => value === false);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles["address-field-container"]}>
        <TextField
          id="shipping-country-input"
          className={styles["half-width-field"]}
          select
          name="country"
          label="Country:"
          value={formik.values.country}
          onChange={(e) => {
            formik.handleChange(e);
            setIsCountrySelected(true);
          }}
          onBlur={formik.handleBlur}
        >
          {Array.from(countriesSet).map((country) => (
            <MenuItem
              key={country}
              value={country}
            >
              {country}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="shipping-city-input"
          className={styles["half-width-field"]}
          name="city"
          label="City:"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={
            formik.touched.city &&
            Boolean(formik.errors.city) &&
            "Must contain at least one character and no special characters or numbers, may contain only english letters"
          }
          disabled={!isCountrySelected}
        />
        <TextField
          id="shipping-street-name-input"
          className={styles["half-width-field"]}
          name="streetName"
          label="Street name:"
          value={formik.values.streetName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.streetName && Boolean(formik.errors.streetName)}
          helperText={
            formik.touched.streetName &&
            Boolean(formik.errors.streetName) &&
            "Must contain at least one character and no special characters or numbers, may contain only english letters"
          }
          disabled={!isCountrySelected}
        />
        <TextField
          id="shipping-street-number-input"
          className={styles["half-width-field"]}
          name="streetNumber"
          label="Street number:"
          value={formik.values.streetNumber}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={formik.touched.streetNumber && Boolean(formik.errors.streetNumber)}
          helperText={
            formik.touched.streetNumber &&
            Boolean(formik.errors.streetNumber) &&
            "Must contain at least one digit and should only be digits"
          }
          disabled={!isCountrySelected}
        />
        <TextField
          id="shipping-postal-code-input"
          className={styles["full-width-field"]}
          name="postalCode"
          label="Postal code:"
          value={formik.values.postalCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
          helperText={
            formik.touched.postalCode &&
            Boolean(formik.errors.postalCode) &&
            "Must follow the format for the country (e.g., 220022 for the Russia)"
          }
          disabled={!isCountrySelected}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={!formik.dirty || !formik.isValid || areAllCheckboxesFalse}
        >
          add address
        </Button>
      </div>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox />}
          label="Set as Billing address"
          onChange={() => handleCheckboxChange("billing")}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Set as Shipping address"
          onChange={() => handleCheckboxChange("shipping")}
        />
        <FormControlLabel
          control={<Checkbox />}
          disabled={!checkboxesState.billing}
          label="Set as default Billing address"
          onChange={() => handleCheckboxChange("defaultBilling")}
        />
        <FormControlLabel
          control={<Checkbox />}
          disabled={!checkboxesState.shipping}
          label="Set as default Shipping address"
          onChange={() => handleCheckboxChange("defaultShipping")}
        />
      </FormGroup>
    </form>
  );
}
