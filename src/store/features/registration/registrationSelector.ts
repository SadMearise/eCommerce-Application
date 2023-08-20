import { RootState } from "../../store";

const isSuccess = (state: RootState) => state.registration.isSuccess;

export default isSuccess;
