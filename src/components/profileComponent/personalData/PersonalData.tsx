import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import "dayjs/locale/en-gb";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import styles from "../ProfileComponent.module.scss";
import { PersonalDataProps } from "../types";
import profValidationSchema from "../../../utils/profileValidationSchema";

export default function PersonalData({ userData, handleReadOnlyClick }: PersonalDataProps) {
  const [isChangingInfo, setIsChangingInfo] = useState(false);

  const handleChangingInfoClick = () => setIsChangingInfo(!isChangingInfo);

  const formik = useFormik({
    initialValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      dateOfBirth: dayjs(userData.dateOfBirth),
      email: userData.email,
    },
    validationSchema: profValidationSchema,
    onSubmit: (values) => console.log(values),
  });
  console.log(formik.errors);
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
          <h2>Personal info:</h2>
          <Button
            onClick={handleChangingInfoClick}
            type="submit"
          >
            {isChangingInfo ? "save details" : "change details"}
          </Button>
        </div>
        <div className={styles["flex-container"]}>
          <TextField
            id="firstName-input"
            className={styles["half-width-field"]}
            name="firstName"
            label="First name:"
            value={formik.values.firstName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            variant={isChangingInfo ? "standard" : "outlined"}
            helperText={
              formik.touched.firstName &&
              Boolean(formik.errors.firstName) &&
              "email address is not valid (e.g., example@email.com), may contain only english letters"
            }
            InputProps={{
              onMouseDown: !isChangingInfo ? handleReadOnlyClick : undefined,
            }}
          />
          <TextField
            id="lastName-input"
            className={styles["half-width-field"]}
            name="lastName"
            label="Last name:"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            variant={isChangingInfo ? "standard" : "outlined"}
            InputProps={{
              onMouseDown: !isChangingInfo ? handleReadOnlyClick : undefined,
            }}
          />
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="en-gb"
          >
            <MuiDatePicker
              className={styles["half-width-field"]}
              label="Birthday"
              value={formik.values.dateOfBirth}
              onChange={(date) => {
                formik.setFieldValue("dateOfBirth", dayjs(date).format("YYYY-MM-DD"));
              }}
              shouldDisableDate={(date) => {
                const MIN_AGE = 13;
                const birthDate = dayjs(date);
                const age = dayjs().diff(birthDate, "years");
                return age < MIN_AGE;
              }}
            />
          </LocalizationProvider>
          <TextField
            id="email-input"
            className={styles["half-width-field"]}
            name="email"
            label="email:"
            value={formik.values.email}
            onChange={formik.handleChange}
            variant={isChangingInfo ? "standard" : "outlined"}
            InputProps={{
              onMouseDown: !isChangingInfo ? handleReadOnlyClick : undefined,
            }}
          />
        </div>
      </form>
    </div>
  );
}
