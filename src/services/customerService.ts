import { ClientResponse, CustomerDraft, CustomerSignInResult } from "@commercetools/platform-sdk";
import getApiRoot from "./BuildClient";
import { ICustomer } from "../models/types";
import createDraftFromAddress from "../utils/createDraftFromAddress";

const apiRoot = getApiRoot();

const createCustomer = async (customerData: ICustomer): Promise<ClientResponse<CustomerSignInResult>> => {
  const {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    defaultShippingAddress,
    defaultBillingAddress,
    billingIsShipping,
    shippingAddress,
    billingAddress,
  } = customerData;

  const shippingAddressDraft = createDraftFromAddress(shippingAddress);
  const billingAddressDraft = createDraftFromAddress(billingAddress);

  const DEFAULT_SHIPPING_INDEX = 0;
  let billingIndex = 1;
  const addressesDrafts = [shippingAddressDraft, billingAddressDraft];

  if (billingIsShipping) {
    billingIndex = 0;
    addressesDrafts.pop();
  }

  const defaultShippingAddressIndex = defaultShippingAddress ? DEFAULT_SHIPPING_INDEX : undefined;
  const defaultBillingAddressIndex = defaultBillingAddress ? billingIndex : undefined;
  const shippingAddressIndex = 0;
  const billingAddressIndex = billingIsShipping ? 0 : 1;

  const customerDraft: CustomerDraft = {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    addresses: addressesDrafts,
    defaultShippingAddress: defaultShippingAddressIndex,
    defaultBillingAddress: defaultBillingAddressIndex,
    shippingAddresses: [shippingAddressIndex],
    billingAddresses: [billingAddressIndex],
  };

  return apiRoot.customers().post({ body: customerDraft }).execute();
};

export default createCustomer;
