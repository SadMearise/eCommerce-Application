import React, { useEffect, useState } from "react";
// import { TextField } from "@mui/material";
import { getCustomerInfo } from "../../services/customerService";
// import styles from "./ProfileComponent.module.scss";

export default function ProfileComponent() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await getCustomerInfo();
        setUserData(userResponse.body);
      } catch (error) {
        throw new Error(`Error fetching user data: ${error}`);
      }
    };
    fetchUserData();
  }, []);

  // const handleReadOnlyClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  //   event.preventDefault();
  //   event.stopPropagation();
  // };

  if (Object.keys(userData).length === 0) {
    return <p>Loading...</p>;
  }
}
