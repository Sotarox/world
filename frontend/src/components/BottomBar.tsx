import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import {Box, Button, IconButton, Toolbar, Typography} from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import { SetCurrentIso2Context } from '../contexts/CurrentIso2Context';
import { useTheme } from '@mui/material/styles';
import AboutButton from './AboutButton';

interface BottomBarProps {
  toggleDrawer: () => void;
}

export default function BottomBar(props: BottomBarProps) {
  const { toggleDrawer } = props;
  const { setCurrentIso2 } = useContext(SetCurrentIso2Context);
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="fixed" 
        sx={{ top: 'auto', bottom: 0, height: "80px", 
          display: { xs: 'block', sm: 'none'},
          zIndex: (theme) => theme.zIndex.drawer +1 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <ListIcon />
          </IconButton>
          <Button variant='outlined' 
            sx={{ color: theme.palette.primary.contrastText, border: '0px' }}
            onClick={() => setCurrentIso2('')}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            World
          </Typography>
          </Button>
          <Box sx={{flexGrow: '1'}}/>
          <AboutButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}