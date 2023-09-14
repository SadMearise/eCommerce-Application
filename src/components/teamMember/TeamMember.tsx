import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import styles from "./TeamMember.module.scss";
import { ITeamMembersProps } from "./types";

function TeamMember({ member }: ITeamMembersProps) {
  return (
    <Card
      sx={{ minWidth: 275 }}
      className={styles["team-member"]}
    >
      <CardContent className={styles.content}>
        <CardMedia
          component="img"
          height="243"
          image={member.photo}
          alt={member.name}
        />
        <Typography
          variant="h5"
          component="div"
          className={styles.name}
        >
          {member.name}
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        >
          {member.role}
        </Typography>
        <Typography
          sx={{ mb: 1.5 }}
          color="text.secondary"
          className={styles.bio}
        >
          {member.bio}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton
          href={member.github}
          aria-label="add to favorites"
        >
          <GitHubIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default TeamMember;
