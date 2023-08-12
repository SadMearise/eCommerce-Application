import { Button, IconButton, InputAdornment, MenuItem, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import regValidationSchema from "../utils/registerValidationSchema";
import countriesSet from "../countries";
import "dayjs/locale/en-gb";

export default function Registration() {
  const minDateOfBirth = dayjs().subtract(13, "year").startOf("day");

  const [showPassword, setShowPassword] = useState(false);
  const [isCountrySelected, setIsCountrySelected] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      address: {
        country: "",
        city: "",
        streetName: "",
        streetNumber: "",
        postalCode: "",
      },
    },
    validationSchema: regValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <>
      <h1>Registration page</h1>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="outlined-email-input"
          variant="outlined"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && Boolean(formik.errors.email) && "email address (e.g., example@email.com)"}
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
            "Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number"
          }
          type={showPassword ? "text" : "password"} // Показывает или скрывает пароль
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
          // className={formik.touched.firstName && formik.errors.firstName ? "Mui-error" : ""}
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
        <h2>Addres:</h2>
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
        <Button
          variant="contained"
          type="submit"
          disabled={!formik.dirty || !formik.isValid}
        >
          Register
        </Button>
      </form>
      <Button
        component={Link}
        to="/login"
        variant="outlined"
        type="submit"
      >
        Already have an account? Login here
      </Button>
    </>
  );
}
