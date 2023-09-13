import TeamMember from "../teamMember/TeamMember";
import team from "../../data/team";
import styles from "./TeamList.module.scss";

function TeamList() {
  const teamMembers = team.map((member) => (
    <div key={member.name}>
      <TeamMember member={member} />
    </div>
  ));
  return <div className={styles["team-list"]}>{teamMembers}</div>;
}

export default TeamList;
