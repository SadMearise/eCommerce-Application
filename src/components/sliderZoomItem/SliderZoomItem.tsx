import InnerImageZoom from "react-inner-image-zoom";
import { ISliderItemProps } from "../productSlider/types";

function SliderZoomItem(item: ISliderItemProps) {
  const {
    info: { url },
  } = item;

  return (
    <InnerImageZoom
      src={url ?? ""}
      zoomSrc={url}
      zoomScale={1.5}
      zoomType="hover"
      zoomPreload
    />
  );
}

export default SliderZoomItem;
