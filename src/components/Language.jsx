import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Typography, Box } from '@mui/material';
import { SettingsContext } from '../contexts/settingsContext';
import { getLanguage } from '../api/getLanguage';
import Table from './Table';

function LanguageReportDetails() {
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
        American Community Survey 5-Year Estimates
        <br />
        Report: B16001 |
        {'LANGUAGE SPOKEN AT HOME BY ABILITY TO SPEAK ENGLISH FOR THE POPULATION 5 YEARS AND OVER'.toLocaleLowerCase()}
        <br />
        File: 2015 ACS 5-Year Estimates
        <br />
        Source:
        <a href="https://data.census.gov/table?q=B16001&g=0400000US25&tid=ACSDT5Y2015.B16001">
          Census.gov
        </a>
      </Typography>
    </Box>
  );
}

function Language() {
  const [settings] = useContext(SettingsContext);
  const languageAtHome = useQuery({
    queryKey: ['languageAtHome', settings.state, settings.city],
    queryFn: () => getLanguage(settings.state, settings.city)
  });

  if (languageAtHome.isError) {
    return <Typography>Error:{languageAtHome.error.message}</Typography>;
  }

  return (
    <Table
      tableName="language data"
      reportName="B16001"
      reportDetails={<LanguageReportDetails />}
      tableDescription="11-5. What language groups are found in the health care facility service area? (Max 15)"
      firstColumnHeader="Primary languages other than English"
      rows={languageAtHome?.data || []}
    />
  );
}

export default Language;
