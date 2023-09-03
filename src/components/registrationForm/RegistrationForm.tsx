import { Button, Checkbox, FormControlLabel, IconButton, InputAdornment, MenuItem, TextField } from "@mui/material";
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
import { useDispatch } from "react-redux";
import regValidationSchema from "../../utils/registerValidationSchema";
import countriesSet from "../../countries";
import styles from "./RegistrationForm.module.scss";
import { ICustomer } from "../../models/types";
import RouterPaths from "../../router/routes";
import loginToApi from "../../services/LoginToApi";
import { setRegistrationSuccess } from "../../store/features/registration/registrationSlice";
import createCustomer from "../../services/customer.service";
import { login } from "../../store/features/user/userSlice";

export default function RegistrationForm() {
  const minDateOfBirth = dayjs().subtract(13, "year").startOf("day");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isShippingCountrySelected, setIsShippingCountrySelected] = useState(false);
  const [isBillingCountrySelected, setBillingIsCountrySelected] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ show: false, message: "" });
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
      defaultShippingAddress: true,
      defaultBillingAddress: true,
      billingIsShipping: false,
      shippingAddress: { ...defaultAddress },
      billingAddress: { ...defaultAddress },
    },
    validationSchema: regValidationSchema,
    onSubmit: (values) => {
      createCustomer(values)
        .then(() => {
          loginToApi(values.email, values.password);
          navigate(RouterPaths.Home);
          dispatch(setRegistrationSuccess(true));
          dispatch(login({ customer: values }));
        })
        .catch((error: Error) => {
          setErrorMessage({ show: true, message: error.message });
        });
    },
  });

  useEffect(() => {
    if (formik.values.billingIsShipping) {
      formik.setFieldValue("billingAddress", {
        ...formik.values.shippingAddress,
        country: formik.values.shippingAddress.country,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.billingIsShipping, formik.values.shippingAddress]);

  return (
    <div className={styles["content-wrapper"]}>
      <form onSubmit={formik.handleSubmit}>
        <h2 className={styles["basic-info-title"]}>Basic information: </h2>
        <div className={styles["basic-info"]}>
          <TextField
            id="outlined-email-input"
            variant="outlined"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={(e) => {
              formik.handleChange(e);
              setErrorMessage({ show: false, message: "" });
            }}
            onBlur={formik.handleBlur}
            error={(formik.touched.email && Boolean(formik.errors.email)) || errorMessage.show}
            helperText={
              (formik.touched.email &&
                Boolean(formik.errors.email) &&
                "email address is not valid (e.g., example@email.com), may contain only english letters") ||
              (errorMessage.show && errorMessage.message)
            }
            fullWidth
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
              "Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and at least one special character (e.g., !@#$%^&*), may contain only english letters"
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
              "Must contain at least one character and no special characters or numbers, may contain only english letters"
            }
            fullWidth
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
              "Must contain at least one character and no special characters or numbers, may contain only english letters"
            }
            fullWidth
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
        </div>
        <div className={styles["data-wrapper"]}>
          <div className={styles["data-info"]}>
            <h2>Shipping Address: </h2>
            <TextField
              id="outlined-shipping-country-select"
              variant="outlined"
              select
              name="shippingAddress.country"
              label="Select country"
              value={formik.values.shippingAddress.country}
              onChange={(e) => {
                formik.handleChange(e);
                setIsShippingCountrySelected(true);
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.shippingAddress?.country && Boolean(formik.errors.shippingAddress?.country)}
              fullWidth
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
              value={formik.values.shippingAddress.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.shippingAddress?.city && Boolean(formik.errors.shippingAddress?.city)}
              helperText={
                formik.touched.shippingAddress?.city &&
                Boolean(formik.errors.shippingAddress?.city) &&
                "Must contain at least one character and no special characters or numbers, may contain only english letters"
              }
              disabled={!isShippingCountrySelected}
              fullWidth
            />
            <TextField
              id="outlined-shipping-street-input"
              variant="outlined"
              name="shippingAddress.streetName"
              label="Street"
              value={formik.values.shippingAddress.streetName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.shippingAddress?.streetName && Boolean(formik.errors.shippingAddress?.streetName)}
              helperText={
                formik.touched.shippingAddress?.streetName &&
                Boolean(formik.errors.shippingAddress?.streetName) &&
                "Must contain at least one character and no special characters or numbers, may contain only english letters"
              }
              disabled={!isShippingCountrySelected}
              fullWidth
            />
            <TextField
              id="outlined-shipping-street-number-input"
              variant="outlined"
              name="shippingAddress.streetNumber"
              label="Street number"
              value={formik.values.shippingAddress.streetNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.shippingAddress?.streetNumber && Boolean(formik.errors.shippingAddress?.streetNumber)
              }
              helperText={
                formik.touched.shippingAddress?.streetNumber &&
                Boolean(formik.errors.shippingAddress?.streetNumber) &&
                "Must contain at least one digit and should only be digits"
              }
              disabled={!isShippingCountrySelected}
              fullWidth
            />
            <TextField
              id="outlined-shipping-postal-code-input"
              variant="outlined"
              name="shippingAddress.postalCode"
              label="Postal code"
              value={formik.values.shippingAddress?.postalCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.shippingAddress?.postalCode && Boolean(formik.errors.shippingAddress?.postalCode)}
              helperText={
                formik.touched.shippingAddress?.postalCode &&
                Boolean(formik.errors.shippingAddress?.postalCode) &&
                "Must follow the format for the country (e.g., 220022 for the Russia or A0A 0A0 for Canada"
              }
              disabled={!isShippingCountrySelected}
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.defaultShippingAddress}
                  onChange={formik.handleChange}
                  name="defaultShippingAddress"
                />
              }
              label="Set as default shipping address"
            />
          </div>
          <div className={styles["data-info"]}>
            <div className={styles["billing-title-wrapper"]}>
              <h2>Billing address: </h2>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.billingIsShipping}
                    onChange={formik.handleChange}
                    name="billingIsShipping"
                  />
                }
                label="Billing address is the same as shipping"
              />
            </div>
            {!formik.values.billingIsShipping && (
              <>
                <TextField
                  id="outlined-billing-country-select"
                  variant="outlined"
                  select
                  name="billingAddress.country"
                  label="Select country"
                  value={formik.values.billingAddress.country}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setBillingIsCountrySelected(true);
                  }}
                  onBlur={formik.handleBlur}
                  disabled={formik.values.billingIsShipping}
                  error={formik.touched.billingAddress?.country && Boolean(formik.errors.billingAddress?.country)}
                  fullWidth
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
                  value={formik.values.billingAddress.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.billingAddress?.city && Boolean(formik.errors.billingAddress?.city)}
                  helperText={
                    formik.touched.billingAddress?.city &&
                    Boolean(formik.errors.billingAddress?.city) &&
                    "Must contain at least one character and no special characters or numbers, may contain only english letters"
                  }
                  disabled={!isBillingCountrySelected || formik.values.billingIsShipping}
                  fullWidth
                />
                <TextField
                  id="outlined-billing-street-input"
                  variant="outlined"
                  name="billingAddress.streetName"
                  label="Street"
                  value={formik.values.billingAddress.streetName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.billingAddress?.streetName && Boolean(formik.errors.billingAddress?.streetName)}
                  helperText={
                    formik.touched.billingAddress?.streetName &&
                    Boolean(formik.errors.billingAddress?.streetName) &&
                    "Must contain at least one character and no special characters or numbers, may contain only english letters"
                  }
                  disabled={!isBillingCountrySelected || formik.values.billingIsShipping}
                  fullWidth
                />
                <TextField
                  id="outlined-billing-street-number-input"
                  variant="outlined"
                  name="billingAddress.streetNumber"
                  label="Street number"
                  value={formik.values.billingAddress.streetNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.billingAddress?.streetNumber && Boolean(formik.errors.billingAddress?.streetNumber)
                  }
                  helperText={
                    formik.touched.billingAddress?.streetNumber &&
                    Boolean(formik.errors.billingAddress?.streetNumber) &&
                    "Must contain at least one digit and should only be digits"
                  }
                  disabled={!isBillingCountrySelected || formik.values.billingIsShipping}
                  fullWidth
                />
                <TextField
                  id="outlined-billing-postal-code-input"
                  variant="outlined"
                  name="billingAddress.postalCode"
                  label="Postal code"
                  value={formik.values.billingAddress?.postalCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.billingAddress?.postalCode && Boolean(formik.errors.billingAddress?.postalCode)}
                  helperText={
                    formik.touched.billingAddress?.postalCode &&
                    Boolean(formik.errors.billingAddress?.postalCode) &&
                    "Must follow the format for the country (e.g., 220022 for the Russia or A0A 0A0 for Canada"
                  }
                  disabled={!isBillingCountrySelected || formik.values.billingIsShipping}
                  fullWidth
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.defaultBillingAddress}
                      onChange={formik.handleChange}
                      name="defaultBillingAddress"
                    />
                  }
                  label="Set as default billing address"
                />
              </>
            )}
          </div>
        </div>
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
        <Button
          component={Link}
          to={RouterPaths.Login}
          type="submit"
        >
          Already have an account? Login here
        </Button>
      </form>
    </div>
  );
}
