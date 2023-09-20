import { Dispatch, SetStateAction } from "react";

export interface BasketPromoCodeFieldProps {
  shoppingCartID: string;
  isChanging: boolean;
  setIsChanging: Dispatch<SetStateAction<boolean>>;
  handleUpdateShoppingCart: () => void;
}
