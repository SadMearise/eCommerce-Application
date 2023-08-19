import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import registrationSlice from "./features/registrationSlice";

const rootReducer = combineReducers({
  user: userReducer,
  registration: registrationSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
