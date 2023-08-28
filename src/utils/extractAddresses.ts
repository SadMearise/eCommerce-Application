import { BaseAddress, Customer } from "@commercetools/platform-sdk";

type ExtractedAddressProperties = {
  country: string;
  id: string | undefined;
  city: string | undefined;
  streetName: string | undefined;
  streetNumber: string | undefined;
  postalCode: string | undefined;
};

export function extractAddresses(userData: Customer, addressIds: string[]): BaseAddress[] {
  if (userData && userData.addresses && addressIds) {
    return userData.addresses.filter((address) => addressIds.includes(address.id as string));
  }
  return [];
}
export function extractAddressProperties(addressArray: BaseAddress[], index: number = 0): ExtractedAddressProperties {
  const { id, country, city, streetName, streetNumber, postalCode } = addressArray[index];
  return { id, country, city, streetName, streetNumber, postalCode };
}

export function extractAddressesFromIds(user: Customer, addressIds: string[]): BaseAddress[] {
  const addresses = addressIds
    .map((addressId) => user.addresses.find((address) => address.id === addressId))
    .filter((address) => address !== undefined) as BaseAddress[];

  return addresses;
}
