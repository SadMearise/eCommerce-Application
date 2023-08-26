import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import IProductPopupProps from "./types";

function ProductPopup(props: IProductPopupProps) {
  const { isOpen, closeFunc, image } = props;

  return (
    <Dialog
      open={isOpen}
      onClose={closeFunc}
    >
      <InnerImageZoom
        src={image?.url ?? ""}
        zoomSrc={image?.url}
        zoomScale={1.5}
        zoomType="hover"
        zoomPreload
      />

      <IconButton
        aria-label="close"
        onClick={closeFunc}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </Dialog>
  );
}

export default ProductPopup;
