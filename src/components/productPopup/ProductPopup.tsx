import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import Carousel from "react-material-ui-carousel";
import IProductPopupProps from "./types";
import SliderZoomItem from "../sliderZoomItem/SliderZoomItem";
import styles from "./ProductPopup.module.scss";

export default function ProductPopup(props: IProductPopupProps) {
  const { isOpen, closeFunc, images, index } = props;

  return (
    <Dialog
      open={isOpen}
      onClose={closeFunc}
    >
      <Carousel
        autoPlay={false}
        index={index}
        navButtonsAlwaysVisible={images.length > 1}
        navButtonsAlwaysInvisible={images.length <= 1}
        indicators={images.length > 1}
        fullHeightHover={false}
        className={styles.slider}
      >
        {images.map((image, i) => (
          <SliderZoomItem
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
