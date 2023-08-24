import { Paper } from "@mui/material";
import { IItemProps } from "./types";

function Item(item: IItemProps) {
  const {
    info: { url, label },
  } = item;

  return (
    <Paper>
      <img
        src={url}
        alt={label}
      />
    </Paper>
  );
}

export default Item;
