import { ThemeProvider } from '@mui/material';

import theme from './theme';
import GamePage from './GamePage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GamePage />
    </ThemeProvider>
  );
}

export default App;
