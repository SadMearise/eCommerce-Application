import { FormikProps } from "formik";
import { AdditionalAddressType, ICustomer } from "../models/types";

const updateAddressField = (formik: FormikProps<ICustomer>, type: AdditionalAddressType): void => {
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
