import React from "react";
import { TextField } from "@mui/material";
import { Customer } from "@commercetools/platform-sdk";
import styles from "../ProfileComponent.module.scss";

interface PersonalInfoProps {
  userData: Customer;
  handleReadOnlyClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export default function PersonalData({ userData, handleReadOnlyClick }: PersonalInfoProps) {
  return (
    <div className={styles["personal-data"]}>
      <h2 className={styles["personal-data-title"]}>Personal info:</h2>
      <div className={styles["flex-container"]}>
        <TextField
          id="standard-read-only-input"
          className={styles["half-width-field"]}
          label="First name:"
          value={userData?.firstName}
          InputProps={{
            readOnly: true,
            onMouseDown: handleReadOnlyClick,
          }}
        />
        <TextField
          id="standard-read-only-input"
          className={styles["half-width-field"]}
          label="Last name:"
          value={userData?.lastName}
          InputProps={{
            readOnly: true,
            onMouseDown: handleReadOnlyClick,
          }}
        />
        <TextField
          id="standard-read-only-input"
          className={styles["half-width-field"]}
          label="Birthday:"
          value={userData?.dateOfBirth!.split("-").reverse().join("-")}
          InputProps={{
            readOnly: true,
            onMouseDown: handleReadOnlyClick,
          }}
        />
        <TextField
          id="standard-read-only-input"
          className={styles["half-width-field"]}
          label="email:"
          value={userData?.email}
          InputProps={{
            readOnly: true,
            onMouseDown: handleReadOnlyClick,
          }}
        />
      </div>
    </div>
  );
}
