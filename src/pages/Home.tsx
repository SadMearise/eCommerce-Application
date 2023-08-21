import { useSelector } from "react-redux";
import { Container } from "@mui/material";
import AlertView from "../components/alertView/AlertView";
import Header from "../components/header/Header";
import isSuccess from "../store/features/registration/registrationSelector";

export default function Home() {
  const isSuccessSelector = useSelector(isSuccess);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <h1>Home</h1>
      </Container>
      {isSuccessSelector && <AlertView />}
    </>
  );
}
