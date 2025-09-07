import React from 'react';
import { Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';

const HeaderLogo = React.memo(() => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Button
      variant='outlined'
      sx={{ color: theme.palette.primary.contrastText, border: '0px' }}
      onClick={() => navigate('')}
    >
      <Typography
        variant='h6'
        noWrap
        component='div'
        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
      >
        World
      </Typography>
    </Button>
  );
});
HeaderLogo.displayName = 'HeaderLogo';
export default HeaderLogo;
