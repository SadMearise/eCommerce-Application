import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import { useState } from "react";
import styles from "./BasketClearButton.module.scss";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function BasketClearButton({ handleClearShoppingCart }: { handleClearShoppingCart: () => void }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <div>
        <Button onClick={handleOpen}>Clear Shopping Cart</Button>
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
            <Box sx={style}>
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
                >
                  decline
                </Button>
                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  onClick={handleClearShoppingCart}
                >
                  Clear Shopping Cart
                </Button>
              </div>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}
