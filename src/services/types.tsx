import { Customer } from "@commercetools/platform-sdk";
import { TokenCacheOptions } from "@commercetools/sdk-client-v2";

export type TLoginResponse = {
  customer?: Customer;
  isLoggined: boolean;
  error?: string;
};

type TTokenStore = {
  token: string;
  expirationTime: number;
  refreshToken?: string;
  isLogin?: boolean;
};

type TTokenCache = {
  get: (tokenCacheOptions?: TokenCacheOptions) => TTokenStore;
  set: (cache: TTokenStore, tokenCacheOptions?: TokenCacheOptions) => void;
};

export interface IAppTokenCache extends TTokenCache {
  hasValidToken(): boolean;
  disposeToken(): void;
}

export interface changePassword {
  id: string;
  version: number;
  currentPassword: string;
  newPassword: string;
}
