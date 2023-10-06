import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import styles from "./Footer.module.scss";
import team from "../../data/team";

function Footer() {
  const teamMembers = team.map((member) => (
    <a
      href={member.github}
      className={styles["github-item"]}
      key={member.github.toString()}
    >
      <GitHubIcon />
      <span className={styles.nick}>{member.nick}</span>
    </a>
  ));
  return (
    <footer className={styles.footer}>
      <Container maxWidth="xl">
        <div className={styles.body}>
          <div className={styles["github-body"]}>{teamMembers}</div>
          <a
            href="https://rs.school/"
            className={styles.logo}
          >
            <img
              src="./rs_school_js.svg"
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
