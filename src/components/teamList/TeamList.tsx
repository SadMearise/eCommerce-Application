import TeamMember from "../teamMember/TeamMember";
import team from "../../data/team";
import styles from "./TeamList.module.scss";

function TeamList() {
  const teamMembers = team.map((member) => (
    <li key={member.toString()}>
      <TeamMember member={member} />
    </li>
  ));
  return <ul className={styles["team-list"]}>{teamMembers}</ul>;
}

export default TeamList;
