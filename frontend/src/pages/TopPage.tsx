import { Paper, Typography } from "@mui/material";

function TopPage() {
  return (
    <Paper sx={{ p: 2, m: 2}}>
      <Typography variant='h2'>Welcome</Typography>
      <Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
        {`
          “World” is a simple web service that offers various data about countries.

          The current version is in alpha, which means only limited information is available.

          The goal is to create a lightweight information system where users can quickly gather key data.

          UX theme: “Look & feel from shopping sites for informative content”.
        `}
      </Typography>
    </Paper>
  );
}
export default TopPage;