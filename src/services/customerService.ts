import { CustomerDraft } from "@commercetools/platform-sdk";
import getApiRoot from "./BuildClient";
import { ICustomer } from "../models/types";
import getCountryCode from "../utils/getCountryCode";

const apiRoot = getApiRoot();

export const getCustomers = () => apiRoot.customers().get().execute();

export const showCustomersInConsole = () =>
  getCustomers().then((data) => data?.body?.results.forEach((customer, index) => console.log(index, customer)));

export const createCustomer = (customerData: ICustomer) => {
  const { email, password, firstName, lastName, dateOfBirth, address } = customerData;

  const addressDraft = {
    country: getCountryCode(address.country),
    city: address.city,
    streetName: address.streetName,
    streetNumber: address.streetNumber,
    postalCode: address.postalCode,
  };

  const customerDraft: CustomerDraft = {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    addresses: [addressDraft],
  };

  return apiRoot.customers().post({ body: customerDraft }).execute();
};
