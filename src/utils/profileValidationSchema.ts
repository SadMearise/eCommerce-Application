import * as yup from "yup";

export const personalDataValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[a-zA-Z]+$/) // First name must contain at least one letter and no special characters or numbers
    .required(),
  lastName: yup
    .string()
    .matches(/^[a-zA-Z]+$/) // Last name must contain at least one letter and no special characters or numbers
    .required(),
  email: yup.string().email().required(),
});

const passwordValidationRegExp =
  // eslint-disable-next-line max-len
  /^(?!.*^\s)(?!.*\s$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_~+= \t~!@#$%^&*()_+=?:;№"{}[\]/.,<>`-])[a-zA-Z0-9!@#$%^&*()_~+= \t~!@#$%^&*()_+=?:;№"{}[\]/.,<>`-]*$/;

export const passwordValidationSchema = yup.object().shape({
  currentPassword: yup.string().min(8).matches(passwordValidationRegExp).required(),
  newPassword: yup.string().min(8).matches(passwordValidationRegExp).required(),
});
