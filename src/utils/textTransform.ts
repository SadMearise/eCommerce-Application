export const setUpperCaseFirstSymbol = (str: string) => {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
};

export const setLowerCaseFirstSymbol = (str: string) => {
  if (!str) return str;

  return str[0].toLowerCase() + str.slice(1);
};
