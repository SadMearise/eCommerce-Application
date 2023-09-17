import { Avatar } from "@mui/material";
import styles from "./SprintTasks.module.scss";
import ISprintTasksProps from "./types";

function SprintTasks({ member, sprintId }: ISprintTasksProps) {
  const contributions = member.contributions[sprintId].descriptions.map((contribution) => (
    <div
      key={contribution.toString()}
      className={styles.contribution}
    >
      {contribution}
    </div>
  ));
  return (
    <div className={styles.tasks}>
      <div className={styles.head}>
        <Avatar
          alt={member.name}
          src={member.photo}
          className={styles.avatar}
        />
        <span className={styles.name}>{member.name}</span>
      </div>

      {contributions}
    </div>
  );
}

export default SprintTasks;
