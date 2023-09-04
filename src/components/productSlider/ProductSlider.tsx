import Carousel from "react-material-ui-carousel";
import { Image } from "@commercetools/platform-sdk";
import { useState } from "react";
import styles from "./ProductSlider.module.scss";
import ProductPopup from "../productPopup/ProductPopup";
import { ISliderProps } from "./types";
import SliderItem from "./sliderItem/SliderItem";

function ProductSlider(sliderProps: ISliderProps) {
  const { images } = sliderProps;
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<Image>();

  return (
    <>
      <Carousel
        autoPlay={false}
        navButtonsAlwaysVisible={images.length > 1}
        navButtonsAlwaysInvisible={images.length <= 1}
        indicators={images.length > 1}
        fullHeightHover={false}
        navButtonsWrapperProps={{
          style: {
            height: "auto",
            width: "auto",
            margin: "-10px",
          },
        }}
        navButtonsProps={{
          style: {
            margin: "0",
          },
        }}
        className={styles.slider}
      >
        {images.map((image, i) => (
          <SliderItem
            onClickHandle={() => {
              setIsOpen(true);
              setCurrentImage(image);
            }}
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            info={image}
          />
        ))}
      </Carousel>
      <ProductPopup
        isOpen={isOpen}
        closeFunc={() => {
          setIsOpen(false);
        }}
        images={images}
        index={currentImage ? images.indexOf(currentImage) : 0}
      />
    </>
  );
}

export default ProductSlider;
