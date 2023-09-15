import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import getProductCountFromCart from "../../../utils/getProductCountFromCart";

interface ICartCountState {
  count: number;
}

const initialState: ICartCountState = {
  count: await getProductCountFromCart(),
};

const cartCountSlice = createSlice({
  name: "cartCount",
  initialState,
  reducers: {
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});

export const { setCount } = cartCountSlice.actions;
export default cartCountSlice;
