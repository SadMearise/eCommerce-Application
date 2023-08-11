import { type TokenCache } from "@commercetools/sdk-client-v2";

const tokenCache: TokenCache = {
  get() {
    // console.log("myTokenCache GETTER!!", tokenCacheOptions);
    const tokenStoreStr = localStorage.getItem("local_token");
    if (tokenStoreStr) {
      return JSON.parse(tokenStoreStr);
    }

    return null;
  },
  set(cache) {
    // console.log("myTokenCache SETTER!!", tokenCacheOptions);
    if (!localStorage.getItem("local_token")) {
      localStorage.setItem("local_token", JSON.stringify(cache));
    }
    // console.log(cache.token);
  },
};

export default tokenCache;
