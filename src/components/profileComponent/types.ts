import { BaseAddress, Customer } from "@commercetools/platform-sdk";
import React from "react";

export interface shippingAddress {
  shippingCountry: string;
  City: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
}

export interface PersonalDataProps {
  userData: Customer;
  version: number;
  handleChangeDataVersion: (version: number) => void;
  handleUpdateUserData: () => void;
  handleReadOnlyClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface AddressDataProps {
  userId: string;
  version: number;
  shippingAddressData: BaseAddress[];
  billingAddressData: BaseAddress[];
  defaultShippingAddressData?: BaseAddress[];
  defaultBillingAddressData?: BaseAddress[];
  handleReadOnlyClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleChangeDataVersion: (version: number) => void;
}

export enum AddressType {
  ShippingAddress = "shipping",
  BillingAddress = "billing",
  DefaultShippingAddress = "default shipping address",
  DefaultBillingAddress = "default billing address",
}
export enum AddressTitle {
  ShippingAddress = "Shipping address:",
  BillingAddress = "Billing address:",
  DefaultShippingAddress = "Default shipping address:",
  DefaultBillingAddress = "Default billing address:",
}
export interface AddressFieldProps {
  userId: string;
  dataVersion: number;
  addressTitle: AddressTitle;
  addressData: BaseAddress;
  checkboxesState: { [key: string]: boolean };
  handleReadOnlyClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleChangeAddress: (
    id: string,
    versionNumber: number,
    addressId: string,
    values: BaseAddress,
    selectedCheckboxes: { [key: string]: boolean }
  ) => void;
  handleDeleteAddress: (id: string, dataVersion: number, addressId: string) => void;
  handleCheckboxChange: (name: string) => void;
  resetCheckboxes: () => void;
}

export interface PasswrodDateProps {
  userId: string;
  email: string;
  version: number;
  handleChangeDataVersion: (version: number) => void;
}

export interface TouchedFieldsPersonal {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
}
export interface TouchedFieldsAddress {
  country: boolean;
  city: boolean;
  streetName: boolean;
  streetNumber: boolean;
  postalCode: boolean;
}
