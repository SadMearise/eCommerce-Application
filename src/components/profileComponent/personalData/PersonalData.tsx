import { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import "dayjs/locale/en-gb";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { PersonalDataProps, TouchedFieldsPersonal } from "../types";
import { getCustomerInfo, getCustomerVersionByID, updatePersonalDataCustomer } from "../../../services/customerService";
import { personalDataValidationSchema } from "../../../utils/profileValidationSchema";
import styles from "./PersonalData.module.scss";
import AlertView from "../../alertView/AlertView";

export default function PersonalData({
  userData,
  version,
  handleReadOnlyClick,
  handleChangeDataVersion,
}: PersonalDataProps) {
  const [personalData, setPersonalData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    dateOfBirth: userData.dateOfBirth,
    email: userData.email,
  });
  const [isChangingInfo, setIsChangingInfo] = useState(false);
  const [fieldsChanged, setFieldsChanged] = useState(false);
  const [firstInputDone, setFirstInputDone] = useState(false);
  const [isChangingSuccessful, setIsChangingSuccessful] = useState(false);

  const handleSuccessAlert = () => {
    setIsChangingSuccessful(true);

    setTimeout(() => setIsChangingSuccessful(false), 2000);
  };

  const handleChangingInfoClick = () => setIsChangingInfo(!isChangingInfo);
  const formik = useFormik({
    initialValues: personalData,
    // initialValues: {
    //   firstName: userData.firstName,
    //   lastName: userData.lastName,
    //   dateOfBirth: userData.dateOfBirth,
    //   email: userData.email,
    // },
    validationSchema: personalDataValidationSchema,
    onSubmit: (values) => {
      updatePersonalDataCustomer(userData.id, version, values).then(async () => {
        // handleChangeDataVersion(version + 1);
        handleSuccessAlert();
        const newData = await getCustomerInfo();
        setPersonalData({
          firstName: newData.body.firstName,
          lastName: newData.body.lastName,
          dateOfBirth: newData.body.dateOfBirth,
          email: newData.body.email,
        });
        const currentVersion = await getCustomerVersionByID(userData.id);
        handleChangeDataVersion(currentVersion);
        // handleUpdateUserData();
        console.log("personalData.firstName", personalData.firstName);
      });
    },
  });
  useEffect(() => {
    if (firstInputDone && !formik.isSubmitting) {
      const touchedFields: TouchedFieldsPersonal = {
        firstName: true,
        lastName: true,
        email: true,
      };
      formik.setTouched(touchedFields);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstInputDone, formik.isSubmitting]);

  const handleFieldChange = (field: keyof TouchedFieldsPersonal, value: string) => {
    formik.setFieldValue(field, value);
    if (!fieldsChanged) {
      setFieldsChanged(true);
      setFirstInputDone(true);
    }
  };

  // useEffect(() => {
  //   formik.setValues(personalData); // Установить новые значения в форму
  // }, [personalData]);
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
            disabled={Boolean(!formik.isValid)}
          >
            {isChangingInfo ? "save details" : "change details"}
          </Button>
        </div>
        <div className={styles["personal-data-container"]}>
          <TextField
            id="firstName-input"
            className={styles["half-width-field"]}
            name="firstName"
            label="First name:"
            value={formik.values.firstName}
            onBlur={formik.handleBlur}
            onChange={(e) => handleFieldChange("firstName", e.target.value)}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            variant={isChangingInfo ? "standard" : "outlined"}
            helperText={
              formik.touched.firstName &&
              Boolean(formik.errors.firstName) &&
              "Must contain at least one character and no special characters or numbers, may contain only english letters"
            }
            InputProps={{
              onMouseDown: !isChangingInfo ? handleReadOnlyClick : undefined,
            }}
          />
          <TextField
            id="lastName-input"
            className={styles["half-width-field"]}
            variant={isChangingInfo ? "standard" : "outlined"}
            name="lastName"
            label="Last name:"
            value={formik.values.lastName}
            onChange={(e) => handleFieldChange("lastName", e.target.value)}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={
              formik.touched.lastName &&
              Boolean(formik.errors.lastName) &&
              "Must contain at least one character and no special characters or numbers, may contain only english letters"
            }
            InputProps={{
              onMouseDown: !isChangingInfo ? handleReadOnlyClick : undefined,
            }}
          />
          {isChangingInfo ? (
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="en-gb"
            >
              <MuiDatePicker
                slotProps={{ textField: { variant: "standard" } }}
                className={styles["half-width-field"]}
                label="Birthday"
                value={dayjs(userData.dateOfBirth) || formik.values.dateOfBirth}
                onChange={(date) => {
                  // eslint-disable-next-line newline-per-chained-call
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
          ) : (
            <TextField
              className={styles["half-width-field"]}
              name="dateOfBirth"
              label="Birthday:"
              value={formik.values.dateOfBirth}
              InputProps={{
                onMouseDown: !isChangingInfo ? handleReadOnlyClick : undefined,
              }}
            />
          )}
          <TextField
            id="email-input"
            className={styles["half-width-field"]}
            name="email"
            label="email:"
            value={formik.values.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            variant={isChangingInfo ? "standard" : "outlined"}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={
              formik.touched.email &&
              Boolean(formik.errors.email) &&
              "email address is not valid (e.g., example@email.com), may contain only english letters"
            }
            InputProps={{
              onMouseDown: !isChangingInfo ? handleReadOnlyClick : undefined,
            }}
          />
        </div>
      </form>
      {isChangingSuccessful && (
        <AlertView
          alertTitle="Success"
          severity="success"
          variant="filled"
          textContent="Changes were successful"
        />
      )}
    </div>
  );
}
