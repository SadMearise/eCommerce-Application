import * as React from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../store/features/userSlice";

function Logout() {
  const dispatch = useDispatch();
  // console.log("selectUser logout", selectUser);
  const user = useSelector(selectUser);
  // console.log(user);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <>
      <div>
        <span>{user?.body.email}</span>
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
