import { Box, TextField, Alert, Button, Typography } from '@mui/material';
import { Lock } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { Puzzle } from './Puzzle';
import ConfettiAnimation from './ConfettiAnimation';

type Props = {
  puzzle: Puzzle;
  isSolved: boolean;
  onSolve: ({ id }: { id: string }) => void;
};

function SignificationPictureQuestion({ puzzle, isSolved, onSolve }: Props) {
  const audio = useRef(new Audio());

  useEffect(() => {
    audio.current.loop = true;
  }, []);

  useEffect(() => {
    setAnswer('');
  }, [puzzle.id]);

  useEffect(() => {
    audio.current.setAttribute('src', puzzle.audio.url);
    audio.current.load();
    audio.current.play();
  }, [puzzle.audio.url]);

  const [answer, setAnswer] = useState<string>('');
  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const [confettiActive, setConfettiActive] = useState(false);
  const makeConfetti = () => {
    setConfettiActive(true);

    setTimeout(() => {
      setConfettiActive(false);
    }, 2000);
  };

  const [alertActive, setAlertActive] = useState(false);
  const makeAlert = () => {
    setAlertActive(true);

    setTimeout(() => {
      setAlertActive(false);
    }, 5000);
  };

  const handleSubmitAnswer = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    if (
      puzzle.solutions
        .split(',')
        .map((solution) => solution.toLowerCase())
        .includes(answer.toLowerCase())
    ) {
      onSolve({ id: puzzle.id });
      return makeConfetti();
    }

    makeAlert();
  };

  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      height="100%"
      justifyContent="center"
    >
      <h2>{puzzle.title}</h2>
      <h3>{puzzle.description}</h3>
      <h4>
        <Box display="flex" alignItems="end">
          Answer: {isSolved ? puzzle.solutions.split(',')[0] : <Lock />}
        </Box>
      </h4>
      {alertActive && (
        <Alert
          elevation={99}
          style={{
            margin: '16px',
            zIndex: '99',
            position: 'absolute',
          }}
          severity="warning"
        >
          Not quite... try again!
        </Alert>
      )}
      <img
        src={puzzle.image.url}
        alt={puzzle.description}
        width="auto"
        style={{ height: '60%', width: 'auto' }}
      />
      <form
        style={{ margin: '16px', display: 'flex', flexDirection: 'row' }}
        onSubmit={handleSubmitAnswer}
      >
        <TextField
          value={isSolved ? puzzle.solutions.split(',')[0] : answer}
          onChange={handleAnswerChange}
          variant="outlined"
          color="secondary"
          style={{ backgroundColor: '', borderRadius: '8px' }}
          disabled={isSolved}
          autoComplete="off"
        />

        <Button
          style={{ alignSelf: 'center', marginLeft: '8px' }}
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => handleSubmitAnswer()}
          disabled={isSolved}
        >
          <Typography color="white">Submit</Typography>
        </Button>
      </form>
      <ConfettiAnimation active={confettiActive} />
    </Box>
  );
}

export default SignificationPictureQuestion;
