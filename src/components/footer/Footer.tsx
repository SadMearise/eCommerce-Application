import Container from "@mui/material/Container";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles.footer}>
      <Container maxWidth="xl">
        <div className={styles.body}>
          <a
            href="https://rs.school/"
            className={styles.logo}
          >
            <img
              src="/rs_school_js.svg"
              alt="RSS"
            />
          </a>
          <span className={styles.date}>2023</span>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
