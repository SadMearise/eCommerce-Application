import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import registrationSlice from "./features/registration/registrationSlice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    registration: registrationSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
