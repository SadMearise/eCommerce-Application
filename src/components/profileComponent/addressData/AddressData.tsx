import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { BaseAddress } from "@commercetools/platform-sdk";
import { AddressDataProps, AddressTitle } from "../types";
import AddressField from "./addressField/AddressField";
import styles from "./AddressData.module.scss";
import AddAddress from "./addAddress/AddAddress";

import createDraftFromAddress from "../../../utils/createDraftFromAddress";
import { extractAddressesFromIds } from "../../../utils/extractAddresses";
import AlertView from "../../alertView/AlertView";
import {
  addAddressIdentifier,
  addAddressToCustomer,
  getCustomerInfo,
  getCustomerVersionByID,
  removeAddressByID,
  updateCustomerInfo,
} from "../../../services/customer.service";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddressData({
  userId,
  version,
  shippingAddressData,
  billingAddressData,
  defaultShippingAddressData,
  defaultBillingAddressData,
  handleReadOnlyClick,
  handleChangeDataVersion,
  updateShippingAddress,
  updateBillingAddress,
  updateDefaultShppingAddress,
  updateDefaultBillingAddress,
}: AddressDataProps) {
  const [open, setOpen] = useState(false);
  const [dataVersion, setDataVersion] = useState(version);
  const [shippingAddresses, setShippingAddresses] = useState(shippingAddressData);
  const [billingAddresses, setBillingAddresses] = useState(billingAddressData);
  const [defaultShippingAddress, setDefaultShippingAddress] = useState(defaultShippingAddressData);
  const [defaultBillingAddress, setDefaultBillingAddress] = useState(defaultBillingAddressData);
  const [isChangingSuccessful, setIsChangingSuccessful] = useState(false);

  const handleSuccessAlert = () => {
    setIsChangingSuccessful(true);

    setTimeout(() => setIsChangingSuccessful(false), 2000);
  };

  const [checkboxesState, setCheckboxesState] = useState<{
    [key: string]: boolean;
  }>({
    shipping: false,
    billing: false,
    defaultShipping: false,
    defaultBilling: false,
  });

  const handleCheckboxChange = (name: string) => {
    setCheckboxesState((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const resetCheckboxes = () => {
    setCheckboxesState({
      shipping: false,
      billing: false,
      defaultShipping: false,
      defaultBilling: false,
    });
  };
  const handleCloseModal = () => {
    setOpen(false);
    resetCheckboxes();
  };
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleShippingAddress = (newAddressData: BaseAddress) => {
    setShippingAddresses([newAddressData, ...shippingAddresses]);
  };
  const handleBillingAddress = (newAddressData: BaseAddress) => {
    setBillingAddresses([newAddressData, ...billingAddresses]);
  };
  const handleDefaultShippingAddress = (newAddressData: BaseAddress) => {
    setDefaultShippingAddress([newAddressData]);
  };
  const handleDefaultBillingAddress = (newAddressData: BaseAddress) => {
    setDefaultBillingAddress([newAddressData]);
  };

  const handleAddAddress = async (
    id: string,
    versionNumber: number,
    values: BaseAddress,
    selectedCheckboxes: { [key: string]: boolean }
  ) => {
    try {
      const { body } = await addAddressToCustomer(id, versionNumber, values);
      const address = body.addresses[body.addresses.length - 1];
      const addressID = address.id as string;

      const actions: ("defaultShipping" | "defaultBilling" | "shipping" | "billing")[] = [];

      if (selectedCheckboxes.defaultShipping) {
        actions.push("defaultShipping");
      }

      if (selectedCheckboxes.defaultBilling) {
        actions.push("defaultBilling");
      }

      if (selectedCheckboxes.shipping) {
        actions.push("shipping");
      }

      if (selectedCheckboxes.billing) {
        actions.push("billing");
      }

      await addAddressIdentifier(id, versionNumber + 1, addressID, actions);

      if (selectedCheckboxes.defaultShipping) {
        handleDefaultShippingAddress(address);
      }

      if (selectedCheckboxes.defaultBilling) {
        handleDefaultBillingAddress(address);
      }

      if (selectedCheckboxes.shipping) {
        handleShippingAddress(address);
      }

      if (selectedCheckboxes.billing) {
        handleBillingAddress(address);
      }

      resetCheckboxes();

      const currentVersion = await getCustomerVersionByID(id);
      setDataVersion(currentVersion);
      handleChangeDataVersion(currentVersion);
      handleCloseModal();
      handleSuccessAlert();
    } catch (error) {
      throw new Error(`${error}`);
    }
  };

  const handleChangeAddress = async (
    id: string,
    versionNumber: number,
    addressId: string,
    values: BaseAddress,
    selectedCheckboxes: { [key: string]: boolean }
  ) => {
    const actions: ("defaultShipping" | "defaultBilling")[] = [];

    if (selectedCheckboxes.defaultBilling) {
      actions.push("defaultBilling");
    }

    if (selectedCheckboxes.defaultShipping) {
      actions.push("defaultShipping");
    }

    if (actions.length > 0) {
      await updateCustomerInfo(id, versionNumber, addressId, values, actions);
      const address = createDraftFromAddress(values);

      if (selectedCheckboxes.defaultBilling) {
        handleDefaultBillingAddress({ id: addressId, ...address });
      }

      if (selectedCheckboxes.defaultShipping) {
        handleDefaultShippingAddress({ id: addressId, ...address });
      }
    }
    await updateCustomerInfo(id, versionNumber, addressId, values, []);
    const customerData = await getCustomerInfo();
    const ship = extractAddressesFromIds(customerData.body, customerData.body.shippingAddressIds as string[]);
    const addressToUpdate = ship.find((item) => item.id === addressId);

    if (addressToUpdate) {
      const updatedShippingAddresses = shippingAddresses.map((item) => {
        if (item.id === addressToUpdate.id) {
          handleShippingAddress(addressToUpdate);
          if (item.id === defaultBillingAddress![0].id) {
            handleDefaultBillingAddress({ ...addressToUpdate });
            updateDefaultBillingAddress({ ...addressToUpdate });
          }
          if (item.id === defaultShippingAddress![0].id) {
            handleDefaultShippingAddress({ ...addressToUpdate });
            updateDefaultShppingAddress({ ...addressToUpdate });
          }
          return addressToUpdate;
        }
        return item;
      });
      const updatedBillingAddresses = billingAddresses.map((item) => {
        if (item.id === addressToUpdate.id) {
          handleBillingAddress(addressToUpdate);
          if (item.id === defaultBillingAddress![0].id) {
            handleDefaultBillingAddress({ ...addressToUpdate });
            updateDefaultBillingAddress({ ...addressToUpdate });
          }
          if (item.id === defaultShippingAddress![0].id) {
            handleDefaultShippingAddress({ ...addressToUpdate });
            updateDefaultShppingAddress({ ...addressToUpdate });
          }
          return addressToUpdate;
        }
        return item;
      });
      setShippingAddresses(updatedShippingAddresses);
      updateShippingAddress(updatedShippingAddresses);
      setBillingAddresses(updatedBillingAddresses);
      updateBillingAddress(updatedBillingAddresses);
    }

    const currentVersion = await getCustomerVersionByID(id);
    setDataVersion(currentVersion);
    handleChangeDataVersion(currentVersion);
    resetCheckboxes();
    handleSuccessAlert();
  };

  const handleDeleteAddress = async (id: string, versionNumber: number, addressId: string) => {
    try {
      await removeAddressByID(id, versionNumber, addressId);

      const updatedAddressesBilling = billingAddresses.filter((address) => address.id !== addressId);
      setBillingAddresses(updatedAddressesBilling);

      const updatedAddressesShipping = shippingAddresses.filter((address) => address.id !== addressId);
      setShippingAddresses(updatedAddressesShipping);
      if (
        defaultBillingAddress &&
        addressId &&
        defaultBillingAddress.length > 0 &&
        addressId === defaultBillingAddress[0].id
      ) {
        setDefaultBillingAddress([]);
      }

      if (
        defaultShippingAddress &&
        addressId &&
        defaultShippingAddress.length > 0 &&
        addressId === defaultShippingAddress[0].id
      ) {
        setDefaultShippingAddress([]);
      }
      const currentVersion = await getCustomerVersionByID(id);
      setDataVersion(currentVersion);
      handleChangeDataVersion(currentVersion);
      handleSuccessAlert();
    } catch (error) {
      console.error("Ошибка при удалении адреса:", error);
    }
  };
  return (
    <>
      <div>
        <Button
          onClick={handleOpenModal}
          variant="contained"
          color="primary"
        >
          Add address
        </Button>
        <Modal
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Add address
            </Typography>
            <AddAddress
              id={userId}
              handleAddAddress={handleAddAddress}
              dataVersion={dataVersion}
              handleCheckboxChange={handleCheckboxChange}
              checkboxesState={checkboxesState}
            />
          </Box>
        </Modal>
      </div>
      <div className={styles["address-data-container"]}>
        {defaultShippingAddress && (
          <div className={`${styles["half-width-field"]} ${styles["default-address"]}`}>
            {defaultShippingAddress.map((item) => (
              <div key={item.id}>
                <AddressField
                  userId={userId}
                  dataVersion={dataVersion}
                  addressTitle={AddressTitle.DefaultShippingAddress}
                  addressData={item}
                  checkboxesState={checkboxesState}
                  handleReadOnlyClick={handleReadOnlyClick}
                  handleChangeAddress={handleChangeAddress}
                  handleDeleteAddress={handleDeleteAddress}
                  handleCheckboxChange={handleCheckboxChange}
                  resetCheckboxes={resetCheckboxes}
                />
              </div>
            ))}
          </div>
        )}
        {defaultBillingAddress && defaultBillingAddress.length > 0 && (
          <div className={`${styles["half-width-field"]} ${styles["default-address"]}`}>
            {defaultBillingAddress.map((item) => (
              <div key={item.id}>
                <AddressField
                  userId={userId}
                  dataVersion={dataVersion}
                  addressTitle={AddressTitle.DefaultBillingAddress}
                  addressData={item}
                  checkboxesState={checkboxesState}
                  handleReadOnlyClick={handleReadOnlyClick}
                  handleChangeAddress={handleChangeAddress}
                  handleDeleteAddress={handleDeleteAddress}
                  handleCheckboxChange={handleCheckboxChange}
                  resetCheckboxes={resetCheckboxes}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles["address-data-container"]}>
        {shippingAddresses.length > 0 && (
          <div className={styles["half-width-field"]}>
            {shippingAddresses.map((item) => (
              <div key={item.id}>
                <AddressField
                  userId={userId}
                  dataVersion={dataVersion}
                  addressTitle={AddressTitle.ShippingAddress}
                  addressData={item}
                  checkboxesState={checkboxesState}
                  handleReadOnlyClick={handleReadOnlyClick}
                  handleChangeAddress={handleChangeAddress}
                  handleDeleteAddress={handleDeleteAddress}
                  handleCheckboxChange={handleCheckboxChange}
                  resetCheckboxes={resetCheckboxes}
                />
              </div>
            ))}
          </div>
        )}
        {billingAddresses.length > 0 && (
          <div className={styles["half-width-field"]}>
            {billingAddresses.map((item) => (
              <div key={item.id}>
                <AddressField
                  userId={userId}
                  dataVersion={dataVersion}
                  addressTitle={AddressTitle.BillingAddress}
                  addressData={item}
                  checkboxesState={checkboxesState}
                  handleReadOnlyClick={handleReadOnlyClick}
                  handleChangeAddress={handleChangeAddress}
                  handleDeleteAddress={handleDeleteAddress}
                  handleCheckboxChange={handleCheckboxChange}
                  resetCheckboxes={resetCheckboxes}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {isChangingSuccessful && (
        <AlertView
          alertTitle="Success"
          severity="success"
          variant="filled"
          textContent="Changes were successful"
        />
      )}
    </>
  );
}
