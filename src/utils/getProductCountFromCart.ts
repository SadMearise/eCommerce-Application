import { getActiveCart } from "../services/cart.service";

const getProductCountFromCart = async () => {
  const cart = await getActiveCart();

  return cart ? cart.lineItems.length : 0;
};

export default getProductCountFromCart;
