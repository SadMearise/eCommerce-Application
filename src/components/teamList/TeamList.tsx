import { Grid } from "@mui/material";
import TeamMember from "../teamMember/TeamMember";
import team from "../../data/team";
import styles from "./TeamList.module.scss";

function TeamList() {
  const teamMembers = team.map((member) => (
    <Grid
      item
      xs="auto"
      className={styles["team-item"]}
      key={member.name}
    >
      <TeamMember member={member} />
    </Grid>
  ));

  return (
    <Grid
      container
      spacing={3}
      className={styles["team-list"]}
    >
      {teamMembers}
    </Grid>
  );
}

export default TeamList;
