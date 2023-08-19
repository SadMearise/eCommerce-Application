import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@mui/material";

export default function AlertView() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      {open && (
        <Alert variant="outlined">
          <AlertTitle>Success</AlertTitle>
          Registration successful! You&apos;re now logged in!
        </Alert>
      )}
    </div>
  );
}
