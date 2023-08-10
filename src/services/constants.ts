import { CTP_PROJECT_KEY, CTP_CLIENT_SECRET, CTP_CLIENT_ID, CTP_AUTH_URL, CTP_API_URL, CTP_SCOPES } from "../../env";

type TClientData = {
  projectKey: string;
  clientSecret: string;
  clientId: string;
  authURL: string;
  apiURL: string;
  scopes: string[];
};

const CLIENT_DATA: TClientData = {
  projectKey: CTP_PROJECT_KEY || "",
  clientSecret: CTP_CLIENT_SECRET || "",
  clientId: CTP_CLIENT_ID || "",
  authURL: CTP_AUTH_URL || "",
  apiURL: CTP_API_URL || "",
  scopes: CTP_SCOPES || [""],
};

export default CLIENT_DATA;
