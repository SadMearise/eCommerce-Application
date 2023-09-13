import { useState } from "react";
import { Box, Button, Paper, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import styles from "./Contributions.module.scss";
import team from "../../data/team";
import SprintTasks from "../sprintTasks/SprintTasks";
import { ITeamMember } from "../teamMember/types";
import steps from "../../data/steps";

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
                  key={member.id}
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
