import { BaseAddress } from "@commercetools/platform-sdk";
import getCountryCode from "./getCountryCode";

export default function createDraftFromAddress(address: BaseAddress): BaseAddress {
  return {
    country: getCountryCode(address.country || ""),
    city: address.city || "",
    streetName: address.streetName || "",
    streetNumber: address.streetNumber || "",
    postalCode: address.postalCode || "",
  };
}
