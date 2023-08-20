import * as yup from "yup";

export type PostalCodeValidation = {
  [key: string]: yup.StringSchema<string | undefined>;
};

export interface CustomerAddress {
  country: string;
  city: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
}

export interface ICustomer {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  defaultShippingAddress: boolean;
  defaultBillingAddress: boolean;
  shippingAddress: CustomerAddress;
  billingAddress: CustomerAddress;
}

export interface CountryCodeMapping {
  [countryName: string]: string;
}

export enum CountryCode {
  Russia = "RU",
  Belarus = "BY",
  Georgia = "GE",
  UnitedStates = "US",
  Canada = "CA",
}

export enum AddressType {
  Shipping = "shipping",
  Billing = "billing",
}

export type AdditionalAddressType = AddressType.Shipping | AddressType.Billing;
