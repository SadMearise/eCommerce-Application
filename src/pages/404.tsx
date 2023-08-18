import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import RouterPaths from "../router/routes";

export default function Page404() {
  return (
    <div>
      <h1>404</h1>
      <p>We can&apos;t find the page you&apos;re looking for.</p>
      <Button
        variant="contained"
        component={Link}
        to={RouterPaths.Home}
      >
        Go home
      </Button>
    </div>
  );
}
