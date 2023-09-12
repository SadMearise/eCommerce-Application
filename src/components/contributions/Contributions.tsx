import { useState } from "react";
import { Box, Button, Paper, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import styles from "./Contributions.module.scss";
import team from "../../data/team";
import SprintTasks from "../sprintTasks/SprintTasks";
import { ITeamMember } from "../teamMember/types";

const steps = [
  {
    id: "0",
    label:
      "Sprint 1: Repository Setup, Project Management, CommerceTools Integration, and Development Environment Configuration",
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    id: "1",
    label: "Sprint 2: Login, Registration, and Main Pages Implementation",
  },
  {
    id: "2",
    label: "Sprint 3: Catalog Product Page, Detailed Product Page & User Profile Page Implementation",
  },
  {
    id: "3",
    label: "Sprint 4: Basket Page, Catalog Page Enhancements, and About Us Page Implementation",
  },
];

export default function Contributions() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box
      sx={{ maxWidth: 400 }}
      className={styles.contributions}
    >
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
      >
        {steps.map((step, sprintId) => (
          <Step key={step.label}>
            <StepLabel className={styles.label}>{step.label}</StepLabel>
            <StepContent>
              {team.map((member: ITeamMember) => (
                <SprintTasks
                  member={member}
                  sprintId={sprintId}
                />
              ))}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {sprintId === steps.length - 1 ? "Finish" : "Continue"}
                  </Button>
                  <Button
                    disabled={sprintId === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper
          square
          elevation={0}
          sx={{ p: 3 }}
        >
          <Typography>Congratulations! The application is ready.</Typography>
          <Button
            onClick={handleReset}
            sx={{ mt: 1, mr: 1 }}
          >
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
