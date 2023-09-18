import React from "react";
import { Cart, ProductProjection } from "@commercetools/platform-sdk";

export interface IProductCardProps {
  product: ProductProjection;
  url: string;
  cart: false | Cart;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
