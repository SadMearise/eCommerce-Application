import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from "@commercetools/sdk-client-v2";

const projectKey = "kratkoe";
const clientID = "dRNDZ4QTkb1DlBx2-nXKWPQ6";
const clientSecret = "kqDUba4Kic80DroP55ZJGf31fPZSo5aM";
const region = "europe-west1.gcp";
const scopes = [
  `view_categories:${projectKey}`,
  `view_published_products:${projectKey}`,
  `manage_my_profile:${projectKey}`,
  `manage_customers:${projectKey}`,
];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `https://auth.${region}.commercetools.com`,
  projectKey,
  credentials: {
    clientId: clientID,
    clientSecret,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `https://api.${region}.commercetools.com`,
  fetch,
};

const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export default function getApiRoot() {
  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });
}
