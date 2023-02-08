import { Box, Typography } from '@mui/material';
function Welcome() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height: '100%',
        my: 2
      }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          my: 2
        }}>
        Welcome to the Demographic Profile Tool
      </Typography>
      <Typography variant="body1" paragraph>
        A tool designed to simplify the process of collecting demographic data for Department of
        Public Health reports <strong>(Section: 11 - Demographic Profile of Service Area)</strong>.
        The tool integrates with the Census website to make data collection quick and accurate,
        saving professionals valuable time.
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 'bold',
          my: 2
        }}
        gutterBottom>
        Using The Tool
      </Typography>
      <Typography variant="body1" paragraph>
        The first step is to select the{' '}
        <code
          style={{
            backgroundColor: '#f5f5f5'
          }}>
          Service Area
        </code>{' '}
        for which you are collecting data. The service is defined as your{' '}
        <strong>top 15 cities</strong> by patient count.
      </Typography>
    </Box>
  );
}

export default Welcome;
