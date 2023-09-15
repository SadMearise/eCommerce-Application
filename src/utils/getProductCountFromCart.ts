import { getActiveCart } from "../services/cart.service";

const getProductCountFromCart = async () => {
  const cart = await getActiveCart();

  if (!cart) return 0;

  return cart.lineItems.length;
};

export default getProductCountFromCart;
