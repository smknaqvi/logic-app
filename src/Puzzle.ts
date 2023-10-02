export type Puzzle = {
  description: string;
  id: string;
  sortId: number;
  title: string;
  audio: {
    url: string;
  };
  image: {
    url: string;
  };
  solutions: string;
};
