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
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: TLoginOnSubmitValues, props: FormikHelpers<TLoginOnSubmitValues>) => {
    const loginResponse = await loginToApi(values.email, values.password);
    setShowError(false);

    if (loginResponse.isLoggined) {
      dispatch(login({ customer: loginResponse.customer }));
      if (loginResponse.customer) {
        localStorage.setItem("customer", JSON.stringify(loginResponse.customer));
      }
      props.setSubmitting(true);
      props.resetForm();
      navigate("/");
    } else {
      setShowError(true);
      if (loginResponse.error) {
        setErrorMsg(loginResponse.error);
      } else {
        setErrorMsg("Something went wrong");
      }
    }
  };

  function toggleVizard() {
    if (fieldType === "password") {
      setFieldType("text");
    } else {
      setFieldType("password");
    }
  }

  return (
    <>
      {showError && <p className={styles.message}>{errorMsg}</p>}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form
            className={styles.form}
            onChange={() => {
              setShowError(false);
            }}
          >
            <Field
              as={TextField}
              className={(errors.email && touched.email) || showError ? `${styles.err}` : ""}
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
                className={(errors.password && touched.password) || showError ? `${styles.err}` : ""}
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
