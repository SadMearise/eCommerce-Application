import { Button, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import { BaseAddress } from "@commercetools/platform-sdk";
import styles from "../../ProfileComponent.module.scss";
import getCountryNameByCode from "../../../../utils/getCountryNameFromCode";
import { AddressFieldProps } from "../../types";
import { extractAddressProperties } from "../../../../utils/extractAddresses";
import countriesSet from "../../../../countries";
import { addressValidationSchema } from "../../../../utils/registerValidationSchema";
import { updateCustomerInfo } from "../../../../services/customerService";
import AlertView from "../../../alertView/AlertView";

export default function AddressField({
  userId,
  addressVersion,
  addressType,
  addressData,
  handleReadOnlyClick,
}: AddressFieldProps) {
  const [isChangingInfo, setIsChangingInfo] = useState(false);
  const [isChangingSuccessful, setIsChangingSuccessful] = useState(false);
  const handleChangingInfoClick = () => setIsChangingInfo(!isChangingInfo);
  const handleChangingSuccessfulStatus = () => {
    setIsChangingSuccessful(true);

    setTimeout(() => setIsChangingSuccessful(false), 2000);
  };
  const addressProperties = extractAddressProperties(addressData);

  const formik = useFormik<BaseAddress>({
    initialValues: {
      country: getCountryNameByCode(addressProperties.country),
      city: addressProperties.city,
      streetName: addressProperties.streetName,
      streetNumber: addressProperties.streetNumber,
      postalCode: addressProperties.postalCode,
    },
    validationSchema: addressValidationSchema,
    onSubmit: (values) =>
      updateCustomerInfo(userId, addressVersion, addressProperties.id as string, values).then(
        () => handleChangingSuccessfulStatus()
        // eslint-disable-next-line function-paren-newline
      ),
  });

  return (
    <div className={styles["personal-data"]}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isChangingInfo) {
            formik.handleSubmit(e);
          }
        }}
      >
        <div className={styles["personal-data-title"]}>
          <h2>{addressType}</h2>
          <Button
            onClick={handleChangingInfoClick}
            type="submit"
            disabled={Boolean(!formik.isValid)}
          >
            {isChangingInfo ? "save details" : "change details"}
          </Button>
        </div>
        <div className={styles["flex-container"]}>
          <TextField
            id="shipping-country-input"
            className={styles["half-width-field"]}
            name="country"
            select={isChangingInfo}
            label="Country:"
            value={formik.values.country}
            onChange={formik.handleChange}
            variant={isChangingInfo ? "standard" : "outlined"}
            InputProps={{
              onMouseDown: !isChangingInfo ? handleReadOnlyClick : undefined,
            }}
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
            variant={isChangingInfo ? "standard" : "outlined"}
            onBlur={formik.handleBlur}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={
              formik.touched.city &&
              Boolean(formik.errors.city) &&
              "Must contain at least one character and no special characters or numbers, may contain only english letters"
            }
            InputProps={{
              onMouseDown: !isChangingInfo ? handleReadOnlyClick : undefined,
            }}
          />
          <TextField
            id="shipping-street-name-input"
            className={styles["half-width-field"]}
            name="streetName"
            label="Street name:"
            value={formik.values.streetName}
            onChange={formik.handleChange}
            variant={isChangingInfo ? "standard" : "outlined"}
            onBlur={formik.handleBlur}
            error={formik.touched.streetName && Boolean(formik.errors.streetName)}
            helperText={
              formik.touched.streetName &&
              Boolean(formik.errors.streetName) &&
              "Must contain at least one character and no special characters or numbers, may contain only english letters"
            }
            InputProps={{
              onMouseDown: !isChangingInfo ? handleReadOnlyClick : undefined,
            }}
          />
          <TextField
            id="shipping-street-number-input"
            className={styles["half-width-field"]}
            name="streetNumber"
            label="Street number:"
            value={formik.values.streetNumber}
            onChange={formik.handleChange}
            variant={isChangingInfo ? "standard" : "outlined"}
            onBlur={formik.handleBlur}
            error={formik.touched.streetNumber && Boolean(formik.errors.streetNumber)}
            helperText={
              formik.touched.streetNumber &&
              Boolean(formik.errors.streetNumber) &&
              "Must contain at least one digit and should only be digits"
            }
            InputProps={{
              onMouseDown: !isChangingInfo ? handleReadOnlyClick : undefined,
            }}
          />
          <TextField
            id="shipping-postal-code-input"
            className={styles["full-width-field"]}
            name="postalCode"
            label="Postal code:"
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            variant={isChangingInfo ? "standard" : "outlined"}
            onBlur={formik.handleBlur}
            error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
            helperText={
              formik.touched.postalCode &&
              Boolean(formik.errors.postalCode) &&
              "Must follow the format for the country (e.g., 220022 for the Russia)"
            }
            InputProps={{
              onMouseDown: !isChangingInfo ? handleReadOnlyClick : undefined,
            }}
          />
        </div>
      </form>
      {isChangingSuccessful && (
        <AlertView
          variant="filled"
          textContent="Changes were successful"
        />
      )}
    </div>
  );
}
