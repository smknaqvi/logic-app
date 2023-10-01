import { Box, IconButton, FormControl, TextField, Alert } from '@mui/material';
import { Lock, Send } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { Puzzle } from './Puzzle';
import ConfettiAnimation from './ConfettiAnimation';

type Props = {
  puzzle: Puzzle;
  isSolved: boolean;
  onSolve: ({ id }: { id: number }) => void;
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
    audio.current.setAttribute('src', puzzle.audioSrc);
    audio.current.load();
    audio.current.play();
  }, [puzzle.audioSrc]);

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

  const handleSubmitAnswer = () => {
    if (
      puzzle.solutions
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
    >
      <h2>{puzzle.name}</h2>
      <h3>Answer: {isSolved ? puzzle.solutions[0] : <Lock />}</h3>
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
        src={puzzle.imgSrc}
        alt={puzzle.name}
        width="auto"
        style={{ height: '60%', width: 'auto' }}
      />
      <FormControl
        style={{ margin: '16px', display: 'flex', flexDirection: 'row' }}
      >
        <TextField
          value={answer}
          onChange={handleAnswerChange}
          variant="outlined"
          color="secondary"
          style={{ backgroundColor: '', borderRadius: '8px' }}
        />
        <IconButton color="secondary" onClick={handleSubmitAnswer}>
          <Send />
        </IconButton>
      </FormControl>
      <ConfettiAnimation active={confettiActive} />
    </Box>
  );
}

export default SignificationPictureQuestion;
