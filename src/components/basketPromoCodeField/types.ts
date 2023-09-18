import { DiscountCodeInfo } from "@commercetools/platform-sdk";
import { Dispatch, SetStateAction } from "react";

export interface BasketPromoCodeFieldProps {
  shoppingCartID: string;
  shoppingCartVersion: number;
  shoppingCartDiscountCodes: DiscountCodeInfo[];
  isChanging: boolean;
  setIsChanging: Dispatch<SetStateAction<boolean>>;
  handleUpdateShoppingCart: () => void;
}
