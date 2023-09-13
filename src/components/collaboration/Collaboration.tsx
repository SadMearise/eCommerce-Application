import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import collaboration from "../../data/collaboration";
import styles from "./Collaboration.module.scss";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Collaboration() {
  return (
    <Box
      sx={{ width: 1 }}
      className={styles.collaborations}
    >
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap={2}
      >
        {collaboration.map((item) => (
          <Box
            gridColumn="span 6"
            key={item.text}
          >
            <Item className={styles["collaborations-item"]}>
              <img
                src={item.icon}
                alt=""
                width={23}
              />
              <span>{item.text}</span>
            </Item>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
