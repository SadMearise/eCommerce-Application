/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import { Box, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { BaseAddress, ClientResponse, Customer } from "@commercetools/platform-sdk";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import HomeIcon from "@mui/icons-material/Home";
import HttpsIcon from "@mui/icons-material/Https";
import styles from "./ProfileComponent.module.scss";
import PersonalData from "./personalData/PersonalData";
import AddressData from "./addressData/AddressData";
import { extractAddressesFromIds } from "../../utils/extractAddresses";
import PasswordData from "./passwordData/PasswordData";
import { getCustomerInfo } from "../../services/customer.service";

export default function ProfileComponent() {
  const [userData, setUserData] = useState<Customer | null>(null);
  const [dataVersion, setDataVersion] = useState(0);
  const [shippingAddressesData, setShippingAddressesData] = useState<BaseAddress[]>([]);
  const [billingAddressesData, setBillingAddressesData] = useState<BaseAddress[]>([]);
  const [defaultShippingAddressesData, setDefaultShippingAddressesData] = useState<BaseAddress[]>([]);
  const [defaultBillingAddressesData, setDefaultBillingAddressesData] = useState<BaseAddress[]>([]);

  const updateDefaultShippingAddress = (newAddressData: BaseAddress) => {
    setDefaultShippingAddressesData([newAddressData]);
  };
  const updateDefaultBillingAddress = (newAddressData: BaseAddress) => {
    setDefaultBillingAddressesData([newAddressData]);
  };

  const [value, setValue] = useState("1");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleChangeDataVersion = (version: number) => {
    setDataVersion(version);
  };
  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      try {
        const userResponse: ClientResponse<Customer> = await getCustomerInfo();
        setUserData(userResponse.body);
        setDataVersion(userResponse.body.version);

        if (userResponse.body) {
          if (userResponse.body.shippingAddressIds) {
            const shippingAddresses = extractAddressesFromIds(userResponse.body, userResponse.body.shippingAddressIds);
            setShippingAddressesData(shippingAddresses);
          }

          if (userResponse.body.billingAddressIds) {
            const billingAddresses = extractAddressesFromIds(userResponse.body, userResponse.body.billingAddressIds);
            setBillingAddressesData(billingAddresses);
          }

          if (userResponse.body.defaultShippingAddressId) {
            const defaultShippingAddresses = extractAddressesFromIds(userResponse.body, [
              userResponse.body.defaultShippingAddressId as string,
            ]);
            setDefaultShippingAddressesData(defaultShippingAddresses);
          }

          if (userResponse.body.defaultBillingAddressId) {
            const defaultBillingAddresses = extractAddressesFromIds(userResponse.body, [
              userResponse.body.defaultBillingAddressId as string,
            ]);
            setDefaultBillingAddressesData(defaultBillingAddresses);
          }
        }
      } catch (error) {
        throw new Error(`Error fetching user data: ${error}`);
      }
    };
    fetchUserData();
  }, []);
  const email: string | undefined = userData?.email;

  const handleUpdateUserData = async () => {
    const userResponse: ClientResponse<Customer> = await getCustomerInfo();
    setUserData(userResponse.body);
  };

  const handleReadOnlyClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  if (userData === null) {
    return <p>Loading...</p>;
  }
  return (
    <div className={styles["profile-wrapper"]}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              variant="fullWidth"
            >
              <Tab
                label="Personal info"
                value="1"
                icon={<PersonPinIcon />}
                iconPosition="start"
              />
              <Tab
                label="Address info"
                value="2"
                icon={<HomeIcon />}
                iconPosition="start"
              />
              <Tab
                label="Change password"
                value="3"
                icon={<HttpsIcon />}
                iconPosition="start"
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <PersonalData
              userData={userData}
              version={dataVersion}
              handleReadOnlyClick={handleReadOnlyClick}
              handleChangeDataVersion={handleChangeDataVersion}
              handleUpdateUserData={handleUpdateUserData}
              updatePersonalData={setUserData}
            />
          </TabPanel>
          <TabPanel value="2">
            <AddressData
              userId={userData.id}
              version={dataVersion}
              shippingAddressData={shippingAddressesData}
              billingAddressData={billingAddressesData}
              handleReadOnlyClick={handleReadOnlyClick}
              handleChangeDataVersion={handleChangeDataVersion}
              defaultShippingAddressData={defaultShippingAddressesData}
              defaultBillingAddressData={defaultBillingAddressesData}
              updateShippingAddress={setShippingAddressesData}
              updateBillingAddress={setBillingAddressesData}
              updateDefaultShppingAddress={updateDefaultShippingAddress}
              updateDefaultBillingAddress={updateDefaultBillingAddress}
            />
          </TabPanel>
          <TabPanel value="3">
            <PasswordData
              userId={userData.id}
              email={email as string}
              version={dataVersion}
              handleChangeDataVersion={handleChangeDataVersion}
            />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
