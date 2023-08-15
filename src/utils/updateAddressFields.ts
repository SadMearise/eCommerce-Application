import { FormikProps } from "formik";
import { ICustomer } from "../models/types";

const updateAddressField = (formik: FormikProps<ICustomer>, type: "shipping" | "billing"): void => {
  if (type === "shipping") {
    formik.setFieldValue("shippingAddress", {
      ...formik.values.address,
      country: formik.values.address.country,
    });
  } else if (type === "billing") {
    formik.setFieldValue("billingAddress", {
      ...formik.values.address,
      country: formik.values.address.country,
    });
  }
};

export default updateAddressField;
