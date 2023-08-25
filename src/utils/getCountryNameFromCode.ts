import { Country, CountryCode } from "../models/types";

const countryCodeToName: { [key: string]: string } = {
  [CountryCode.Russia]: Country.Russia,
  [CountryCode.Belarus]: Country.Belarus,
  [CountryCode.Georgia]: Country.Georgia,
};

export default function getCountryNameByCode(countryCode: string): string {
  const countryName = countryCodeToName[countryCode];
  return countryName || "";
}
