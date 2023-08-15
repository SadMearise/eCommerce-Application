/* eslint-disable operator-linebreak */
import { ClientResponse, CustomerDraft, CustomerSignInResult } from "@commercetools/platform-sdk";
import getApiRoot from "./BuildClient";
import { ICustomer } from "../models/types";
import areAddressesEqual from "../utils/areAddressessEqual";
import createDraftFromAddress from "../utils/createDraftFromAddress";

const apiRoot = getApiRoot();

const createCustomer = async (customerData: ICustomer): Promise<ClientResponse<CustomerSignInResult>> => {
  const {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    address,
    defaultShippingAddress,
    defaultBillingAddress,
    shippingAddress,
    billingAddress,
  } = customerData;

  const addressDraft = createDraftFromAddress(address);
  const shippingAddressDraft = createDraftFromAddress(shippingAddress);
  const billingAddressDraft = createDraftFromAddress(billingAddress);

  const defaultShippingAddressIndex = defaultShippingAddress ? 0 : undefined;
  const defaultBillingAddressIndex = defaultBillingAddress ? 0 : undefined;

  const addressesDrafts = [addressDraft];
  if (!defaultShippingAddressIndex && shippingAddress && !areAddressesEqual(addressDraft, shippingAddressDraft)) {
    addressesDrafts.push(shippingAddressDraft);
  }

  if (!defaultBillingAddressIndex && billingAddress && !areAddressesEqual(addressDraft, billingAddressDraft)) {
    addressesDrafts.push(billingAddressDraft);
  }

  const shippingAddressDraftIndex = addressesDrafts.includes(shippingAddressDraft)
    ? [addressesDrafts.indexOf(shippingAddressDraft)]
    : undefined;

  const billingAddressDraftIndex = addressesDrafts.includes(billingAddressDraft)
    ? [addressesDrafts.indexOf(billingAddressDraft)]
    : undefined;

  const customerDraft: CustomerDraft = {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    addresses: addressesDrafts,
    defaultShippingAddress: defaultShippingAddressIndex,
    defaultBillingAddress: defaultBillingAddressIndex,
    shippingAddresses: shippingAddressDraftIndex,
    billingAddresses: billingAddressDraftIndex,
  };

  return apiRoot.customers().post({ body: customerDraft }).execute();
};

export default createCustomer;
