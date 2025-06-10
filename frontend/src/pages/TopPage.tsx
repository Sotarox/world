import { Paper, Typography } from "@mui/material";

function TopPage() {
  return (
    <Paper sx={{ p: 2, m: 2}}>
      <Typography variant='h2'>Welcome to the World</Typography>
      <Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
        {`
          World is a simple web service which offers various data about our countries.
          
          Current version is alpha and only 'population' and 'airports' data are displayed at each country page.

          The main purpose to build this web service is to learn various web technologies upon practical coding.

          At the other hand I also try enriching data and features, so that this web service can be informational for somebody.
        `}
      </Typography>
    </Paper>
  );
}
export default TopPage;