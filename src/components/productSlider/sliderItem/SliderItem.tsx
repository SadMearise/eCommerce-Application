import { Paper } from "@mui/material";
import { ISliderItemProps } from "../types";
import styles from "./SliderItem.module.scss";

function SliderItem(item: ISliderItemProps) {
  const {
    info: { url, label, dimensions },
    onClickHandle,
  } = item;

  return (
    <Paper className={styles.paper}>
      <div className={styles.pic}>
        <img
          className={styles.img}
          src={url}
          alt={label}
          height={dimensions.h}
          width={dimensions.w}
          role="presentation"
          onClick={onClickHandle}
        />
      </div>
    </Paper>
  );
}

export default SliderItem;
