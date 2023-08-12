import { Button, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";

export default function Registration() {
  return (
    <>
      <h1>Registration page</h1>
      <TextField
        id="outlined-email-input"
        variant="outlined"
        name="email"
        label="Email"
        fullWidth
        margin="dense"
      />
      <TextField
        id="outlined-password-input"
        variant="outlined"
        name="password"
        label="Password"
        fullWidth
        margin="dense"
      />
      <TextField
        id="outlined-first-name-input"
        variant="outlined"
        name="firstName"
        label="First name"
        fullWidth
        margin="dense"
      />
      <TextField
        id="outlined-last-name-input"
        variant="outlined"
        name="lastName"
        label="Last name"
        fullWidth
        margin="dense"
      />
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="en-gb"
      >
        <MuiDatePicker label="Date of birth" />
      </LocalizationProvider>
      <h2>Addres:</h2>
      <TextField
        id="outlined-country-select"
        variant="outlined"
        select
        name="address.country"
        label="Select country"
      />
      <TextField
        id="outlined-city-input"
        variant="outlined"
        name="address.city"
        label="City"
        fullWidth
        margin="dense"
      />
      <TextField
        id="outlined-street-input"
        variant="outlined"
        name="address.streetName"
        label="Street"
        fullWidth
        margin="dense"
      />
      <TextField
        id="outlined-street-number-input"
        variant="outlined"
        name="address.streetNumber"
        label="Street number"
        fullWidth
        margin="dense"
      />
      <TextField
        id="outlined-postal-code-input"
        variant="outlined"
        name="address.postalCode"
        label="Postal code"
        fullWidth
        margin="dense"
      />
      <Button
        variant="contained"
        type="submit"
      >
        Register
      </Button>
      <Button
        variant="outlined"
        type="submit"
      >
        Already have an account? Login here
      </Button>
    </>
  );
}
