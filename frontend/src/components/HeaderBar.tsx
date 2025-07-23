import AppBar from '@mui/material/AppBar';
import { Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import { useTheme } from '@mui/material/styles';
import AboutButton from './AboutButton';
import { useNavigate } from 'react-router';
import { useThemeContext } from '../contexts/UseThemeContext';

interface HeaderBarProps {
  toggleDrawer: () => void;
}

export default function HeaderBar(props: HeaderBarProps) {
  const { toggleDrawer } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  const { toggleColorMode } = useThemeContext();

  return (
    <>
      <AppBar
        position='sticky'
        sx={{
          display: { xs: 'none', sm: 'block' },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={toggleDrawer}
          >
            <ListIcon />
          </IconButton>
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
          <Box sx={{ flexGrow: '1' }} />
          <Button color='inherit' onClick={() => toggleColorMode()}>
            Toggle Color
          </Button>
          <AboutButton />
        </Toolbar>
      </AppBar>
    </>
  );
}
