import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListIcon from '@mui/icons-material/List';

interface BottomBarProps {
  toggleDrawer: () => void;
}

export default function BottomBar(props: BottomBarProps) {
  const { toggleDrawer } = props;
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
            sx={{ mr: 2 }}
          >
            <ListIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            World
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}