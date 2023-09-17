import tokenCache from "../services/TokenCash";

const isLogin = (): boolean => {
  const tokenData = tokenCache.get();

  return !!tokenData && !!tokenData.isLogin;
};

export default isLogin;
