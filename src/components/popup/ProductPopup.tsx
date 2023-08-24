import { Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IProductPopupProps from "./types";

function ProductPopup(props: IProductPopupProps) {
  const { isOpen, closeFunc, image } = props;

  return (
    <Dialog
      open={isOpen}
      onClose={closeFunc}
    >
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
      <img
        src={image?.url}
        alt={image?.label}
        height={image?.dimensions.h}
        role="presentation"
      />
    </Dialog>
  );
}

export default ProductPopup;
