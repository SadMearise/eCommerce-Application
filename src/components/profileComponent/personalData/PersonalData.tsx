import { useState } from "react";
import { TextField, Button } from "@mui/material";
import styles from "../ProfileComponent.module.scss";
import { PersonalInfoProps } from "../types";

export default function PersonalData({ userData, handleReadOnlyClick }: PersonalInfoProps) {
  const [isChangingInfo, setIsChangingInfo] = useState(false);

  const handleChangingInfoClick = () => setIsChangingInfo(!isChangingInfo);
  return (
    <div className={styles["personal-data"]}>
      <div className={styles["personal-data-title"]}>
        <h2>Personal info:</h2>
        <Button onClick={handleChangingInfoClick}>{isChangingInfo ? "save details" : "change details"}</Button>
      </div>
      <div className={styles["flex-container"]}>
        <TextField
          id="firstName-input"
          className={styles["half-width-field"]}
          label="First name:"
          defaultValue={userData?.firstName}
          variant={isChangingInfo ? "standard" : "outlined"}
          InputProps={{
            readOnly: !isChangingInfo,
            onMouseDown: !isChangingInfo ? handleReadOnlyClick : undefined,
          }}
        />
        <TextField
          id="lastName-input"
          className={styles["half-width-field"]}
          label="Last name:"
          defaultValue={userData?.lastName}
          variant={isChangingInfo ? "standard" : "outlined"}
          InputProps={{
            readOnly: !isChangingInfo,
            onMouseDown: !isChangingInfo ? handleReadOnlyClick : undefined,
          }}
        />
        <TextField
          id="birthday-input"
          className={styles["half-width-field"]}
          label="Birthday:"
          defaultValue={userData?.dateOfBirth!.split("-").reverse().join("-")}
          variant={isChangingInfo ? "standard" : "outlined"}
          InputProps={{
            readOnly: !isChangingInfo,
            onMouseDown: !isChangingInfo ? handleReadOnlyClick : undefined,
          }}
        />
        <TextField
          id="email-input"
          className={styles["half-width-field"]}
          label="email:"
          defaultValue={userData?.email}
          variant={isChangingInfo ? "standard" : "outlined"}
          InputProps={{
            readOnly: !isChangingInfo,
            onMouseDown: !isChangingInfo ? handleReadOnlyClick : undefined,
          }}
        />
      </div>
    </div>
  );
}
