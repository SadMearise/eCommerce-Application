import InnerImageZoom from "react-inner-image-zoom";
import { ISliderItemProps } from "../productSlider/types";
import styles from "./SliderZoomItem.module.scss";

function SliderZoomItem(item: ISliderItemProps) {
  const {
    info: { url },
  } = item;

  return (
    <InnerImageZoom
      className={styles.zoom}
      src={url ?? ""}
      zoomSrc={url}
      zoomScale={1.5}
      zoomType="hover"
      zoomPreload
    />
  );
}

export default SliderZoomItem;
