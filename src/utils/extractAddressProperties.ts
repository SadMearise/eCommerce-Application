import { BaseAddress } from "@commercetools/platform-sdk";

type ExtractedAddressProperties = {
  country: string | undefined;
  city: string | undefined;
  streetName: string | undefined;
  streetNumber: string | undefined;
  postalCode: string | undefined;
};

export default function extractAddressProperties(
  addressArray: BaseAddress[],
  index: number = 0
): ExtractedAddressProperties {
  const { country, city, streetName, streetNumber, postalCode } = addressArray[index];
  return { country, city, streetName, streetNumber, postalCode };
}
