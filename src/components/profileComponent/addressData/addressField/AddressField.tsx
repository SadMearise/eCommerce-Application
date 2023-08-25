import { Button, TextField } from "@mui/material";
import { useState } from "react";
import styles from "../../ProfileComponent.module.scss";
import getCountryNameByCode from "../../../../utils/getCountryNameFromCode";
import { AddressFieldProps } from "../../types";
import { extractAddressProperties } from "../../../../utils/extractAddresses";

export default function AddressField({ addressType, addressData, handleReadOnlyClick }: AddressFieldProps) {
  const [isChangingInfo, setIsChangingInfo] = useState(false);
  const handleChangingInfoClick = () => setIsChangingInfo(!isChangingInfo);
  const addressProperties = extractAddressProperties(addressData);

  return (
    <div className={styles["personal-data"]}>
      <div className={styles["personal-data-title"]}>
        <h2>{addressType}</h2>
        <Button onClick={handleChangingInfoClick}>{isChangingInfo ? "save details" : "change details"}</Button>
      </div>
      <div className={styles["flex-container"]}>
        <TextField
          id="shipping-country-input"
          className={styles["half-width-field"]}
          label="Country:"
          defaultValue={getCountryNameByCode(addressProperties.country as string)}
          variant={isChangingInfo ? "standard" : "outlined"}
          InputProps={{
            readOnly: !isChangingInfo,
            onMouseDown: !isChangingInfo ? handleReadOnlyClick : undefined,
          }}
        />
        <TextField
          id="shipping-city-input"
          className={styles["half-width-field"]}
          label="City:"
          defaultValue={addressProperties.city}
          variant={isChangingInfo ? "standard" : "outlined"}
          InputProps={{
            readOnly: !isChangingInfo,
            onMouseDown: !isChangingInfo ? handleReadOnlyClick : undefined,
          }}
        />
        <TextField
          id="shipping-street-name-input"
          className={styles["half-width-field"]}
          label="Street name:"
          defaultValue={addressProperties.streetName}
          variant={isChangingInfo ? "standard" : "outlined"}
          InputProps={{
            readOnly: !isChangingInfo,
            onMouseDown: !isChangingInfo ? handleReadOnlyClick : undefined,
          }}
        />
        <TextField
          id="shipping-street-number-input"
          className={styles["half-width-field"]}
          label="Street number:"
          defaultValue={addressProperties.streetNumber}
          variant={isChangingInfo ? "standard" : "outlined"}
          InputProps={{
            readOnly: !isChangingInfo,
            onMouseDown: !isChangingInfo ? handleReadOnlyClick : undefined,
          }}
        />
        <TextField
          id="shipping-postal-code-input"
          className={styles["full-width-field"]}
          label="Postal code:"
          defaultValue={addressProperties.postalCode}
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
