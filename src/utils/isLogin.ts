import tokenCache from "../services/TokenCash";

const isLogin = (): boolean | undefined => {
  let loginState: boolean | undefined = false;

  if (tokenCache.get()) {
    loginState = Object.prototype.hasOwnProperty.call(tokenCache.get(), "isLogin") ? tokenCache.get().isLogin : false;
  }

  return loginState;
};

export default isLogin;
