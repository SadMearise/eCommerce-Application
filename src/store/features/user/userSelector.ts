import { RootState } from "../../store";

const selectUserInfo = (state: RootState) => state.user.info;

export default selectUserInfo;
