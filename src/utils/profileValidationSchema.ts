import * as yup from "yup";

const profValidationSchema = yup.object().shape({
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

export default profValidationSchema;
