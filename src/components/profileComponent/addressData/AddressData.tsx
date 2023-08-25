import { AddressDataProps, AddressType } from "../types";
import AddressField from "./addressField/AddressField";
import styles from "../ProfileComponent.module.scss";

export default function AddressData({
  shippingAddressData,
  billingAddressData,
  defaultShippingAddressData,
  defauultBillingAddressData,
  handleReadOnlyClick,
}: AddressDataProps) {
  console.log(shippingAddressData);
  return (
    <>
      <div className={styles["flex-container"]}>
        <div className={styles["half-width-field"]}>
          <AddressField
            addressType={AddressType.ShippingAddress}
            addressData={shippingAddressData}
            handleReadOnlyClick={handleReadOnlyClick}
          />
        </div>
        <div className={styles["half-width-field-address"]}>
          <AddressField
            addressType={AddressType.BillingAddress}
            addressData={billingAddressData}
            handleReadOnlyClick={handleReadOnlyClick}
          />
        </div>
      </div>
      <div className={styles["flex-container"]}>
        <div className={styles["half-width-field-address"]}>
          <AddressField
            addressType={AddressType.DefaultShippingAddress}
            addressData={defaultShippingAddressData!}
            handleReadOnlyClick={handleReadOnlyClick}
          />
        </div>
        <div className={styles["half-width-field-address"]}>
          <AddressField
            addressType={AddressType.DefaultBillingAddress}
            addressData={defauultBillingAddressData!}
            handleReadOnlyClick={handleReadOnlyClick}
          />
        </div>
      </div>
    </>
  );
}
