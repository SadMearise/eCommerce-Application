import { CustomerAddress } from "../models/types";

export default function areAddressesEqual(address1: CustomerAddress, address2: CustomerAddress): boolean {
  return (
    address1.country === address2.country &&
    address1.city === address2.city &&
    address1.streetName === address2.streetName &&
    address1.streetNumber === address2.streetNumber &&
    address1.postalCode === address2.postalCode
  );
}
