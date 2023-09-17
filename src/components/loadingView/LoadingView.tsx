import { CircularProgress, Container } from "@mui/material";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import styles from "./LoadingView.module.scss";

export default function LoadingView() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <div className={styles.progress}>
          <CircularProgress />
        </div>
      </Container>
      <Footer />
    </>
  );
}
