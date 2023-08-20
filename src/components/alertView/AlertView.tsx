import { useCallback, useEffect, useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
import { useDispatch } from "react-redux";
import { setRegistrationSuccess } from "../../store/features/registration/registrationSlice";

export default function AlertView() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);

  const handleSetIsSuccessFalse = useCallback(() => {
    dispatch(setRegistrationSuccess(false));
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      handleSetIsSuccessFalse();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [handleSetIsSuccessFalse]);

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
