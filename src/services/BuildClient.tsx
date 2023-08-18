import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type ExistingTokenMiddlewareOptions,
  HttpMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import CLIENT_DATA from "./constants";
import tokenCache from "./TokenCash";

const { projectKey, clientSecret, clientId, authURL, apiURL, scopes } = CLIENT_DATA;

const options: ExistingTokenMiddlewareOptions = {
  force: true,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiURL,
  fetch,
};

export default function getApiRoot() {
  const tokenStore = tokenCache.get(undefined);
  const token = tokenStore?.token;
  const authMiddlewareOptions: AuthMiddlewareOptions = {
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

  const authorization: string = token;
  const tokenCtpClient = new ClientBuilder()
    .withExistingTokenFlow(authorization, options)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  return createApiBuilderFromCtpClient(tokenCtpClient).withProjectKey({ projectKey });
}
