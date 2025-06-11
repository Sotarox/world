import { useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar, Divider } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  boxShadow: 24,
  p: 4,
};

function BasicModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
    <Button color="inherit" onClick={()=>setOpen(true)}>About</Button>
    <Modal
      open={open}
      onClose={() => setOpen(false)}
    >
      <Paper sx={style}>
        <Typography variant='h4'>About</Typography>
        <Divider sx={{mt:1, mb:1}}/>
        <Typography variant='h5'>Sotaro Shirai</Typography>
        <Avatar>S</Avatar>
        <Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
        {`Full-stack web developer, borned in Japan, lives in Stuttgart, Germany. Development is like playing a puzzle and Lego block at the same time.
        `}
        </Typography>
        <Typography variant='h5' sx={{mt:1}}>Technologies</Typography>
        <Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
          {`Spring Boot, React, TypeScript, Material UI, PostgresSQL, Docker, Amazon Lightsail, nginx, Ubuntu 

         `}
        </Typography>
        <Typography variant='h5'>Upcoming Features</Typography>
        <ul>
          <li>Map by OpenLayers or Leaflet</li>
          <li>Customizable table by AG Grid</li>
          <li>MongoDB integration (parallel to PostgresSQL)</li>
          <li>CI/CD by Jenkins</li>
          <li>End2End Test</li>
          <li>More data from public APIs</li>
        </ul>
      </Paper>
    </Modal>
    </>
  );
}

export default BasicModal;