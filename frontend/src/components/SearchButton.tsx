import React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider } from '@mui/material';
import TextField from '@mui/material/TextField';

function SearchButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = React.useState('');

  return (
    <>
      <Button color='inherit' onClick={() => setOpen(true)}>
        Search
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <StyledPaper>
          <TextField
            id='outlined-controlled'
            label='Country Name'
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value);
            }}
          />
          <Divider sx={{ mt: 1, mb: 2 }} />
          <Typography variant='h4'>Result</Typography>
        </StyledPaper>
      </Modal>
    </>
  );
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxHeight: '80%',
  overflowY: 'auto',
  boxShadow: theme.shadows[24],
  padding: '16px',
}));

export default SearchButton;
