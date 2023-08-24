import { Paper, Button } from "@mui/material";
import { IItemProps } from "./types";

function Item(item: IItemProps) {
  const {
    info: { title, description },
  } = item;
  return (
    <Paper>
      <h2>{title}</h2>
      <p>{description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}

export default Item;
