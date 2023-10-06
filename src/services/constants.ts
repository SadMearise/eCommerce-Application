type TClientData = {
  projectKey: string;
  clientSecret: string;
  clientId: string;
  authURL: string;
  apiURL: string;
  scopes: string[];
};

const CLIENT_DATA: TClientData = {
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY || "",
  clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET || "",
  clientId: import.meta.env.VITE_CTP_CLIENT_ID || "",
  authURL: import.meta.env.VITE_CTP_AUTH_URL || "",
  apiURL: import.meta.env.VITE_CTP_API_URL || "",
  scopes: import.meta.env.VITE_CTP_SCOPES.split(" ") || [""],
};

export default CLIENT_DATA;
