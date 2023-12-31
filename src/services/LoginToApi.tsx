import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { ClientBuilder, HttpMiddlewareOptions, type PasswordAuthMiddlewareOptions } from "@commercetools/sdk-client-v2";
import CLIENT_DATA from "./constants";
import tokenCache from "./TokenCash";
import { TLoginResponse } from "./types";
import getAnonymousApiRoot from "./AnonymousClient";

const { projectKey, clientSecret, clientId, authURL, apiURL, scopes } = CLIENT_DATA;

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiURL,
  fetch,
};

async function loginToApi(username: string, password: string): Promise<TLoginResponse> {
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

  try {
    const rootApi = getAnonymousApiRoot();
    await rootApi
      .me()
      .login()
      .post({ body: { email: username, password, activeCartSignInMode: "MergeWithExistingCustomerCart" } })
      .execute();

    tokenCache.disposeToken();
    const root = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });
    const userInfo = await root.me().get().execute();

    tokenCache.set({ ...tokenCache.get(), isLogin: true });
    return { isLoggined: true, customer: userInfo.body };
  } catch (error) {
    return { isLoggined: false, error: `${error}` };
  }
}

export default loginToApi;
