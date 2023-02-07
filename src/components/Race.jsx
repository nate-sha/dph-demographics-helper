import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Typography, Backdrop, CircularProgress } from '@mui/material';
import { SettingsContext } from '../contexts/settingsContext';
import { getHispanicData, getRaceData } from '../api/getRace';
import Table from './Table';

function Race() {
  const [settings] = useContext(SettingsContext);

  const hispanicPopulation = useQuery({
    queryKey: ['hispanicData', settings.state, settings.city],
    queryFn: () => getHispanicData(settings.state, settings.city)
  });
  const racePopulation = useQuery({
    queryKey: ['raceData', settings.state, settings.city],
    queryFn: () => getRaceData(settings.state, settings.city)
  });
  if (hispanicPopulation.isLoading || racePopulation.isLoading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={hispanicPopulation.isLoading || racePopulation.isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }
  if (hispanicPopulation.isError || racePopulation.isError) {
    return (
      <Typography>
        Error: {hispanicPopulation.error.message} {racePopulation.error.message}
      </Typography>
    );
  }

  return (
    <Box>
      <Table tableName="hispanic data" rows={hispanicPopulation.data} />
      <Typography ml={2}>
        11-3. What racial groups are found in the facility <strong>service area</strong>?
      </Typography>
      <Table tableName="race data" firstColumnHeader="Race" rows={racePopulation?.data} />
    </Box>
  );
}

export default Race;
