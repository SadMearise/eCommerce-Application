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
  handleReadOnlyClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface AddressDataProps extends Omit<PersonalDataProps, "userData"> {
  shippingAddressData: BaseAddress[];
  billingAddressData: BaseAddress[];
  defaultShippingAddressData?: BaseAddress[];
  defauultBillingAddressData?: BaseAddress[];
}

export enum AddressType {
  ShippingAddress = "Shipping address:",
  BillingAddress = "Billing address:",
  DefaultShippingAddress = "Default shipping address:",
  DefaultBillingAddress = "Default billing address:",
}
export interface AddressFieldProps {
  addressType: AddressType;
  addressData: BaseAddress[];
  handleReadOnlyClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
