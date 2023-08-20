import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface RegistrationState {
  isSuccess: boolean;
}

const initialState: RegistrationState = {
  isSuccess: false,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setRegistrationSuccess: (state, action: PayloadAction<boolean>) => {
      state.isSuccess = action.payload;
    },
  },
});

export const { setRegistrationSuccess } = registrationSlice.actions;
export default registrationSlice;
