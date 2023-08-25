import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import IProductPopupProps from "./types";
import styles from "./ProductPopup.module.scss";

function ProductPopup(props: IProductPopupProps) {
  const { isOpen, closeFunc, image } = props;

  return (
    <Dialog
      className={styles.popup}
      open={isOpen}
      onClose={closeFunc}
    >
      <InnerImageZoom
        className={styles.picture}
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
