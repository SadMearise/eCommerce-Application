import { Customer } from "@commercetools/platform-sdk";

type TLoginResponse = {
  customer?: Customer;
  isLoggined: boolean;
  error?: string;
};

export default TLoginResponse;
