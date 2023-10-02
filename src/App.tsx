import { ThemeProvider } from '@mui/material';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

import theme from './theme';
import GamePage from './GamePage';

const client = new ApolloClient({
  uri: 'https://api-ca-central-1.hygraph.com/v2/cln84ehrzg3st01ukbosn3q2w/master',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <GamePage />
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
