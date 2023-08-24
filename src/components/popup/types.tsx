import { Image } from "@commercetools/platform-sdk";

interface IProductPopupProps {
  isOpen: boolean;
  closeFunc: () => void;
  image: Image | undefined;
}

export default IProductPopupProps;
