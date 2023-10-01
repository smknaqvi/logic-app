import { Box, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { significationPicturesDataset } from './significationPicturesDataset';
import { useReducer, useState } from 'react';
import SignificationPictureQuestion from './SignificationPictureQuestion';

type AnswersActionType = 'add_solved_puzzle';

type AnswersAction = {
  type: AnswersActionType;
  payload: number;
};

type AnswersState = Set<number>;

const answersReducer = (state: AnswersState, action: AnswersAction) => {
  switch (action.type) {
    case 'add_solved_puzzle':
    default:
      const newState = new Set([...state, action.payload]);
      return newState;
  }
};

function SignificationPictures() {
  const puzzles = significationPicturesDataset.puzzles;
  const numPuzzles = puzzles.length;

  const [answersState, dispatch] = useReducer(
    answersReducer,
    new Set<number>()
  );

  const [curPuzzle, setCurPuzzle] = useState(0);
  const hasPrev = curPuzzle > 0;
  const hasMore = curPuzzle < numPuzzles - 1;

  const handleBackClick = () => {
    setCurPuzzle((prev) => prev - 1);
  };

  const handleForwardClick = () => {
    setCurPuzzle((prev) => prev + 1);
  };

  const handleSolvePuzzle = ({ id }: { id: number }) => {
    dispatch({ type: 'add_solved_puzzle', payload: id });
  };

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      display="flex"
      flexDirection="row"
      height="100%"
    >
      <IconButton
        size="large"
        color="secondary"
        disabled={!hasPrev}
        onClick={handleBackClick}
      >
        <ArrowBack />
      </IconButton>
      <SignificationPictureQuestion
        puzzle={puzzles[curPuzzle]}
        isSolved={answersState.has(puzzles[curPuzzle].id)}
        onSolve={handleSolvePuzzle}
      />
      <IconButton
        size="large"
        color="secondary"
        disabled={!hasMore}
        onClick={handleForwardClick}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
}

export default SignificationPictures;
