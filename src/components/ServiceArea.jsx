import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Stack, Backdrop, CircularProgress, Autocomplete, TextField } from '@mui/material';
import getStates from '../api/getStates';
import getCities from '../api/getCities';
import MultiselectAutocomplete from './MultiselectAutocomplete';
import { SettingsContext } from '../contexts/settingsContext';

const ServiceArea = () => {
  const [settings, setSettings] = useContext(SettingsContext);
  const states = useQuery({ queryKey: ['states'], queryFn: getStates });
  const cities = useQuery({
    queryKey: ['cities', { ...settings.state }],
    queryFn: () => getCities(settings.state)
  });

  const handleStateChange = (event, newValue) => {
    event.preventDefault();
    // Single state autocomplete returns a string, not an object
    if (newValue !== null) {
      // Get the state id from the state name
      const stateId = states.data.find((state) => state.name === newValue).id;
      // setHasError(true);
      setSettings({
        ...settings,
        state: {
          id: stateId,
          name: newValue
        },
        // Reset the city to an empty array
        city: []
      });
    }
  };

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setSettings({
      ...settings,
      city: newValue
    });
  };

  if (states.isLoading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={states.isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (states.error || cities.error) {
    return <div>Error: {states.error.message}</div>;
  }

  return (
    <Stack
      spacing={2}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        margin: 'auto',
        maxWidth: 400
      }}>
      <Autocomplete
        fullWidth
        name="state"
        id="state"
        loading={states.isLoading}
        options={states.data.map((option) => option.name)}
        value={settings.state.name}
        onChange={handleStateChange}
        size="large"
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for a state"
            InputProps={{
              ...params.InputProps
            }}
          />
        )}
      />
      <MultiselectAutocomplete
        name="city"
        errorText="Leave blank to select all cities"
        loading={cities.isLoading}
        options={cities.data || []}
        value={settings.city}
        handleChange={handleChange}
        label="Cities"
        size="large"
      />
    </Stack>
  );
};

export default ServiceArea;
