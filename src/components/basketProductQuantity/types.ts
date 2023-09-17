import { LineItem } from "@commercetools/platform-sdk";
import { Dispatch, SetStateAction } from "react";

export interface BasketProductQuantityProps {
  product: LineItem;
  shoppingCartVersion: number;
  cartId: string;
  isChanging: boolean;
  setIsChanging: Dispatch<SetStateAction<boolean>>;
  handleUpdateShoppingCart: () => void;
}
