import { AddressDataProps, AddressType } from "../types";
import AddressField from "./addressField/AddressField";
import styles from "../ProfileComponent.module.scss";

export default function AddressData({
  userId,
  addressVersion,
  shippingAddressData,
  billingAddressData,
  defaultShippingAddressData,
  defauultBillingAddressData,
  handleReadOnlyClick,
}: AddressDataProps) {
  // console.log(shippingAddressData);
  return (
    <>
      <div className={styles["flex-container"]}>
        <div className={`${styles["half-width-field-address"]} ${styles["default-address"]}`}>
          <AddressField
            userId={userId}
            addressVersion={addressVersion}
            addressType={AddressType.DefaultShippingAddress}
            addressData={defaultShippingAddressData!}
            handleReadOnlyClick={handleReadOnlyClick}
          />
        </div>
        <div className={`${styles["half-width-field-address"]} ${styles["default-address"]}`}>
          <AddressField
            userId={userId}
            addressVersion={addressVersion}
            addressType={AddressType.DefaultBillingAddress}
            addressData={defauultBillingAddressData!}
            handleReadOnlyClick={handleReadOnlyClick}
          />
        </div>
      </div>
      <div className={styles["flex-container"]}>
        <div className={styles["half-width-field-address"]}>
          <AddressField
            userId={userId}
            addressVersion={addressVersion}
            addressType={AddressType.ShippingAddress}
            addressData={shippingAddressData}
            handleReadOnlyClick={handleReadOnlyClick}
          />
        </div>
        <div className={styles["half-width-field-address"]}>
          <AddressField
            userId={userId}
            addressVersion={addressVersion}
            addressType={AddressType.BillingAddress}
            addressData={billingAddressData}
            handleReadOnlyClick={handleReadOnlyClick}
          />
        </div>
      </div>
    </>
  );
}
