import { ClientResponse, Customer } from "@commercetools/platform-sdk";

export interface IState {
  user: {
    customer: ClientResponse<Customer>;
  };
}
