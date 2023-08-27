import { Image } from "@commercetools/platform-sdk";

export interface ISliderItemProps {
  key: number;
  info: Image;
  onClickHandle?: () => void;
}

export interface ISliderProps {
  images: Image[];
}
