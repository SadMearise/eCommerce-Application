import { Box, Button, Chip, Modal, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { BaseAddress } from "@commercetools/platform-sdk";
import { AddressDataProps, AddressTitle } from "../types";
import AddressField from "./addressField/AddressField";
import styles from "./AddressData.module.scss";
import AddAddress from "./addAddress/AddAddress";

import createDraftFromAddress from "../../../utils/createDraftFromAddress";
import AlertView from "../../alertView/AlertView";
import {
  addAddressIdentifier,
  addAddressToCustomer,
  getCustomerInfo,
  getCustomerVersionByID,
  removeAddressByID,
  updateCustomerInfo,
} from "../../../services/customer.service";
import useCheckboxesState from "../../../hooks/useCheckboxesState";
import getCountryCode from "../../../utils/getCountryCode";

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
  updateDefaultShippingAddress,
  updateDefaultBillingAddress,
  addresses,
  setAddressess,
}: AddressDataProps) {
  const [open, setOpen] = useState(false);
  const [dataVersion, setDataVersion] = useState(version);
  const [isChangingSuccessful, setIsChangingSuccessful] = useState(false);
  const [checkboxesState, { handleCheckboxChange, resetCheckboxes }] = useCheckboxesState();
  const [isDefaultBillingAddress, setIsDefaultBillingAddress] = useState(defaultBillingAddressData?.length);
  const [isDefaultShippingAddress, setIsDefaultShippingAddress] = useState(defaultShippingAddressData?.length);

  useEffect(() => {
    setIsDefaultBillingAddress(defaultBillingAddressData?.length);
    setIsDefaultShippingAddress(defaultShippingAddressData?.length);
  }, [defaultBillingAddressData, defaultShippingAddressData]);
  const handleSuccessAlert = () => {
    setIsChangingSuccessful(true);

    setTimeout(() => setIsChangingSuccessful(false), 2000);
  };
  const handleCloseModal = () => {
    setOpen(false);
    resetCheckboxes();
  };
  const handleOpenModal = () => {
    setOpen(true);
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
        updateDefaultShippingAddress(address);
      }

      if (selectedCheckboxes.defaultBilling) {
        updateDefaultBillingAddress(address);
      }

      if (selectedCheckboxes.shipping) {
        updateShippingAddress([address, ...shippingAddressData]);
      }

      if (selectedCheckboxes.billing) {
        updateBillingAddress([address, ...billingAddressData]);
      }

      setAddressess([...addresses, address]);

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
        updateDefaultBillingAddress({ id: addressId, ...address });
      }

      if (selectedCheckboxes.defaultShipping) {
        updateDefaultShippingAddress({ id: addressId, ...address });
      }
      const newCurrentVersion = await getCustomerVersionByID(id);
      setDataVersion(newCurrentVersion);
      handleChangeDataVersion(newCurrentVersion);
    }

    const findCity = addresses.find((address) => address.city === values.city);
    const findCountry = addresses.find((address) => address.country === getCountryCode(values.country));
    const findStreetName = addresses.find((address) => address.streetName === values.streetName);
    const findStreetNumber = addresses.find((address) => address.streetNumber === values.streetNumber);
    const findPostalCode = addresses.find((address) => address.postalCode === values.postalCode);

    if (findCity && findCountry && findPostalCode && findStreetName && findStreetNumber) {
      return;
    }

    const currentVersion = await getCustomerVersionByID(id);
    await updateCustomerInfo(id, currentVersion, addressId, values, []);
    const customerData = await getCustomerInfo();
    setAddressess(customerData.body.addresses);

    const newCurrentVersion = await getCustomerVersionByID(id);
    setDataVersion(newCurrentVersion);
    handleChangeDataVersion(newCurrentVersion);
    resetCheckboxes();
    handleSuccessAlert();
  };

  const handleDeleteAddress = async (id: string, versionNumber: number, addressId: string) => {
    try {
      await removeAddressByID(id, versionNumber, addressId);
      const customerData = await getCustomerInfo();
      setAddressess(customerData.body.addresses);

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
        {addresses.map((item) => {
          const isShipping = shippingAddressData.some((shippingAddress) => shippingAddress.id === item.id);
          const isBilling = billingAddressData.some((billingAddress) => billingAddress.id === item.id);
          const isDefaultShipping = defaultShippingAddressData!.some((billingAddress) => billingAddress.id === item.id);
          const isDefaultBilling = defaultBillingAddressData!.some((billingAddress) => billingAddress.id === item.id);
          return (
            <div
              key={item.id}
              className={styles["half-width-field"]}
            >
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
                {...(isDefaultShipping ? { isDefaultBillingAddress } : {})}
                {...(isDefaultBilling ? { isDefaultShippingAddress } : {})}
              />
              <Stack
                direction="row"
                spacing={1}
                sx={{ padding: "0 5px", flexWrap: "wrap" }}
              >
                {isShipping && <Chip label="Shipping Address" />}
                {isBilling && <Chip label="Billing Address" />}
              </Stack>
              <Stack
                direction="row"
                sx={{
                  padding: "0 5px",
                  flexWrap: "wrap",
                  gap: "5px",
                }}
              >
                {isDefaultShipping && (
                  <Chip
                    color="primary"
                    label="Default Shipping Address"
                  />
                )}
                {isDefaultBilling && (
                  <Chip
                    color="primary"
                    label="Default Billing Address"
                  />
                )}
              </Stack>
            </div>
          );
        })}
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
