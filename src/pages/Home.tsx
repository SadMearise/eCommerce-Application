import { useSelector } from "react-redux";
import AlertView from "../components/AlertView/AlertView";
import Header from "../components/header/Header";
import isSuccess from "../store/features/registration/registrationSelector";

export default function Home() {
  const isSuccessSelector = useSelector(isSuccess);

  return (
    <>
      <Header />
      <h1>Home</h1>
      {isSuccessSelector && <AlertView />}
    </>
  );
}
