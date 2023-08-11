import * as React from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../store/features/userSlice";

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      <div>
        Welcome
        <span>{user.email}</span>
      </div>
      <Button
        variant="contained"
        onClick={(e) => handleLogout(e)}
      >
        Logout
      </Button>
    </>
  );
}

export default Logout;
