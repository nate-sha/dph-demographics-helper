import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Typography } from '@mui/material';
import { SettingsContext } from '../contexts/settingsContext';
import { getHispanicData, getRaceData } from '../api/getRace';
import Table from './Table';

function HispanicReportDetails() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
      <Typography
        variant="caption"
        sx={{
          fontSize: '0.6rem'
        }}>
        Decennial Census
        <br />
        Report: P2 | {'HISPANIC OR LATINO, AND NOT HISPANIC OR LATINO BY RACE'.toLocaleLowerCase()}
        <br />
        File: 2020: DEC Redistricting Data (PL 94-171)
        <br />
        Source: <a href="https://data.census.gov/table?q=P2&g=0400000US25">View on Census.gov</a>
      </Typography>
    </Box>
  );
}

function RaceReportDetails() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column'
      }}>
      <Typography
        variant="caption"
        sx={{
          fontSize: '0.6rem'
        }}>
        Decennial Census
        <br />
        Report: P1 | Race
        <br />
        File: 2020: DEC Redistricting Data (PL 94-171)
        <br />
        Source: <a href="https://data.census.gov/table?q=P1&g=0400000US25">View on Census.gov</a>
      </Typography>
    </Box>
  );
}

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

  if (hispanicPopulation.isError || racePopulation.isError) {
    return (
      <Typography>
        Error: {hispanicPopulation.error.message} {racePopulation.error.message}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        padding: 2,
        margin: 'auto'
      }}>
      <Table
        tableName="hispanic data"
        tableDescription="11-2. Residents of Hispanic origin in the facility service area?"
        reportDetails={<HispanicReportDetails />}
        reportName="P2 | Hispanic or Latino By Race"
        rows={hispanicPopulation?.data || []}
      />
      <Table
        tableName="race data"
        tableDescription="11-3. What racial groups are found in the facility service area?"
        reportDetails={<RaceReportDetails />}
        reportName="P1 | Race"
        firstColumnHeader="Race"
        rows={racePopulation?.data || []}
      />
    </Box>
  );
}

export default Race;
