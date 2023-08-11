import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type TokenCache,
  type ExistingTokenMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import CLIENT_DATA from "./constants";

const { projectKey, clientSecret, clientId, authURL, apiURL, scopes } = CLIENT_DATA;

const myTokenCache: TokenCache = {
  get(tokenCacheOptions) {
    console.log("myTokenCache GETTER!!", tokenCacheOptions);
    const tokenStoreStr = localStorage.getItem("local_token");
    if (tokenStoreStr) {
      return JSON.parse(tokenStoreStr);
    }

    return null;
  },
  set(cache, tokenCacheOptions) {
    console.log("myTokenCache SETTER!!", tokenCacheOptions);
    if (!localStorage.getItem("local_token")) {
      localStorage.setItem("local_token", JSON.stringify(cache));
    }
    console.log(cache.token);
  },
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiURL,
  fetch,
};

const options: ExistingTokenMiddlewareOptions = {
  force: true,
};

export function getApiRoot() {
  const tokenStore = myTokenCache.get(undefined);
  const token = tokenStore?.token;
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: authURL,
    projectKey,
    credentials: {
      clientId,
      clientSecret,
    },
    tokenCache: myTokenCache,
    scopes,
    fetch,
  };

  const authorization: string = token;
  const tokenCtpClient = new ClientBuilder()
    .withExistingTokenFlow(authorization, options)
    // .withPasswordFlow(passwordOptions)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  return createApiBuilderFromCtpClient(tokenCtpClient).withProjectKey({ projectKey });
}

export async function attemptLogin(username: string, password: string) {
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
    tokenCache: myTokenCache,
    scopes,
    fetch,
  };

  // const { token } = myTokenCache.get(undefined);

  // const authorization: string = token;

  const ctpClient = new ClientBuilder()
    // .withExistingTokenFlow(authorization, options)
    .withPasswordFlow(passwordOptions)
    // .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    // .withLoggerMiddleware()
    .build();
  const root = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });
  const aboutMe = await root.me().get().execute();
  return aboutMe;
}
