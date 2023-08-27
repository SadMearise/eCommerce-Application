import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import Carousel from "react-material-ui-carousel";
import { useState } from "react";
import { Image } from "@commercetools/platform-sdk";
import IProductPopupProps from "./types";
import SliderItem from "../productSlider/sliderItem/SliderItem";
import styles from "./ProductPopup.module.scss";

function ProductPopup(props: IProductPopupProps) {
  const { isOpen, closeFunc, images, index } = props;

  const [, setIsInnerOpen] = useState(false);
  const [, setCurrentImage] = useState<Image>();

  return (
    <Dialog
      open={isOpen}
      onClose={closeFunc}
    >
      {/* <InnerImageZoom
        src={image?.url ?? ""}
        zoomSrc={image?.url}
        zoomScale={1.5}
        zoomType="hover"
        zoomPreload
      /> */}

      <Carousel
        autoPlay={false}
        index={index}
        navButtonsAlwaysVisible={images.length > 1}
        navButtonsAlwaysInvisible={images.length <= 1}
        indicators={false}
        fullHeightHover={false}
        className={styles.slider}
      >
        {images.map((image, i) => (
          <SliderItem
            onClickHandle={() => {
              setIsInnerOpen(true);
              setCurrentImage(image);
            }}
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            info={image}
          />
        ))}
      </Carousel>

      <IconButton
        aria-label="close"
        onClick={closeFunc}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
        className={styles.close}
      >
        <CloseIcon />
      </IconButton>
    </Dialog>
  );
}

export default ProductPopup;
