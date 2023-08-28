import {
  BaseAddress,
  ClientResponse,
  Customer,
  CustomerChangeAddressAction,
  CustomerDraft,
  CustomerSignInResult,
} from "@commercetools/platform-sdk";
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
  const DEFAULT_BILLING_INDEX = 1;
  const addressesDrafts = [shippingAddressDraft, billingAddressDraft];
  const defaultShippingAddressIndex = defaultShippingAddress ? DEFAULT_SHIPPING_INDEX : undefined;
  const defaultBillingAddressIndex = defaultBillingAddress ? DEFAULT_BILLING_INDEX : undefined;
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

export const getCustomerInfo = async (): Promise<ClientResponse<Customer>> => {
  const getUser = await apiRoot.me().get().execute();
  return getUser;
};

export const updateCustomerInfo = async (
  customerID: string,
  addressVersion: number,
  addressID: string,
  address: BaseAddress
) => {
  const addressDraft = createDraftFromAddress(address);
  const actions: CustomerChangeAddressAction = {
    action: "changeAddress",
    addressId: addressID,
    address: addressDraft,
  };

  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version: addressVersion,
        actions: [actions],
      },
    })
    .execute();
};
