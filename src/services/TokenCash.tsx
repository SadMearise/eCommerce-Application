import { type TokenCache } from "@commercetools/sdk-client-v2";

interface AppTokenCache extends TokenCache {
  hasValidToken(): boolean;
}

const tokenCache: AppTokenCache = {
  get() {
    const tokenStoreStr = localStorage.getItem("local_token");
    if (tokenStoreStr) {
      return JSON.parse(tokenStoreStr);
    }
    return null;
  },
  set(cache) {
    localStorage.setItem("local_token", JSON.stringify(cache));
  },
  hasValidToken() {
    const cache = this.get();
    if (!cache?.expirationTime) return false;
    if (!cache?.token) return false;
    if (cache.expirationTime < +new Date()) return false;
    return true;
  },
};

export default tokenCache;
