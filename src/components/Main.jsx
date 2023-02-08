import { Container } from '@mui/material';
import HorizontalLinearStepper from './Stepper';

function Main() {
  return (
    <Container
      maxWidth="md"
      sx={{
        my: 2
      }}>
      <HorizontalLinearStepper />
    </Container>
  );
}

export default Main;
