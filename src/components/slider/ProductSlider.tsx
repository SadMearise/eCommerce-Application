import Carousel from "react-material-ui-carousel";
import { Image } from "@commercetools/platform-sdk";
import Item from "./Item";

export interface ISliderProps {
  images: Image[];
}

function ProductSlider(sliderProps: ISliderProps) {
  const { images } = sliderProps;

  return (
    <Carousel autoPlay={false}>
      {images.map((image, i) => (
        <Item
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          info={image}
        />
      ))}
    </Carousel>
  );
}

export default ProductSlider;
