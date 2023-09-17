import { ClientBuilder, HttpMiddlewareOptions } from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import tokenCache from "./TokenCash";
import CLIENT_DATA from "./constants";

const { projectKey, clientSecret, clientId, authURL, apiURL, scopes } = CLIENT_DATA;

const anonymousSessionFlowOptions = {
  host: authURL,
  projectKey,
  credentials: {
    clientId,
    clientSecret,
  },
  tokenCache,
  scopes,
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiURL,
  fetch,
};

const client = new ClientBuilder()
  .withAnonymousSessionFlow(anonymousSessionFlowOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build();

export default function getAnonymousApiRoot() {
  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
}
