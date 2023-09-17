import { getActiveCart } from "../services/cart.service";

const getProductCountFromCart = async () => {
  const cart = await getActiveCart();

  return cart ? cart.lineItems.reduce((acc, item) => acc + item.quantity, 0) : 0;
};

export default getProductCountFromCart;
