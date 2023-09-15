import { RootState } from "../../store";

const cartCount = (state: RootState) => state.cartCount.count;

export default cartCount;
