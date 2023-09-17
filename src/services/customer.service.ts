import {
  BaseAddress,
  ClientResponse,
  Customer,
  CustomerAddAddressAction,
  CustomerChangeEmailAction,
  CustomerChangePassword,
  CustomerDraft,
  CustomerRemoveAddressAction,
  CustomerSetDateOfBirthAction,
  CustomerSetFirstNameAction,
  CustomerSetLastNameAction,
  CustomerSignInResult,
  CustomerUpdateAction,
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
    billingIsShipping,
    defaultShippingAddress,
    defaultBillingAddress,
    shippingAddress,
    billingAddress,
  } = customerData;

  const shippingAddressDraft = createDraftFromAddress(shippingAddress);
  const billingAddressDraft = createDraftFromAddress(billingAddress);

  const DEFAULT_SHIPPING_INDEX = 0;
  const DEFAULT_BILLING_INDEX = billingIsShipping ? 0 : 1;
  const addressesDrafts = billingIsShipping ? [shippingAddressDraft] : [shippingAddressDraft, billingAddressDraft];
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
  address: BaseAddress,
  addressIdentifiers: ("shipping" | "billing" | "defaultShipping" | "defaultBilling")[]
) => {
  const addressDraft = createDraftFromAddress(address);
  const actions: CustomerUpdateAction[] = [
    {
      action: "changeAddress",
      addressId: addressID,
      address: addressDraft,
    },
  ];

  addressIdentifiers.forEach((addressIdentifier) => {
    if (addressIdentifier === "shipping") {
      actions.push({
        action: "addShippingAddressId",
        addressId: addressID,
      });
    }
    if (addressIdentifier === "billing") {
      actions.push({
        action: "addBillingAddressId",
        addressId: addressID,
      });
    }
    if (addressIdentifier === "defaultShipping") {
      actions.push({
        action: "setDefaultShippingAddress",
        addressId: addressID,
      });
    }
    if (addressIdentifier === "defaultBilling") {
      actions.push({
        action: "setDefaultBillingAddress",
        addressId: addressID,
      });
    }
  });

  try {
    await apiRoot
      .customers()
      .withId({ ID: customerID })
      .post({
        body: {
          version: addressVersion,
          actions,
        },
      })
      .execute();
  } catch (error) {
    throw new Error(`An error occurred while update customer info: ${error}`);
  }
};

export const updatePersonalDataCustomer = async (customerID: string, version: number, value: CustomerDraft) => {
  const setFirstName: CustomerSetFirstNameAction = {
    action: "setFirstName",
    firstName: value.firstName,
  };
  const setLastName: CustomerSetLastNameAction = {
    action: "setLastName",
    lastName: value.lastName,
  };
  const setBirthday: CustomerSetDateOfBirthAction = {
    action: "setDateOfBirth",
    dateOfBirth: value.dateOfBirth,
  };
  const setEmail: CustomerChangeEmailAction = {
    action: "changeEmail",
    email: value.email,
  };

  return apiRoot
    .customers()
    .withId({ ID: customerID })
    .post({
      body: {
        version,
        actions: [setFirstName, setLastName, setBirthday, setEmail],
      },
    })
    .execute();
};

export const changeCustomerPassword = ({ id, version, currentPassword, newPassword }: CustomerChangePassword) =>
  apiRoot
    .customers()
    .password()
    .post({
      body: {
        id,
        version,
        currentPassword,
        newPassword,
      },
    })
    .execute();

export const addAddressToCustomer = (id: string, version: number, address: BaseAddress) => {
  const addressDraft = createDraftFromAddress(address);
  const addAddress: CustomerAddAddressAction = {
    action: "addAddress",
    address: addressDraft,
  };

  return apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version,
        actions: [addAddress],
      },
    })
    .execute();
};
export const addAddressIdentifier = (
  userId: string,
  version: number,
  addressId: string,
  addressIdentifiers: ("shipping" | "billing" | "defaultShipping" | "defaultBilling")[]
) => {
  const actions = addressIdentifiers
    .map((addressIdentifier) => {
      if (addressIdentifier === "shipping") {
        return {
          action: "addShippingAddressId",
          addressId,
        };
      }
      if (addressIdentifier === "billing") {
        return {
          action: "addBillingAddressId",
          addressId,
        };
      }
      if (addressIdentifier === "defaultShipping") {
        return {
          action: "setDefaultShippingAddress",
          addressId,
        };
      }
      if (addressIdentifier === "defaultBilling") {
        return {
          action: "setDefaultBillingAddress",
          addressId,
        };
      }

      return null;
    })
    .filter((action) => action !== null) as CustomerUpdateAction[];

  return apiRoot
    .customers()
    .withId({ ID: userId })
    .post({
      body: {
        version,
        actions,
      },
    })
    .execute();
};
export const getCustomerVersionByID = async (id: string) => {
  const user = await apiRoot.customers().withId({ ID: id }).get().execute();
  return user.body.version;
};

export const removeAddressByID = (id: string, version: number, addressId: string) => {
  const deleteAddressAction: CustomerRemoveAddressAction = {
    action: "removeAddress",
    addressId,
  };

  return apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version,
        actions: [deleteAddressAction],
      },
    })
    .execute();
};

export const removeDefaultAddress = (id: string, version: number, addressId: string) => {
  const deleteAddressAction: CustomerRemoveAddressAction = {
    action: "removeAddress",
    addressId,
  };

  return apiRoot
    .customers()
    .withId({ ID: id })
    .post({
      body: {
        version,
        actions: [deleteAddressAction],
      },
    })
    .execute();
};
