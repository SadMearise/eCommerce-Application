import { createSlice } from "@reduxjs/toolkit";
import { Customer } from "@commercetools/platform-sdk";

interface IUser {
  info: Customer | null;
}

const initialState: IUser = {
  info: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action): void => {
      state.info = action.payload;
    },
    logout: (state): void => {
      state.info = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice;
