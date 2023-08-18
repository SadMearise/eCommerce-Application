import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.scss";
import { LoginBtn, TLoginOnSubmitValues } from "./types";
import { login } from "../../store/features/userSlice";
import loginToApi from "../../services/LoginToApi";
import { validateEmail, validatePassword } from "../../utils/loginValidate";
import RouterPaths from "../../router/routes";

function LoginComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState({ show: false, message: "" });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = (): void => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (
    values: TLoginOnSubmitValues,
    { setSubmitting, resetForm }: FormikHelpers<TLoginOnSubmitValues>
  ): Promise<void> => {
    try {
      const loginResponse = await loginToApi(values.email, values.password);
      setError({ show: !loginResponse.isLoggined, message: loginResponse.error || "An error occurred" });
      if (loginResponse.isLoggined) {
        dispatch(login({ customer: loginResponse.customer }));
        setSubmitting(true);
        resetForm();
        navigate(RouterPaths.Home);
      }
    } catch (e) {
      setError({ show: true, message: "An error occurred" });
    }
  };

  return (
    <>
      {error.show && <p className={styles.message}>{error.message}</p>}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form
            className={styles.form}
            onChange={() => {
              setError({ show: false, message: "" });
            }}
          >
            <Field
              as={TextField}
              className={
                (errors.email && touched.email) || error.show ? `${styles.err} ${styles.field}` : `${styles.field}`
              }
              type="text"
              variant="outlined"
              name="email"
              label="Email"
              placeholder="Email"
              validate={validateEmail}
              fullWidth
              required
              helperText={<ErrorMessage name="email" />}
              error={(errors.email && touched.email) || error.show}
            />

            <Field
              as={TextField}
              className={
                (errors.password && touched.password) || error.show
                  ? `${styles.err} ${styles.field}`
                  : `${styles.field}`
              }
              type={showPassword ? "text" : "password"}
              variant="outlined"
              name="password"
              label="Password"
              placeholder="Password"
              validate={validatePassword}
              fullWidth
              required
              helperText={<ErrorMessage name="password" />}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={(errors.password && touched.password) || error.show}
            />

            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? LoginBtn.loading : LoginBtn.signIn}
            </Button>

            <Link
              to={RouterPaths.Registration}
              className={styles.link}
            >
              Registration
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default LoginComponent;
