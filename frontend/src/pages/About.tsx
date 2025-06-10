import { Paper, Typography } from "@mui/material";

function About() {
  return (
    <Paper sx={{ p: 2, m: 2}}>
      <Typography variant='h4'>Technologies</Typography>
      <Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
        {`
          Spring Boot, React with Typescript, Material UI, PostgresSQL, Docker, Amazon Lightsail, nginx, Ubuntu 

        `}
      </Typography>
      <Typography variant='h4'>Features to be implemented in the future</Typography>
      <ul>
        <li>Map by OpenLayers or Leaflet</li>
        <li>Customizable table by AG Grid</li>
        <li>MongoDB integration (parallel to PostgresSQL)</li>
        <li>CI/CD by Jenkins</li>
        <li>End2End Test</li>
        <li>More data from public APIs</li>
      </ul>
    </Paper>
  );
}
export default About;