import { Box, CircularProgress, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useReducer, useState } from 'react';
import SignificationPictureQuestion from './SignificationPictureQuestion';
import { gql, useQuery } from '@apollo/client';
import { Puzzle } from './Puzzle';

type AnswersActionType = 'add_solved_puzzle';

type AnswersAction = {
  type: AnswersActionType;
  payload: string;
};

type AnswersState = Set<string>;

const answersReducer = (state: AnswersState, action: AnswersAction) => {
  switch (action.type) {
    case 'add_solved_puzzle':
    default:
      const newState = new Set([...state, action.payload]);
      return newState;
  }
};

const GET_SIGNFICIATION_WITH_PICTURES = gql`
  query SignificationWithPictures {
    significationWithPictures(
      where: { puzzleName: "demo-puzzle" }
      orderBy: sortId_ASC
    ) {
      description
      id
      sortId
      title
      updatedAt
      audio {
        url
      }
      image {
        url
      }
      solutions
    }
  }
`;

type SignificationWithPicturesResponse = {
  significationWithPictures: Puzzle[];
};

function SignificationPictures() {
  const { data, loading, error } = useQuery<SignificationWithPicturesResponse>(
    GET_SIGNFICIATION_WITH_PICTURES
  );

  const [answersState, dispatch] = useReducer(
    answersReducer,
    new Set<string>()
  );

  const [curPuzzle, setCurPuzzle] = useState(0);

  const handleBackClick = () => {
    setCurPuzzle((prev) => prev - 1);
  };

  const handleForwardClick = () => {
    setCurPuzzle((prev) => prev + 1);
  };

  const handleSolvePuzzle = ({ id }: { id: string }) => {
    dispatch({ type: 'add_solved_puzzle', payload: id });
  };

  if (loading || !data) {
    return (
      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        flexDirection="row"
        height="100%"
      >
        <CircularProgress size={25} />
      </Box>
    );
  }

  const numPuzzles = data.significationWithPictures.length;
  const hasPrev = curPuzzle > 0;
  const hasMore = curPuzzle < numPuzzles - 1;

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
        puzzle={data.significationWithPictures[curPuzzle]}
        isSolved={answersState.has(
          data.significationWithPictures[curPuzzle].id
        )}
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
