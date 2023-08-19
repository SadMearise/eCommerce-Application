import { CountryCode, CountryCodeMapping } from "../models/types";

const countryNameWithCode: CountryCodeMapping = {
  Russia: CountryCode.Russia,
  Belarus: CountryCode.Belarus,
  Georgia: CountryCode.Georgia,
  UnitedStates: CountryCode.UnitedStates,
  Canada: CountryCode.Canada,
};

export default function getCountryCode(countryName: string): string {
  const countryCode = countryNameWithCode[countryName];
  return countryCode;
}
