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
  billingIsShipping: boolean;
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

export enum StatusCodes {
  Ok = 200,
}

export type AdditionalAddressType = AddressType.Shipping | AddressType.Billing;

export type TCatalogFilterValues = Record<string, string[]>;

export enum SortingMethods {
  asc = "asc",
  desc = "desc",
}
