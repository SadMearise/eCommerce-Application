import { IAppTokenCache } from "./types";

const tokenCache: IAppTokenCache = {
  get() {
    const tokenStoreStr = localStorage.getItem("local_token");
    return tokenStoreStr ? JSON.parse(tokenStoreStr) : null;
  },
  set(cache) {
    localStorage.setItem("local_token", JSON.stringify(cache));
  },
  hasValidToken() {
    const cache = this.get();
    return cache?.expirationTime !== undefined && cache?.token !== undefined && cache.expirationTime >= +new Date();
  },
};

export default tokenCache;
