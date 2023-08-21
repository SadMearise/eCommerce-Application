import { Customer } from "@commercetools/platform-sdk";
import { type TokenCache } from "@commercetools/sdk-client-v2";

export type TLoginResponse = {
  customer?: Customer;
  isLoggined: boolean;
  error?: string;
};

export interface IAppTokenCache extends TokenCache {
  hasValidToken(): boolean;
  disposeToken(): void;
}
