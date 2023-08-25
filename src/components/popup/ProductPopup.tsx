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
      {/* <img
        src={image?.url}
        alt={image?.label}
        height={image?.dimensions.h}
        role="presentation"
      /> */}
      <InnerImageZoom
        className={styles.picture}
        src={image?.url ?? ""}
        zoomSrc={image?.url}
        zoomScale={1.5}
        // src="https://images.unsplash.com/photo-1573612664822-d7d347da7b80?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NTQ4MTA4OA&ixlib=rb-1.2.1&q=85&w=1280"
        // zoomSrc="https://images.unsplash.com/photo-1573612664822-d7d347da7b80?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0NTQ4MTA4OA&ixlib=rb-1.2.1&q=85&w=1600"
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
