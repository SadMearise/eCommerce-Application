import { Container } from "@mui/material";
import Header from "../components/header/Header";
import ProfileComponent from "../components/profileComponent/ProfileComponent";

export default function Profile() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <ProfileComponent />
      </Container>
    </>
  );
}
