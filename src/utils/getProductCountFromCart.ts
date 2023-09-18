import { getCarts } from "../services/cart.service";

const getProductCountFromCart = async () => {
  const myGetCarts = (await getCarts()).body.results;
  if (myGetCarts.length > 0) {
    const counter = myGetCarts[0].lineItems.reduce((accum, cart) => accum + cart.quantity, 0);
    return counter;
  }
  return 0;
};

export default getProductCountFromCart;
