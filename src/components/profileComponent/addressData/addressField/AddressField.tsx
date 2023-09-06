import { Button, Checkbox, FormControlLabel, FormGroup, MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { BaseAddress } from "@commercetools/platform-sdk";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./AddressField.module.scss";
import getCountryNameByCode from "../../../../utils/getCountryNameFromCode";
import { AddressFieldProps, TouchedFieldsAddress } from "../../types";
import countriesSet from "../../../../countries";
import { addressValidationSchema } from "../../../../utils/registerValidationSchema";

export default function AddressField({
  userId,
  version,
  addressData,
  checkboxesState,
  isDefaultBillingAddress,
  isDefaultShippingAddress,
  handleReadOnlyClick,
  handleChangeAddress,
  handleDeleteAddress,
  handleCheckboxChange,
  resetCheckboxes,
}: AddressFieldProps) {
  const [isChangingInfo, setIsChangingInfo] = useState(false);
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [firstInputDone, setFirstInputDone] = useState(false);
  const [isDefaultBillingChecked, setIsDefaultBillingChecked] = useState(false);
  const [isDefaultShippingChecked, setIsDefaultShippingChecked] = useState(false);
  const handleChangingInfoClick = () => setIsChangingInfo(!isChangingInfo);

  const handleDefaultBillingChecking = () => {
    setIsDefaultBillingChecked(!isDefaultBillingChecked);
  };

  const handleDefaultShippingChecking = () => {
    setIsDefaultShippingChecked(!isDefaultShippingChecked);
  };

  const resetCheckboxesChildren = () => {
    setIsDefaultBillingChecked(false);
    setIsDefaultShippingChecked(false);
  };

  const formik = useFormik<BaseAddress>({
    initialValues: {
      country: getCountryNameByCode(addressData.country),
      city: addressData.city,
      streetName: addressData.streetName,
      streetNumber: addressData.streetNumber,
      postalCode: addressData.postalCode,
    },
    validationSchema: addressValidationSchema,
    onSubmit: (values) => {
      handleChangeAddress(userId, addressData.id as string, values, checkboxesState);
      resetCheckboxes();
      resetCheckboxesChildren();
    },
  });
  useEffect(() => {
    formik.setFieldValue("city", addressData.city);
    formik.setFieldValue("country", getCountryNameByCode(addressData.country));
    formik.setFieldValue("streetName", addressData.streetName);
    formik.setFieldValue("streetNumber", addressData.streetNumber);
    formik.setFieldValue("postalCode", addressData.postalCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressData]);

  useEffect(() => {
    if (firstInputDone && !formik.isSubmitting) {
      const touchedFields: TouchedFieldsAddress = {
        country: true,
        city: true,
        streetName: true,
        streetNumber: true,
        postalCode: true,
      };
      formik.setTouched(touchedFields);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstInputDone, formik.isSubmitting]);

  const handleFieldChange = (field: keyof TouchedFieldsAddress, value: string) => {
    formik.setFieldValue(field, value);
    if (!fieldsChanged) {
      setFieldsChanged(true);
      setFirstInputDone(true);
    }
  };

  return (
    <div className={styles["address-field-data"]}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isChangingInfo) {
            formik.handleSubmit(e);
          }
        }}
      >
        <div className={styles["address-field-title"]}>
          <h2>Address:</h2>
          <div>
            <IconButton
              aria-label="delete"
              onClick={() => {
                handleDeleteAddress(userId, version, addressData.id as string);
              }}
            >
              <DeleteIcon />
            </IconButton>
            <Button
              onClick={handleChangingInfoClick}
              type="submit"
              disabled={Boolean(!formik.isValid)}
            >
              {isChangingInfo ? "save details" : "change details"}
            </Button>
          </div>
        </div>
        <div className={styles["address-field-container"]}>
          <TextField
            id="shipping-country-input"
            className={styles["half-width-field"]}
            name="country"
            select={isChangingInfo}
            label="Country:"
            value={formik.values.country}
            onChange={(e) => handleFieldChange("country", e.target.value)}
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
            variant={isChangingInfo ? "standard" : "outlined"}
            label="City:"
            value={formik.values.city}
            onChange={(e) => handleFieldChange("city", e.target.value)}
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
            onChange={(e) => handleFieldChange("streetName", e.target.value)}
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
            onChange={(e) => handleFieldChange("streetNumber", e.target.value)}
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
            onChange={(e) => handleFieldChange("postalCode", e.target.value)}
            variant={isChangingInfo ? "standard" : "outlined"}
            onBlur={formik.handleBlur}
            error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
            helperText={
              formik.touched.postalCode &&
              Boolean(formik.errors.postalCode) &&
              (formik.values.country === "Russia"
                ? "Must follow the format for the country (e.g., 220022 for the Russia or Belarus)"
                : "Must follow the format for the country (e.g., 2200 for the Georgia)")
            }
            InputProps={{
              onMouseDown: !isChangingInfo ? handleReadOnlyClick : undefined,
            }}
          />
          <div>
            <FormGroup>
              {!isDefaultShippingAddress && (
                <FormControlLabel
                  disabled={!isChangingInfo}
                  control={<Checkbox />}
                  checked={isDefaultBillingChecked}
                  label="Set as default Billing address"
                  onChange={() => {
                    handleDefaultBillingChecking();
                    handleCheckboxChange("defaultBilling");
                  }}
                />
              )}
              {!isDefaultBillingAddress && (
                <FormControlLabel
                  disabled={!isChangingInfo}
                  control={<Checkbox />}
                  checked={isDefaultShippingChecked}
                  label="Set as default Shipping address"
                  onChange={() => {
                    handleDefaultShippingChecking();
                    handleCheckboxChange("defaultShipping");
                  }}
                />
              )}
            </FormGroup>
          </div>
        </div>
      </form>
    </div>
  );
}
