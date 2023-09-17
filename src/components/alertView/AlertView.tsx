import { useCallback, useEffect, useState } from "react";
import { Alert, AlertTitle, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { setRegistrationSuccess } from "../../store/features/registration/registrationSlice";
import styles from "./AlertView.module.scss";

interface AlertViewProps {
  textContent: string;
  variant: "filled" | "outlined" | "standard";
  severity: "success" | "error" | "info";
  alertTitle: "Success" | "Error" | "Info";
}

export default function AlertView({ textContent, variant, severity, alertTitle }: AlertViewProps) {
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
        <Alert
          variant={variant}
          className={styles.alert}
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>{alertTitle}</AlertTitle>
          {textContent}
        </Alert>
      )}
    </div>
  );
}
