import { CountryCodeMapping } from "../models/types";

const countryNameWithCode: CountryCodeMapping = {
  Russia: "RU",
  Belarus: "BY",
  Georgia: "GE",
  UnitedStates: "US",
  Canada: "CA",
};

export default function getCountryCode(countryName: string): string {
  const countryCode = countryNameWithCode[countryName];
  return countryCode;
}
