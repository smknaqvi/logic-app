import { useState } from 'react';
import Page from './Page';
import SignificationPictures from './SignificationPictures';
import { Box, Button, Typography } from '@mui/material';

type signification_pictures = 'signification_pictures';
type game_type = signification_pictures;

function GamePage() {
  const [hasStarted, setHasStarted] = useState(false);
  const gameType: game_type = 'signification_pictures';

  const handleStartGame = () => {
    setHasStarted(true);
  };

  const renderGame = () => {
    if (!hasStarted) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <h1>Click Start to Enter the Game Room!</h1>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleStartGame}
            size="large"
          >
            <Typography color="white">Start</Typography>
          </Button>
        </Box>
      );
    }

    switch (gameType) {
      case 'signification_pictures':
      default:
        return <SignificationPictures />;
    }
  };

  return <Page title="Escape Room">{renderGame()}</Page>;
}

export default GamePage;
