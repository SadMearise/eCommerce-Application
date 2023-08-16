/* eslint-disable operator-linebreak */
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import "dayjs/locale/en-gb";
import regValidationSchema from "../../utils/registerValidationSchema";
import countriesSet from "../../countries";
import styles from "./RegistrationForm.module.scss";
import createCustomer from "../../services/customerService";
import { ICustomer } from "../../models/types";
import updateAddressField from "../../utils/updateAddressFields";
import RouterPaths from "../../router/routes";

export default function RegistrationForm() {
  const minDateOfBirth = dayjs().subtract(13, "year").startOf("day");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isCountrySelected, setIsCountrySelected] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ show: false, message: "" });
  const [isDefaultShipping, setIsDefaultShipping] = useState(false);
  const [isDefaultBilling, setIsDefaultBilling] = useState(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const defaultAddress = {
    country: "",
    city: "",
    streetName: "",
    streetNumber: "",
    postalCode: "",
  };

  const formik = useFormik<ICustomer>({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      dateOfBirth: minDateOfBirth.format("YYYY-MM-DD"),
      address: { ...defaultAddress },
      defaultShippingAddress: false,
      defaultBillingAddress: false,
      shippingAddress: { ...defaultAddress },
      billingAddress: { ...defaultAddress },
    },
    validationSchema: regValidationSchema,
    onSubmit: (values) => {
      createCustomer(values)
        .then(() => {
          navigate(RouterPaths.Home);
        })
        .catch((error: Error) => {
          setErrorMessage({ show: true, message: error.message });
        });
    },
  });

  useEffect(() => {
    if (isDefaultShipping) {
      updateAddressField(formik, "shipping");
    }

    if (isDefaultBilling) {
      updateAddressField(formik, "billing");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDefaultShipping, isDefaultBilling, formik.values.address]);
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="outlined-email-input"
          variant="outlined"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={(formik.touched.email && Boolean(formik.errors.email)) || errorMessage.show}
          helperText={
            (formik.touched.email && Boolean(formik.errors.email) && "email address (e.g., example@email.com)") ||
            (errorMessage.show && errorMessage.message)
          }
          fullWidth
          margin="dense"
        />
        <TextField
          id="outlined-password-input"
          variant="outlined"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={
            formik.touched.password &&
            Boolean(formik.errors.password) &&
            "Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and at least one special character (e.g., !@#$%^&*)"
          }
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility}>
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
          margin="dense"
        />
        <TextField
          id="outlined-first-name-input"
          variant="outlined"
          name="firstName"
          label="First name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={
            formik.touched.firstName &&
            Boolean(formik.errors.firstName) &&
            "Must contain at least one character and no special characters or numbers"
          }
          fullWidth
          margin="dense"
        />
        <TextField
          id="outlined-last-name-input"
          variant="outlined"
          name="lastName"
          label="Last name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={
            formik.touched.lastName &&
            Boolean(formik.errors.lastName) &&
            "Must contain at least one character and no special characters or numbers"
          }
          fullWidth
          margin="dense"
        />
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="en-gb"
        >
          <MuiDatePicker
            label="Date of birth"
            value={minDateOfBirth || formik.values.dateOfBirth}
            onChange={(date) => {
              formik.setFieldValue("dateOfBirth", dayjs(date).format("YYYY-MM-DD"));
            }}
            slotProps={{
              textField: {
                helperText: "You must be at least 13 years old.",
              },
            }}
            shouldDisableDate={(date) => {
              const MIN_AGE = 13;
              const birthDate = dayjs(date);
              const age = dayjs().diff(birthDate, "years");
              return age < MIN_AGE;
            }}
          />
        </LocalizationProvider>
        <h2>Address: </h2>
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.defaultShippingAddress}
                onChange={(e) => {
                  formik.handleChange(e);
                  setIsDefaultShipping(e.target.checked);
                }}
                name="defaultShippingAddress"
              />
            }
            label="Set as default shipping address"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.defaultBillingAddress}
                onChange={(e) => {
                  formik.handleChange(e);
                  setIsDefaultBilling(e.target.checked);
                }}
                name="defaultBillingAddress"
              />
            }
            label="Set as default billing address"
          />
        </FormGroup>

        <TextField
          id="outlined-country-select"
          variant="outlined"
          select
          name="address.country"
          label="Select country"
          value={formik.values.address.country}
          onChange={(e) => {
            formik.handleChange(e);
            setIsCountrySelected(true);
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.address?.country && Boolean(formik.errors.address?.country)}
          fullWidth
          margin="dense"
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
          id="outlined-city-input"
          variant="outlined"
          name="address.city"
          label="City"
          value={formik.values.address.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address?.city && Boolean(formik.errors.address?.city)}
          helperText={
            formik.touched.address?.city &&
            Boolean(formik.errors.address?.city) &&
            "Must contain at least one character and no special characters or numbers"
          }
          disabled={!isCountrySelected}
          fullWidth
          margin="dense"
        />
        <TextField
          id="outlined-street-input"
          variant="outlined"
          name="address.streetName"
          label="Street"
          value={formik.values.address.streetName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address?.streetName && Boolean(formik.errors.address?.streetName)}
          helperText={
            formik.touched.address?.streetName &&
            Boolean(formik.errors.address?.streetName) &&
            "Must contain at least one character"
          }
          disabled={!isCountrySelected}
          fullWidth
          margin="dense"
        />
        <TextField
          id="outlined-street-number-input"
          variant="outlined"
          name="address.streetNumber"
          label="Street number"
          value={formik.values.address.streetNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address?.streetNumber && Boolean(formik.errors.address?.streetNumber)}
          helperText={
            formik.touched.address?.streetNumber &&
            Boolean(formik.errors.address?.streetNumber) &&
            "Must contain at least one digit"
          }
          disabled={!isCountrySelected}
          fullWidth
          margin="dense"
        />
        <TextField
          id="outlined-postal-code-input"
          variant="outlined"
          name="address.postalCode"
          label="Postal code"
          value={formik.values.address?.postalCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address?.postalCode && Boolean(formik.errors.address?.postalCode)}
          helperText={
            formik.touched.address?.postalCode &&
            Boolean(formik.errors.address?.postalCode) &&
            "Must follow the format for the country (e.g., 220022 for the Russia or A0A 0A0 for Canada"
          }
          disabled={!isCountrySelected}
          fullWidth
          margin="dense"
        />
        <h2>Shipping Address: </h2>
        <TextField
          id="outlined-shipping-country-select"
          variant="outlined"
          select
          name="shippingAddress.country"
          label="Select country"
          value={
            formik.values.defaultShippingAddress ? formik.values.address.country : formik.values.shippingAddress.country
          }
          onChange={(e) => {
            formik.handleChange(e);
            if (formik.values.defaultShippingAddress) {
              formik.setFieldValue("shippingAddress.country", formik.values.address.country);
            }
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.shippingAddress?.country && Boolean(formik.errors.shippingAddress?.country)}
          disabled={formik.values.defaultShippingAddress}
          fullWidth
          margin="dense"
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
          id="outlined-shipping-city-input"
          variant="outlined"
          name="shippingAddress.city"
          label="City"
          value={formik.values.defaultShippingAddress ? formik.values.address.city : formik.values.shippingAddress.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.shippingAddress?.city && Boolean(formik.errors.shippingAddress?.city)}
          helperText={
            formik.touched.shippingAddress?.city &&
            Boolean(formik.errors.shippingAddress?.city) &&
            "Must contain at least one character and no special characters or numbers"
          }
          disabled={!isCountrySelected || formik.values.defaultShippingAddress}
          fullWidth
          margin="dense"
        />
        <TextField
          id="outlined-shipping-street-input"
          variant="outlined"
          name="shippingAddress.streetName"
          label="Street"
          value={
            formik.values.defaultShippingAddress
              ? formik.values.address.streetName
              : formik.values.shippingAddress.streetName
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.shippingAddress?.streetName && Boolean(formik.errors.shippingAddress?.streetName)}
          helperText={
            formik.touched.shippingAddress?.streetName &&
            Boolean(formik.errors.shippingAddress?.streetName) &&
            "Must contain at least one character"
          }
          disabled={!isCountrySelected || formik.values.defaultShippingAddress}
          fullWidth
          margin="dense"
        />
        <TextField
          id="outlined-shipping-street-number-input"
          variant="outlined"
          name="shippingAddress.streetNumber"
          label="Street number"
          value={
            formik.values.defaultShippingAddress
              ? formik.values.address.streetNumber
              : formik.values.shippingAddress.streetNumber
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.shippingAddress?.streetNumber && Boolean(formik.errors.shippingAddress?.streetNumber)}
          helperText={
            formik.touched.shippingAddress?.streetNumber &&
            Boolean(formik.errors.shippingAddress?.streetNumber) &&
            "Must contain at least one digit"
          }
          disabled={!isCountrySelected || formik.values.defaultShippingAddress}
          fullWidth
          margin="dense"
        />
        <TextField
          id="outlined-shipping-postal-code-input"
          variant="outlined"
          name="shippingAddress.postalCode"
          label="Postal code"
          value={
            formik.values.defaultShippingAddress
              ? formik.values.address.postalCode
              : formik.values.shippingAddress?.postalCode
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.shippingAddress?.postalCode && Boolean(formik.errors.shippingAddress?.postalCode)}
          helperText={
            formik.touched.shippingAddress?.postalCode &&
            Boolean(formik.errors.shippingAddress?.postalCode) &&
            "Must follow the format for the country (e.g., 220022 for the Russia or A0A 0A0 for Canada"
          }
          disabled={!isCountrySelected || formik.values.defaultShippingAddress}
          fullWidth
          margin="dense"
        />
        <h2>Billing address: </h2>
        <TextField
          id="outlined-billing-country-select"
          variant="outlined"
          select
          name="billingAddress.country"
          label="Select country"
          value={
            formik.values.defaultBillingAddress ? formik.values.address.country : formik.values.billingAddress.country
          }
          onChange={(e) => {
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          error={formik.touched.billingAddress?.country && Boolean(formik.errors.billingAddress?.country)}
          disabled={formik.values.defaultBillingAddress}
          fullWidth
          margin="dense"
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
          id="outlined-billing-city-input"
          variant="outlined"
          name="billingAddress.city"
          label="City"
          value={formik.values.defaultBillingAddress ? formik.values.address.city : formik.values.billingAddress.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.billingAddress?.city && Boolean(formik.errors.billingAddress?.city)}
          helperText={
            formik.touched.billingAddress?.city &&
            Boolean(formik.errors.billingAddress?.city) &&
            "Must contain at least one character and no special characters or numbers"
          }
          disabled={!isCountrySelected || formik.values.defaultBillingAddress}
          fullWidth
          margin="dense"
        />
        <TextField
          id="outlined-billing-street-input"
          variant="outlined"
          name="billingAddress.streetName"
          label="Street"
          value={
            formik.values.defaultBillingAddress
              ? formik.values.address.streetName
              : formik.values.billingAddress.streetName
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.billingAddress?.streetName && Boolean(formik.errors.billingAddress?.streetName)}
          helperText={
            formik.touched.billingAddress?.streetName &&
            Boolean(formik.errors.billingAddress?.streetName) &&
            "Must contain at least one character"
          }
          disabled={!isCountrySelected || formik.values.defaultBillingAddress}
          fullWidth
          margin="dense"
        />
        <TextField
          id="outlined-billing-street-number-input"
          variant="outlined"
          name="billingAddress.streetNumber"
          label="Street number"
          value={
            formik.values.defaultBillingAddress
              ? formik.values.address.streetNumber
              : formik.values.billingAddress.streetNumber
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.billingAddress?.streetNumber && Boolean(formik.errors.billingAddress?.streetNumber)}
          helperText={
            formik.touched.billingAddress?.streetNumber &&
            Boolean(formik.errors.billingAddress?.streetNumber) &&
            "Must contain at least one digit"
          }
          disabled={!isCountrySelected || formik.values.defaultBillingAddress}
          fullWidth
          margin="dense"
        />
        <TextField
          id="outlined-billing-postal-code-input"
          variant="outlined"
          name="billingAddress.postalCode"
          label="Postal code"
          value={
            formik.values.defaultBillingAddress
              ? formik.values.address.postalCode
              : formik.values.billingAddress?.postalCode
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.billingAddress?.postalCode && Boolean(formik.errors.billingAddress?.postalCode)}
          helperText={
            formik.touched.billingAddress?.postalCode &&
            Boolean(formik.errors.billingAddress?.postalCode) &&
            "Must follow the format for the country (e.g., 220022 for the Russia or A0A 0A0 for Canada"
          }
          disabled={!isCountrySelected || formik.values.defaultBillingAddress}
          fullWidth
          margin="dense"
        />
        <div className={styles["submit-button-wrapper"]}>
          <Button
            variant="contained"
            type="submit"
            disabled={!formik.dirty || !formik.isValid}
          >
            Register and go to Home
          </Button>
          {errorMessage.show && <p className={styles["error-message"]}>{errorMessage.message}</p>}
        </div>
      </form>

      <Button
        component={Link}
        to={RouterPaths.Login}
        type="submit"
      >
        Already have an account? Login here
      </Button>
    </>
  );
}
