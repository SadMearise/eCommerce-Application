import { Accordion, AccordionDetails, AccordionSummary, Avatar, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SyntheticEvent, useState } from "react";
import styles from "./Bio.module.scss";
import team from "../../data/team";

function Bio() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const teamMembers = team.map((member) => (
    <Accordion
      key={member.id}
      expanded={expanded === `panel${member.id}`}
      onChange={handleChange(`panel${member.id}`)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${member.id}bh-content`}
        id={`panel${member.id}bh-header`}
        className={styles.panel}
      >
        <Avatar
          alt={member.name}
          src={member.photo}
          className={styles.avatar}
        />
        <Typography sx={{ color: "text.secondary" }}>{member.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          <h3 className={styles.title}>Education</h3>
          {member.education?.map((item) => <li key={item}>{item}</li>)}
          <h3 className={styles.title}>Skills</h3>
          <p>{member.skills}</p>
          <h3 className={styles.title}>Foreign language</h3>
          <p>{member.language}</p>
        </div>
      </AccordionDetails>
    </Accordion>
  ));

  return <div className={styles["team-accordion"]}>{teamMembers}</div>;
}

export default Bio;
