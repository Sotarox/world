import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListIcon from '@mui/icons-material/List';

interface HeaderBarProps {
  toggleDrawer: () => void;
}

export default function HeaderBar(props: HeaderBarProps) {
  const { toggleDrawer } = props;
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
            sx={{ mr: 2 }}
          >
            <ListIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            World
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}