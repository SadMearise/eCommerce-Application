import tokenCache from "../services/TokenCash";

describe("tokenCache", () => {
  afterEach(() => {
    localStorage.clear();
  });

  test("set and get token cache", () => {
    const cache = { token: "exampleToken", expirationTime: +new Date() + 3600000 }; // Токен на 1 час

    tokenCache.set(cache);
    const retrievedCache = tokenCache.get();

    expect(retrievedCache).toEqual(cache);
  });

  test("check if token is valid", () => {
    const validCache = { token: "exampleToken", expirationTime: +new Date() + 3600000, refreshToken: "kratkoe" };
    const invalidCache = { token: "expiredToken", expirationTime: +new Date() - 3600000, refreshToken: "kratkoe" };

    tokenCache.set(validCache);
    expect(tokenCache.hasValidToken()).toBe(true);

    tokenCache.set(invalidCache);
    expect(tokenCache.hasValidToken()).toBe(false);
  });
});
