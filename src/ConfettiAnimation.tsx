import Confetti from 'react-confetti';
import { useIsMount } from './useIsMount';
import { memo } from 'react';

type Props = {
  active?: boolean;
};

function ConfettiAnimation({ active }: Props) {
  const isMount = useIsMount();

  if (isMount) {
    return null;
  }
  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
      recycle={active}
    />
  );
}

export default memo(ConfettiAnimation);
