import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Button
        component={Link}
        to="/registration"
      >
        to Registration
      </Button>
    </>
  );
}
