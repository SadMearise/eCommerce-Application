import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <div>
      <h1>404</h1>
      <p>We can&apos;t find the page you&apos;re looking for.</p>
      <Button
        variant="contained"
        component={Link}
        to="/"
      >
        Go home
      </Button>
    </div>
  );
}
