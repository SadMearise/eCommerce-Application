import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styles from "./Login.module.scss";
import { LoginBtn, TLoginOnSubmitValues } from "./types";
import { login } from "../../store/features/userSlice";
import { attemptLogin } from "../../services/BuildClient";

function validateEmail(value: string) {
  let error;
  const re =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  if (!value) {
    error = "Required";
  } else if (!re.test(value)) {
    error = "Improperly formatted email address";
  }
  return error;
}

function validatePassword(value: string) {
  let error;
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{8,}/;

  if (!value) {
    error = "Required";
  } else if (!re.test(value)) {
    error = "Weak password";
  }
  return error;
}

function LoginComponent() {
  const dispatch = useDispatch();

  const [fieldType, setFieldType] = useState("password");

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: TLoginOnSubmitValues, props: FormikHelpers<TLoginOnSubmitValues>) => {
    setTimeout(() => {
      props.setSubmitting(true);
      props.resetForm();
    }, 2000);

    const aboutMe = await attemptLogin("t20t@tut.by", "123");
    console.log("aboutMe", aboutMe);

    // const aboutMe = await getApiRoot().me().get().execute();
    // console.log("aboutMe", aboutMe);

    // const categories = await getApiRoot().categories().get().execute();
    // console.log("categories", categories);

    dispatch(
      login({
        email: values.email,
        password: values.password,
        loggedIn: true,
      })
    );
  };

  function toggleVizard() {
    if (fieldType === "password") {
      setFieldType("text");
    } else {
      setFieldType("password");
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className={styles.form}>
          <Field
            as={TextField}
            className={errors.email && touched.email ? `${styles.err}` : ""}
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
              className={errors.password && touched.password ? `${styles.err}` : ""}
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
        </Form>
      )}
    </Formik>
  );
}

export default LoginComponent;
