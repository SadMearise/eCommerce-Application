import { Backdrop, Button, Fade, Modal, Typography } from "@mui/material";
import { useState } from "react";
import styles from "./BasketClearButton.module.scss";
import { BasketClearButtonProps } from "./types";

export default function BasketClearButton({ handleClearShoppingCart, isChanging }: BasketClearButtonProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <div>
        <Button
          onClick={handleOpen}
          disabled={isChanging}
        >
          Clear Shopping Cart
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <div className={styles["modal-wrapper"]}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                sx={{ borderBottom: "1px solid black" }}
              >
                Clear shopping cart
              </Typography>
              <Typography
                id="transition-modal-description"
                sx={{ mt: 2, color: "#808d9a" }}
              >
                Are you sure you want to delete products? It will be impossible to cancel this action.
              </Typography>
              <div className={styles["button-wrapper"]}>
                <Button
                  sx={{ mt: 2 }}
                  onClick={handleClose}
                  disabled={isChanging}
                >
                  decline
                </Button>
                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  onClick={handleClearShoppingCart}
                  disabled={isChanging}
                >
                  Clear Shopping Cart
                </Button>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}
