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
    shippingAddress,
    billingAddress,
  } = customerData;

  const shippingAddressDraft = createDraftFromAddress(shippingAddress);
  const billingAddressDraft = createDraftFromAddress(billingAddress);

  const DEFAULT_SHIPPING_INDEX = 0;
  const DEFAULT_BILLING_INDEX = 1;

  const defaultShippingAddressIndex = defaultShippingAddress ? DEFAULT_SHIPPING_INDEX : undefined;
  const defaultBillingAddressIndex = defaultBillingAddress ? DEFAULT_BILLING_INDEX : undefined;

  const addressesDrafts = [shippingAddressDraft, billingAddressDraft];

  const customerDraft: CustomerDraft = {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    addresses: addressesDrafts,
    defaultShippingAddress: defaultShippingAddressIndex,
    defaultBillingAddress: defaultBillingAddressIndex,
  };

  return apiRoot.customers().post({ body: customerDraft }).execute();
};

export default createCustomer;
