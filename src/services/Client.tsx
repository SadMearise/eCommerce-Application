import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from "@commercetools/sdk-client-v2";
import CLIENT_DATA from "./constants";

const { projectKey, clientSecret, clientId, authURL, apiURL, scopes } = CLIENT_DATA;

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: authURL,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiURL,
  fetch,
};

const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export default function getDefaultApiRoot() {
  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });
}
