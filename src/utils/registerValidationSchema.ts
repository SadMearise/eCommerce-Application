/* eslint-disable operator-linebreak */
import * as yup from "yup";
import { PostalCodeValidation } from "../models/types";
import countriesSet from "../countries";

const postalCodeValidation: PostalCodeValidation = {
  Russia: yup.string().matches(/^\d{6}$/),
  Georgia: yup.string().matches(/^\d{4}$/),
  Belarus: yup.string().matches(/^\d{6}$/),
  USA: yup.string().matches(/^\d{5}(-\d{4})?$/),
  Canada: yup.string().matches(/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/),
};

const addressValidationSchema = yup.object().shape({
  country: yup.string().required(),
  city: yup
    .string()
    .test("city-validation", (value) => {
      if (!value) {
        return false;
      }

      const containsLetter = /[a-zA-Zа]/.test(value);
      const noSpecialCharsOrNumbers = /^[a-zA-Zа\s]*$/.test(value);

      return containsLetter && noSpecialCharsOrNumbers;
    })
    .required(),
  streetName: yup
    .string()
    .matches(/[a-zA-Zа]/)
    .required(),
  streetNumber: yup.string().matches(/^\d+/).required(),
  postalCode: yup
    .string()
    .test({
      name: "postalCode",
      exclusive: true,
      message: ({ country }) => `Invalid postal code format for ${country}`,
      test(value) {
        const country = this.resolve(yup.ref("country"));
        if (country && countriesSet.has(country as string)) {
          return postalCodeValidation[country as string].isValidSync(value);
        }
        return true;
      },
    })
    .required(),
});

const regValidationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{8,}/) // Password must contain at least one uppercase letter, one lowercase letter, and one number
    .required(),
  firstName: yup
    .string()
    .matches(/^[a-zA-Z]+$/) // First name must contain at least one letter and no special characters or numbers
    .required(),
  lastName: yup
    .string()
    .matches(/^[a-zA-Z]+$/) // Last name must contain at least one letter and no special characters or numbers
    .required(),
  address: addressValidationSchema,
  shippingAddress: addressValidationSchema,
  billingAddress: addressValidationSchema,
});

export default regValidationSchema;
