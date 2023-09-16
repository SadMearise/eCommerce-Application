import RouterPaths from "../../router/routes";

export type TPage = {
  name: string;
  path: RouterPaths;
};

export type TPages = Record<string, TPage>;
