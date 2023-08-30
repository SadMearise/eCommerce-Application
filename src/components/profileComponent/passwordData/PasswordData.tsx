import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { passwordValidationSchema } from "../../../utils/profileValidationSchema";
import styles from "./PasswordData.module.scss";
import { changeCustomerPassword } from "../../../services/customerService";
import { PasswrodDateProps } from "../types";

export default function PasswordData({ userId, version }: PasswrodDateProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const toggleCurrentPasswordVisibility = (): void => {
    setShowCurrentPassword((prevShowPassword) => !prevShowPassword);
  };
  const [showNewPassword, setShowNewPassword] = useState(false);
  const toggleNewPasswordVisibility = (): void => {
    setShowNewPassword((prevShowPassword) => !prevShowPassword);
  };
  const formik = useFormik<{ currentPassword: string; newPassword: string }>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      changeCustomerPassword({ id: userId, version, ...values });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={styles["password-data"]}>
        <div className={styles["password-data-title"]}>
          <h2>Change password: </h2>
        </div>
        <div className={styles["password-container"]}>
          <TextField
            id="current-password-input"
            variant="outlined"
            name="currentPassword"
            label="Current password: "
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
            helperText={
              formik.touched.currentPassword &&
              Boolean(formik.errors.currentPassword) &&
              "Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and at least one special character (e.g., !@#$%^&*), may contain only english letters"
            }
            type={showCurrentPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleCurrentPasswordVisibility}>
                    {showCurrentPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="new-password-input"
            variant="outlined"
            name="newPassword"
            label="New password: "
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={
              formik.touched.newPassword &&
              Boolean(formik.errors.newPassword) &&
              "Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and at least one special character (e.g., !@#$%^&*), may contain only english letters"
            }
            type={showNewPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleNewPasswordVisibility}>
                    {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            className={styles["password-button"]}
            variant="outlined"
            type="submit"
            disabled={!formik.dirty || !formik.isValid}
          >
            Change password
          </Button>
        </div>
      </div>
    </form>
  );
}
