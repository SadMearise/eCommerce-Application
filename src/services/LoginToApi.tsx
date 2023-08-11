import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { ClientBuilder, HttpMiddlewareOptions, type PasswordAuthMiddlewareOptions } from "@commercetools/sdk-client-v2";
import CLIENT_DATA from "./constants";
import tokenCache from "./TokenCash";

const { projectKey, clientSecret, clientId, authURL, apiURL, scopes } = CLIENT_DATA;

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiURL,
  fetch,
};

async function loginToApi(username: string, password: string) {
  const passwordOptions: PasswordAuthMiddlewareOptions = {
    host: authURL,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
      user: {
        username,
        password,
      },
    },
    tokenCache,
    scopes,
    fetch,
  };

  const ctpClient = new ClientBuilder()
    .withPasswordFlow(passwordOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  const root = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });
  const customerResponse = await root.me().get().execute();
  return customerResponse;
}

export default loginToApi;
