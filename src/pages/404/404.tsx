import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import RouterPaths from "../../router/routes";
import styles from "./404.module.scss";

export default function Page404() {
  return (
    <div className={styles.body}>
      <h1 className={styles.title}>404</h1>
      <p>We can&apos;t find the page you&apos;re looking for.</p>
      <Button
        className={styles.button}
        variant="contained"
        component={Link}
        to={RouterPaths.Home}
      >
        Go home
      </Button>
    </div>
  );
}
