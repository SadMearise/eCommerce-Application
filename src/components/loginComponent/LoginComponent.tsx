import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { TextField, Button } from "@mui/material";
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

function LoginComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fieldType, setFieldType] = useState("password");
  const [error, setError] = useState({ show: false, message: "" });

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (
    values: TLoginOnSubmitValues,
    { setSubmitting, resetForm }: FormikHelpers<TLoginOnSubmitValues>
  ) => {
    try {
      const loginResponse = await loginToApi(values.email, values.password);
      setError({ show: !loginResponse.isLoggined, message: loginResponse.error || "An error occurred" });
      if (loginResponse.isLoggined) {
        dispatch(login({ customer: loginResponse.customer }));
        setSubmitting(true);
        resetForm();
        navigate("/");
      }
    } catch (e) {
      setError({ show: true, message: "An error occurred" });
    }
  };

  function toggleVizard() {
    setFieldType(fieldType === "password" ? "text" : "password");
  }

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
              className={(errors.email && touched.email) || error.show ? `${styles.err}` : ""}
              type="email"
              variant="outlined"
              name="email"
              label="Email"
              placeholder="Email"
              validate={validateEmail}
              fullWidth
              required
              helperText={<ErrorMessage name="email" />}
            />

            <div className={styles.password}>
              <Field
                as={TextField}
                className={(errors.password && touched.password) || error.show ? `${styles.err}` : ""}
                type={fieldType}
                variant="outlined"
                name="password"
                label="Password"
                placeholder="Password"
                validate={validatePassword}
                fullWidth
                required
                helperText={<ErrorMessage name="password" />}
              />

              <div className={styles.vizard}>
                <label htmlFor="toggler">
                  <input
                    type="checkbox"
                    onClick={toggleVizard}
                    id="toggler"
                  />
                  {fieldType === "password" ? (
                    <VisibilityOffIcon style={{ color: "#1565c0" }} />
                  ) : (
                    <VisibilityIcon style={{ color: "#1565c0" }} />
                  )}
                </label>
              </div>
            </div>

            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? LoginBtn.loading : LoginBtn.signIn}
            </Button>

            <Link
              to="/registration"
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
