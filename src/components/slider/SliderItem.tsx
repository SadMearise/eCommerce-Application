import { Paper } from "@mui/material";
import { ISliderItemProps } from "./types";
import styles from "./SliderItem.module.scss";

function SliderItem(item: ISliderItemProps) {
  const {
    info: { url, label, dimensions },
    onClickHandle,
  } = item;

  return (
    <Paper className={styles.paper}>
      <img
        src={url}
        alt={label}
        height={dimensions.h}
        width={dimensions.w}
        role="presentation"
        onClick={() => onClickHandle()}
      />
    </Paper>
  );
}

export default SliderItem;
