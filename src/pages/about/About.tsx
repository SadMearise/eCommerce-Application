import { Container } from "@mui/material";
import Header from "../../components/header/Header";
import TeamList from "../../components/teamList/TeamList";
import styles from "./About.module.scss";
import Bio from "../../components/bio/Bio";
import Contributions from "../../components/contributions/Contributions";
import Collaboration from "../../components/collaboration/Collaboration";

export default function About() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <h2 className={styles["team-title"]}>Meat our team</h2>
        <TeamList />
        <h2 className={styles["team-title"]}>Short biography</h2>
        <Bio />
        <h2 className={styles["team-title"]}>Contributions to the project</h2>
        <Contributions />
        <h2 className={styles["team-title"]}>Collaboration</h2>
        <Collaboration />
      </Container>
    </>
  );
}
