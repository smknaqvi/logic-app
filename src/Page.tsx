import { Typography } from '@mui/material';

type Props = {
  title: string;
  children: React.ReactNode;
};

function Page({ title, children }: Props) {
  return (
    <div
      style={{
        padding: '20px',
        margin: '0px',
        borderRadius: '0px',
        height: '100%',
      }}
    >
      <Typography variant="h1" gutterBottom>
        {title}
      </Typography>

      {children}
    </div>
  );
}

export default Page;
