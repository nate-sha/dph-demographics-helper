import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SnackbarProvider } from 'notistack';
import { SettingsProvider } from './contexts/settingsContext';

import Main from './components/Main';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        <ThemeProvider theme={createTheme()}>
          <CssBaseline />
          <SnackbarProvider maxSnack={3}>
            <Main />
          </SnackbarProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </SettingsProvider>
    </QueryClientProvider>
  );
}

export default App;
