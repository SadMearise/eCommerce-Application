import { Image } from "@commercetools/platform-sdk";

interface IProductPopupProps {
  isOpen: boolean;
  closeFunc: () => void;
  images: Image[];
  index: number;
  // image: Image | undefined;
}

export default IProductPopupProps;
