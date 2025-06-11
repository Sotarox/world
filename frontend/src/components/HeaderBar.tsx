import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import {Box, Button, IconButton, Toolbar, Typography} from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import { SetCurrentIso2Context } from '../contexts/CurrentIso2Context';
import { useTheme } from '@mui/material/styles';

interface HeaderBarProps {
  toggleDrawer: () => void;
}

export default function HeaderBar(props: HeaderBarProps) {
  const { toggleDrawer } = props;
  const { setCurrentIso2 } = useContext(SetCurrentIso2Context);
  const theme = useTheme();

  return (
    <>
      <AppBar position="sticky" 
        sx={{display:{ xs: 'none', sm: 'block'}, 
          zIndex: (theme) => theme.zIndex.drawer +1 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
          >
            <ListIcon />
          </IconButton>
          <Button variant='outlined' 
            sx={{ color: theme.palette.primary.contrastText }}
            onClick={() => setCurrentIso2('')}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              World
          </Typography>
          </Button>
          <Box sx={{flexGrow: '1'}}/>
          <Button color="inherit">About</Button>
        </Toolbar>
      </AppBar>
    </>
  );
}