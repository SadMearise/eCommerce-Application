import { CustomerAddress } from "../models/types";
import getCountryCode from "./getCountryCode";

export default function createDraftFromAddress(address: CustomerAddress): CustomerAddress {
  return {
    country: getCountryCode(address.country || ""),
    city: address.city || "",
    streetName: address.streetName || "",
    streetNumber: address.streetNumber || "",
    postalCode: address.postalCode || "",
  };
}
