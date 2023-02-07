import { useState } from 'react';
import { Box, Stepper as MuiStepper, Step, StepLabel, Button } from '@mui/material';
import ServiceArea from './ServiceArea';
import Race from './Race';
import Ethnicity from './Ethnicity';
import Language from './Language';
const steps = [
  {
    label: 'Service Area',
    component: <ServiceArea />
  },
  {
    label: 'Race',
    component: <Race />
  },
  {
    label: 'Ethnicity',
    component: <Ethnicity />
  },
  {
    label: 'Language',
    component: <Language />
  }
];

function Stepper() {
  // Track the active step
  const [activeStep, setActiveStep] = useState(0);
  // Handle next, back, and reset buttons
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
      elevation={3}
      sx={{
        padding: 3,
        margin: 2
      }}>
      <MuiStepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={`${step.label}`}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </MuiStepper>
      {activeStep === steps.length ? (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button onClick={handleReset}>Reset</Button>
        </Box>
      ) : (
        <Box>
          {steps[activeStep].component}
          <Box
            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button onClick={handleNext} variant="contained">
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Stepper;
