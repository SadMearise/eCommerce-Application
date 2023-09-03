import locale from "../settings";
import { setLowerCaseFirstSymbol, setUpperCaseFirstSymbol } from "./textTransform";

export const getAttributePath = (attribute: string, values: string[]) => {
  let path = `variants.attributes.${attribute}.key:`;

  values.forEach((value: string, index: number) => {
    if (index === values.length - 1) {
      path += `"${value.toLowerCase()}", `;
      path += `"${value.toUpperCase()}", `;
      path += `"${setLowerCaseFirstSymbol(value)}", `;
      path += `"${setUpperCaseFirstSymbol(value)}"`;
    } else {
      path += `"${value.toLowerCase()}", `;
      path += `"${value.toUpperCase()}", `;
      path += `"${setLowerCaseFirstSymbol(value)}", `;
      path += `"${setUpperCaseFirstSymbol(value)}", `;
    }
  });

  return path;
};

export const getSortingPath = (key: string, method: string) => {
  if (key === "name") {
    return `${key}.${locale} ${method}`;
  }
  if (key === "default") {
    return "";
  }

  return `${key} ${method}`;
};
