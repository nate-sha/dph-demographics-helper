import { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

import Welcome from './Welcome';
import ServiceArea from './ServiceArea';
import Race from './Race';
import Language from './Language';

const steps = [
  {
    label: 'Welcome',
    component: <Welcome />
  },
  {
    label: 'Service Area',
    component: <ServiceArea />
  },
  {
    label: 'Race',
    component: <Race />
  },
  {
    label: 'Language',
    component: <Language />
  }
];

export default function HorizontalLinearStepper() {
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
    <Container
      maxWidth="md"
      component={Paper}
      sx={{
        dispaly: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'space-between',
        width: '100%',
        padding: 3,
        margin: 2
      }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel
              sx={{
                fontWeight: 'bold'
              }}>
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        sx={{
          minHeight: 'calc(30vh)'
        }}>
        {activeStep !== steps.length && steps[activeStep].component}
      </Box>
      {activeStep === steps.length ? (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button variant="contained" onClick={handleNext}>
            Finish
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            variant="contained"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}>
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {activeStep === steps.length - 1 ? (
            // Render a reset button if the user is on the last step
            <Button variant="contained" onClick={handleReset} sx={{ mr: 1 }}>
              Reset
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
              Next
            </Button>
          )}
        </Box>
      )}
    </Container>
  );
}
