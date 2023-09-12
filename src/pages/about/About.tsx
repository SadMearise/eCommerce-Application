import { Container } from "@mui/material";
import Header from "../../components/header/Header";
import TeamList from "../../components/teamList/TeamList";
import styles from "./About.module.scss";
import Bio from "../../components/bio/Bio";

export default function About() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <h2 className={styles["team-title"]}>Meat our team</h2>
        <TeamList />
        <h2 className={styles["team-title"]}>Short bio</h2>
        <Bio />
      </Container>
    </>
  );
}
